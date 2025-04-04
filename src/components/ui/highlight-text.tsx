interface HighlightTextProps {
  text: string;
  highlight: string;
}

export function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        const isHighlight = part.toLowerCase() === highlight.toLowerCase();
        return isHighlight ? (
          <span key={i} className="bg-primary/20 text-primary rounded px-0.5">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
} 