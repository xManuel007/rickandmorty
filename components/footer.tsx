import { ChevronsLeftRight} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const date = new Date()
  const Year = date.getFullYear()
  return (
    <footer>
      <div className="flex flex-row w-full items-center justify-center h-10 gap-1">
        <ChevronsLeftRight />
        <p>by</p>
        <Link href="https://riosoft.xyz" target="_blank" rel="noopener noreferrer" className="font-bold underline">Manuel Rios</Link>
        <p>{Year}</p>
      </div>
    </footer>
   );
}

export default Footer;
