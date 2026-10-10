interface TextRollProps {
  text: string;
  className?: string;
}

/**
 * Rolling text used inside the pill CTA buttons: on parent `.group` hover
 * the label slides up and an identical copy rolls in from below.
 */
const TextRoll = ({ text, className = '' }: TextRollProps) => (
  <span
    className={`relative inline-flex flex-col overflow-hidden h-[20px] ${className}`}
    style={{ lineHeight: '20px' }}
  >
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
      <span className="block h-[20px] leading-[20px]">{text}</span>
      <span className="block h-[20px] leading-[20px]">{text}</span>
    </span>
  </span>
);

export default TextRoll;
