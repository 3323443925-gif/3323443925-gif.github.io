import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { platform, type CodeToken } from '../../content';

const TOKEN_COLOR: Record<string, string> = {
  comment: '#6B7487',
  keyword: '#C4B5FD',
  string: '#FFD49A',
  fn: '#8FD3FF',
  num: '#FF9E7A',
  plain: '#E8EAF0',
};

export default function CodeCard() {
  const { card2 } = platform;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = card2.code.map((line) => line.map((t) => t.t).join('')).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // 剪贴板不可用时静默忽略
    }
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#151D30]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-[10px] w-[10px] rounded-full bg-[#3A4458]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#3A4458]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#3A4458]" />
        </span>
        <span className="ml-2 font-mono text-[12px] text-white/60">{card2.tab}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="复制代码"
          className="ml-auto cursor-pointer text-white/60 transition-colors hover:text-white"
        >
          {copied ? <Check size={16} className="text-positive" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="overflow-x-auto p-5">
        <pre className="m-0 font-mono text-[13px] leading-[1.7]">
          {card2.code.map((line: CodeToken[], i) => (
            <div key={i} className="whitespace-pre">
              {line.length === 0
                ? '\u00A0'
                : line.map((token, j) => (
                    <span key={j} style={{ color: TOKEN_COLOR[token.c ?? 'plain'] }}>
                      {token.t}
                    </span>
                  ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
