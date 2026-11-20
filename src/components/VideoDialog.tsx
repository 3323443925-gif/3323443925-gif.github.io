import { useEffect, useRef, useState } from 'react';
import type { VideoItem } from '../content';

interface VideoDialogProps {
  item: VideoItem | null;
  onClose: () => void;
}

export default function VideoDialog({ item, onClose }: VideoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<string | null>('加载中…');

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;

    if (item) {
      setStatus('加载中…');
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.dataset.prevOverflow = prevOverflow;
      video.src = item.src;
      video.load();
      if (!dialog.open) dialog.showModal();
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => setStatus('点击播放器开始播放'));
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [item]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;

    const handleClose = () => {
      document.body.style.overflow = dialog.dataset.prevOverflow ?? '';
      video.pause();
      video.removeAttribute('src');
      video.load();
      onClose();
    };
    const handleCancel = (e: Event) => {
      e.preventDefault();
      dialog.close();
    };
    const handleBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleBackdrop);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleBackdrop);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="video-dialog-title"
      className="fixed inset-0 z-[100] m-0 h-full w-full max-h-none max-w-none border-0 bg-[rgba(8,10,16,0.94)] p-0 text-canvas backdrop:bg-transparent"
    >
      <div className="flex h-full w-full flex-col">
        <div
          className="flex flex-wrap items-center gap-3 border-b border-white/15 px-4 py-3 sm:gap-4 sm:px-8"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)' }}
        >
          <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-g-lilac">
            {item?.index ?? ''}
          </span>
          <span id="video-dialog-title" className="mr-auto truncate text-[14px] font-medium text-canvas">
            {item?.title ?? ''}
          </span>
          {item && (
            <a
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/25 pb-0.5 font-mono text-[11px] text-white/70 transition-colors hover:border-g-lilac hover:text-canvas"
            >
              原窗口打开 ↗
            </a>
          )}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="关闭视频"
            className="cursor-pointer border border-white/25 px-3 py-1.5 font-mono text-[11px] text-canvas transition-colors hover:border-g-lilac hover:text-g-lilac"
          >
            关闭 ✕
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center p-3 sm:p-7">
          <div className="relative w-full max-w-[1100px]">
            <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                poster={item?.poster}
                onPlaying={() => setStatus(null)}
                onWaiting={() => setStatus('缓冲中…')}
                onError={() => setStatus('加载失败，可在新窗口打开')}
              />
              {status && (
                <p className="pointer-events-none absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.1em] text-white/70">
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
