import Image from "next/image";
import LiteLogo from "@/public/Lite-Logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header className="flex w-full items-center justify-between px-8 py-2 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <Image
          src={LiteLogo}
          alt="Brand Logo"
          width={420}
          height={128}
          className="w-25 h-auto"
        />

        <nav className="flex items-center gap-6 py-2">
          <Link href="/login">Login</Link>
          <Link
            href="/signup"
            className="py-2 px-6 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Signup
          </Link>
        </nav>
      </header>
    </>
  );
}
