import Link from "next/link";
import Login from "components/Login";
import LoginUser from "components/LoginUser";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#101010] to-[#1d1d1d] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome to <span className="text-[hsl(0,0%,100%)]">h</span><span className="text-[#fdb702]">3</span>x<span className="text-[hsl(0,0%,38%)]">|</span>World
        </h1>
        <p className="text-l">Web3 XR Minimalistic Social Media for truly connecting people. Get your link up and Link up!</p>
        <LoginUser/>
      </div>
    </main>
  );

}
