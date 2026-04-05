import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-baseline gap-1.5 w-fit">
      <Image
        src="/assets/logo.png"
        alt="Wheel of Wellbeing"
        width={200}
        height={50}
        className="h-10 md:h-14 w-auto"
        priority
      />
      <span className="text-[8px] md:text-[9px] font-medium text-[#C4B49A] tracking-widest uppercase whitespace-nowrap self-end mb-1 md:mb-1.5">
        est. 2009
      </span>
    </Link>
  );
};

export default Logo;
