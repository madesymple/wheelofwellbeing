import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center w-fit">
      <Image
        src="/assets/logo.png"
        alt="Wheel of Wellbeing"
        width={200}
        height={50}
        className="h-10 md:h-14 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;
