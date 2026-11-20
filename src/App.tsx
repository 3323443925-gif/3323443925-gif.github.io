import { useState } from 'react';
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
import VideoDialog from './components/VideoDialog';
import type { VideoItem } from './content';

export default function App() {
  const [videoItem, setVideoItem] = useState<VideoItem | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
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
      <Footer />
      <VideoDialog item={videoItem} onClose={() => setVideoItem(null)} />
    </MotionConfig>
  );
}
