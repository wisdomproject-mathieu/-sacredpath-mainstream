export default function BrandMark() {
  return (
    <div className="relative h-11 w-11">
      <span className="absolute left-1 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-[#f6c77d] to-[#e98265] opacity-90" />
      <span className="absolute right-1 bottom-1 h-8 w-8 rounded-full bg-gradient-to-br from-[#e6b980] to-[#f3d3a2] opacity-85" />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#130f08]" />
    </div>
  );
}

