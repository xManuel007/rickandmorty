'use client'
import Link from "next/link";
import ButtonBack from "./ui/button-back";

const Navbar = () => {
  return (
    <div className="w-full h-20 border-b-2 flex flex-row justify-between items-center px-8">
      <Link href={'/'} className="text-2xl font-bold">
        Rick & Morty
      </Link>
      <ButtonBack />
    </div>
  );
}

export default Navbar;
