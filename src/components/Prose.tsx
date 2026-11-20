import type { ReactNode } from 'react';
import type { Block } from '../content';

// 轻量行内解析：支持 **加粗** 与 `行内代码`，不引入 markdown 库。
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <code key={key++} className="rounded-[6px] bg-mist px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
          {token.slice(1, -1)}
        </code>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[600px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h3
                key={i}
                className={`font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink ${
                  i === 0 ? 'mt-0' : 'mt-7'
                } mb-3`}
              >
                {block.text}
              </h3>
            );
          case 'h3':
            return (
              <h4 key={i} className="mt-6 mb-2 font-display text-[17px] font-semibold text-ink">
                {block.text}
              </h4>
            );
          case 'p':
            return (
              <p key={i} className="mb-4 text-[16px] leading-[1.7] text-ink-soft">
                {renderInline(block.text)}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-ink-soft">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mb-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-ink-soft">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <table key={i} className="mb-4 w-full border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    {block.headers.map((h, j) => (
                      <th
                        key={j}
                        className="border-b border-line py-2 pr-4 text-left text-[12px] font-medium uppercase tracking-[0.04em] text-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k} className="border-b border-line py-2.5 pr-4 align-top text-ink-soft">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case 'quote':
            return (
              <blockquote key={i} className="mb-4 border-l-2 border-iris pl-4 text-[16px] leading-[1.7] text-ink-soft">
                {renderInline(block.text)}
              </blockquote>
            );
          case 'code':
            return (
              <pre
                key={i}
                className="mb-4 overflow-x-auto rounded-[16px] border border-white/10 bg-[#151D30] p-5"
              >
                <code className="font-mono text-[13px] leading-[1.7] text-[#E8EAF0]">{block.text}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}
