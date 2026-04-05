import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5 w-fit">
      <Image
        src="/assets/logo.png"
        alt="Wheel of Wellbeing"
        width={200}
        height={50}
        className="h-10 md:h-14 w-auto"
        priority
      />
      <span className="text-[10px] md:text-[11px] font-bold text-brand/70 bg-brand/8 rounded-md px-2 py-1 whitespace-nowrap tracking-wide uppercase">
        Est. 2009
      </span>
    </Link>
  );
};

export default Logo;
