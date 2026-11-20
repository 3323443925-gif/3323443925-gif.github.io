// 生成式 SVG 封面：移植旧站 WorkCover 的种子逻辑与 4 种变体，
// 配色改为模板 pastel（cream 底 + apricot/lilac/glacier/butter/seafoam；dark 变体 Ink 底 pastel 线）。

const PASTELS = ['#FF9E7A', '#B39DFF', '#8FD3FF', '#FFE08A', '#9EECD0'];
const MONO = "'JetBrains Mono Variable', ui-monospace, monospace";

export default function WorkCover({ index }: { index: number }) {
  const pad = String(index).padStart(2, '0');
  const dark = index % 3 === 0;
  const bg = dark ? '#0E1525' : '#FFF1E4';
  const fg = dark ? '#FBFAF8' : '#0E1525';
  const muted = dark ? '#5C6577' : '#C2B69C';
  const accent = PASTELS[index % PASTELS.length];
  const variant = index % 4;

  let seed = index * 104729 + 17;
  const rnd = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };

  const tracks = Array.from({ length: 6 }, (_, row) => {
    const clips: { x: number; width: number; hot: boolean }[] = [];
    let x = 24;
    while (x < 372) {
      const width = 18 + Math.floor(rnd() * 54);
      clips.push({ x, width: Math.min(width, 376 - x), hot: rnd() > 0.82 });
      x += width + 6 + Math.floor(rnd() * 12);
    }
    return { y: 228 + row * 24, clips };
  });

  const playheadX = 48 + Math.floor(rnd() * 300);

  const bars = Array.from({ length: 24 }, (_, i) => ({
    x: 30 + i * 14,
    h: 18 + Math.floor(rnd() * 110),
    hot: i === 17 || rnd() > 0.9,
  }));

  const cells = Array.from({ length: 30 }, (_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    return {
      x: 32 + col * 56,
      y: 226 + row * 34,
      filled: rnd() > 0.42,
      hot: rnd() > 0.84,
    };
  });

  const dots = Array.from({ length: 20 }, () => ({
    x: 20 + rnd() * 360,
    y: 205 + rnd() * 210,
    r: 0.8 + rnd() * 1.4,
  }));

  const arcRadii = [36, 58, 80, 102, 124];

  return (
    <svg className="block h-full w-full" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="400" height="500" fill={bg} />

      <path
        d="M14 26V14h12M386 26V14h-12M14 474v12h12M386 474v12h-12"
        fill="none"
        stroke={muted}
        strokeWidth="1"
        opacity="0.6"
      />

      <g fontFamily={MONO} fontSize="11" letterSpacing="1.6">
        <text x="24" y="34" fill={muted}>
          CUT / {pad}
        </text>
        <text x="376" y="34" textAnchor="end" fill={muted}>
          00:{pad}:0{index % 9}
        </text>
      </g>

      <text x="22" y="172" fontFamily={MONO} fontSize="122" fontWeight="600" letterSpacing="-6" fill={fg} opacity="0.94">
        {pad}
      </text>

      <text x="26" y="196" fontFamily={MONO} fontSize="10" letterSpacing="2.6" fill={muted}>
        OPERATIONS / SHORT
      </text>

      {variant === 0 && (
        <g>
          {tracks.map((track, ti) => (
            <g key={ti}>
              {track.clips.map((clip, ci) => (
                <rect
                  key={ci}
                  x={clip.x}
                  y={track.y}
                  width={clip.width}
                  height="10"
                  fill={clip.hot ? accent : fg}
                  opacity={clip.hot ? 0.9 : 0.14}
                  stroke={clip.hot ? accent : muted}
                  strokeOpacity={clip.hot ? 0.9 : 0.35}
                />
              ))}
            </g>
          ))}
          <line x1={playheadX} y1="218" x2={playheadX} y2="392" stroke={accent} strokeWidth="1.5" />
          <path d={`M${playheadX - 4} 218h8l-4 6z`} fill={accent} />
        </g>
      )}

      {variant === 1 && (
        <g>
          <line x1="24" y1="320" x2="376" y2="320" stroke={muted} strokeOpacity="0.5" />
          {bars.map((bar, bi) => (
            <rect
              key={bi}
              x={bar.x}
              y={320 - bar.h / 2}
              width="6"
              height={bar.h}
              fill={bar.hot ? accent : fg}
              opacity={bar.hot ? 0.95 : 0.5}
            />
          ))}
        </g>
      )}

      {variant === 2 && (
        <g>
          {arcRadii.map((r) => (
            <circle
              key={r}
              cx="282"
              cy="306"
              r={r}
              fill="none"
              stroke={r === 102 ? accent : fg}
              strokeOpacity={r === 102 ? 0.9 : 0.22}
              strokeWidth={r === 102 ? 1.5 : 1}
              strokeDasharray={r === 102 ? '3 7' : undefined}
            />
          ))}
          <line x1="282" y1="168" x2="282" y2="444" stroke={muted} strokeOpacity="0.45" />
          <line x1="144" y1="306" x2="420" y2="306" stroke={muted} strokeOpacity="0.45" />
          <circle cx="282" cy="306" r="4" fill={accent} />
          <rect x="34" y="246" width="72" height="120" fill="none" stroke={muted} strokeOpacity="0.5" />
          <rect x="46" y="258" width="48" height="8" fill={fg} opacity="0.5" />
          <rect x="46" y="274" width="34" height="8" fill={fg} opacity="0.3" />
        </g>
      )}

      {variant === 3 && (
        <g>
          {cells.map((cell, ci) => (
            <rect
              key={ci}
              x={cell.x}
              y={cell.y}
              width="36"
              height="22"
              fill={cell.hot ? accent : cell.filled ? fg : 'none'}
              opacity={cell.hot ? 0.9 : cell.filled ? 0.75 : 1}
              stroke={cell.hot ? accent : muted}
              strokeOpacity={cell.hot ? 0.9 : 0.5}
            />
          ))}
          <line x1="24" y1="392" x2="376" y2="218" stroke={accent} strokeWidth="1.5" strokeDasharray="3 7" opacity="0.75" />
        </g>
      )}

      <g fill={fg} opacity="0.15">
        {dots.map((dot, di) => (
          <circle key={di} cx={dot.x} cy={dot.y} r={dot.r} />
        ))}
      </g>

      <line x1="24" y1="420" x2="376" y2="420" stroke={muted} strokeOpacity="0.55" />

      <rect x="24" y="438" width="24" height="24" fill={accent} />
      <path d="M33 444l10 6-10 6z" fill={bg} />

      <text x="58" y="455" fontFamily={MONO} fontSize="10" letterSpacing="2.2" fill={fg}>
        SCRIPT / EDIT
      </text>
      <text x="376" y="455" textAnchor="end" fontFamily={MONO} fontSize="10" letterSpacing="2.2" fill={muted}>
        EDIT / {pad}
      </text>
    </svg>
  );
}
