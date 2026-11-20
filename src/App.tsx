import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import LogoStrip from './sections/LogoStrip';
import Metrics from './sections/Metrics';
import FeatureTabs from './sections/FeatureTabs';
import Platform from './sections/Platform';
import Works from './sections/Works';
import Writing from './sections/Writing';
import About from './sections/About';
import FinalCta from './sections/FinalCta';
import Footer from './sections/Footer';
import ProjectDetail from './sections/ProjectDetail';
import VideoDialog from './components/VideoDialog';
import { projects } from './content';
import type { VideoItem } from './content';

type Route = { kind: 'home' } | { kind: 'project'; id: string };

function parseRoute(): Route {
  const match = window.location.pathname.match(/^\/projects\/([a-z0-9-]+)\/?$/);
  if (match && projects.some((project) => project.id === match[1])) {
    return { kind: 'project', id: match[1] };
  }
  return { kind: 'home' };
}

function scrollToHash(hash: string) {
  requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  });
}

export default function App() {
  const [videoItem, setVideoItem] = useState<VideoItem | null>(null);
  const [route, setRoute] = useState<Route>(() => parseRoute());

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, '', to);
    setRoute(parseRoute());
    const hashIndex = to.indexOf('#');
    if (hashIndex >= 0) {
      scrollToHash(to.slice(hashIndex));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  useEffect(() => {
    // GitHub Pages 深度链接：404.html 会把原路径放进 ?r=
    const redirected = new URLSearchParams(window.location.search).get('r');
    if (redirected) {
      window.history.replaceState(null, '', redirected);
      setRoute(parseRoute());
      const hashIndex = redirected.indexOf('#');
      if (hashIndex >= 0) {
        scrollToHash(redirected.slice(hashIndex));
      } else {
        window.scrollTo(0, 0);
      }
    } else if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    const onPop = () => {
      setRoute(parseRoute());
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (href.startsWith('/projects/')) {
        event.preventDefault();
        navigate(href);
      } else if (href === '/') {
        event.preventDefault();
        navigate('/');
      } else if (href.startsWith('#') && window.location.pathname !== '/') {
        event.preventDefault();
        navigate('/' + href);
      }
    };

    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, [navigate]);

  const project =
    route.kind === 'project' ? projects.find((item) => item.id === route.id) : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      {project ? (
        <main>
          <ProjectDetail project={project} />
        </main>
      ) : (
        <main>
          <Hero />
          <LogoStrip />
          <Metrics />
          <FeatureTabs openVideo={setVideoItem} />
          <Platform />
          <Works openVideo={setVideoItem} />
          <Writing />
          <About />
          <FinalCta />
        </main>
      )}
      <Footer />
      <VideoDialog item={videoItem} onClose={() => setVideoItem(null)} />
    </MotionConfig>
  );
}
