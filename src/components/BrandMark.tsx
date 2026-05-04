type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <div
      className={`relative h-[72px] w-[72px] rounded-[20px] border border-[#e6b980]/25 bg-[#120f1e]/70 shadow-[0_18px_34px_rgba(0,0,0,0.35)] backdrop-blur md:h-[96px] md:w-[96px] ${className}`.trim()}
    >
      <span className="absolute left-[9px] top-[14px] h-[40px] w-[40px] rounded-full bg-gradient-to-br from-[#f6c77d] via-[#f0b36d] to-[#dc755f] opacity-95 shadow-[0_0_20px_rgba(242,174,106,0.36)] md:left-[12px] md:top-[18px] md:h-[52px] md:w-[52px]" />
      <span className="absolute right-[9px] top-[14px] h-[40px] w-[40px] rounded-full bg-gradient-to-br from-[#f4cc8f] via-[#efba7a] to-[#e58f63] opacity-90 shadow-[0_0_18px_rgba(239,186,122,0.3)] md:right-[12px] md:top-[18px] md:h-[52px] md:w-[52px]" />
      <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#130f08] md:h-4 md:w-4" />
    </div>
  );
}
