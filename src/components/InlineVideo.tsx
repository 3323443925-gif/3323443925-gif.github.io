import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface Props {
  src: string;
  poster?: string;
  title: string;
}

export default function InlineVideo({ src, poster, title }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    video.controls = true;
    setPlaying(true);
    const promise = video.play();
    if (promise) {
      promise.catch(() => window.open(src, '_blank', 'noopener'));
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-panel bg-ink shadow-panel ring-1 ring-[rgba(14,21,37,0.06)]">
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        poster={poster}
        preload="none"
        playsInline
        width={1280}
        height={720}
        aria-label={`${title} 演示视频`}
        onPlay={() => setPlaying(true)}
        onEnded={(event) => {
          event.currentTarget.controls = false;
          event.currentTarget.currentTime = 0;
          setPlaying(false);
        }}
      >
        <source src={src} type="video/mp4" />
        你的浏览器不支持视频播放，
        <a href={src} target="_blank" rel="noopener noreferrer">
          在新窗口打开视频
        </a>
        。
      </video>

      {!playing && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-gradient-to-b from-[rgba(14,21,37,0.04)] to-[rgba(14,21,37,0.45)] text-white"
          aria-label={`播放 ${title} 演示视频`}
        >
          <span className="grid h-14 w-14 place-items-center rounded-[14px] bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5">
            <Play size={18} className="ml-0.5" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            播放演示
          </span>
        </button>
      )}
    </div>
  );
}
