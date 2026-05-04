export default function BrandMark() {
  return (
    <div className="relative h-11 w-11">
      <span className="absolute left-[2px] top-[4px] h-8 w-8 rounded-full border border-[#f6c77d]/60 bg-gradient-to-br from-[#f6c77d] to-[#e98265] opacity-90 shadow-[0_0_14px_rgba(246,199,125,0.35)]" />
      <span className="absolute right-[2px] top-[4px] h-8 w-8 rounded-full border border-[#f3d3a2]/55 bg-gradient-to-br from-[#e6b980] to-[#f3d3a2] opacity-85 shadow-[0_0_14px_rgba(230,185,128,0.3)]" />
      <span className="absolute left-1/2 top-[56%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#130f08]" />
    </div>
  );
}
