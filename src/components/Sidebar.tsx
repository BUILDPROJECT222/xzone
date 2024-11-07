import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaInfoCircle, FaRegUser, FaRocketchat } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6"; // Assuming 'fa6' is a typo or custom import. Make sure this import is correct.
import { ModeToggle } from "./ui/mode-toggle";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

const TheSidebar: React.FC = () => {
  const router = useRouter();
  const { publicKey, connected } = useWallet();

  const isActive = (href: string) => {
    return router.pathname === href ? "bg-purple-500/30" : "";
  };

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Define the content for the PromoBar cards
  const promoBarCards = [
    {
      name: "Get Your Spot 1!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support",
      linkTitle: "Xzone",
    },
    {
      name: "Get Your Spot 2!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support",
      linkTitle: "Xzone",
    },
    {
      name: "Get Your Spot 1!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support",
      linkTitle: "SolX1",
    },
    {
      name: "Get Your Spot 2!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support4",
      linkTitle: "SolX2",
    },
    {
      name: "Get Your Spot 1!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support",
      linkTitle: "SolX1",
    },
    {
      name: "Get Your Spot 2!",
      imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
      link: "https://t.me/solx_support",
      linkTitle: "SolX2",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 2) % promoBarCards.length);
    }, 1000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [promoBarCards.length]);

  return (
    <>
      {/* Sidebar for larger screens, now with sticky positioning */}
      <aside className="hidden md:flex flex-col items-center md:items-stretch space-y-2 md:space-y-4 md:mr-4 sticky top-0 self-start">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="text-sm md:text-4xl font-bold flex flex-row">
            <img
              src="https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg"
              alt="logo"
              className="w-8 h-8 md:w-16 md:h-16"
            />
          </div>
        </Link>
        <div className="flex flex-col items-center md:items-stretch space-y-2">
          {/* Navigation Links */}
          <Link href="/" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive("/")}`}
            >
              <FaHome size={20} />
              <div className="text-sm hidden md:block">Home</div>
            </div>
          </Link>
          <Link href="/topics" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive("/topics")}`}
            >
              <FaRocketchat size={20} />
              <div className="text-sm hidden md:block">Topics</div>
            </div>
          </Link>
          <Link href="/users" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive("/users")}`}
            >
              <FaPeopleLine size={20} />
              <div className="text-sm hidden md:block">Users</div>
            </div>
          </Link>
          {connected && publicKey && (
            <Link href={`/profile/${publicKey.toBase58()}`} passHref>
              <div
                className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive(`/profile/${publicKey.toBase58()}`)}`}
              >
                <FaRegUser size={20} />
                <div className="text-sm hidden md:block">Profile</div>
              </div>
            </Link>
          )}
        </div>
        <Link href="/info" passHref>
            <div
              className={`gap-2 flex flex-row hover:bg-purple-500/30 transition-all duration-300 p-2 rounded-lg justify-start items-center ${isActive("/info")}`}
            >
              <FaInfoCircle size={20} />
              <div className="text-sm hidden md:block">Info</div>
            </div>
        </Link>
        <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
          <WalletMultiButton />
        </div>
        {/* Additional Sidebar Items */}
        <ModeToggle />

        {/* Carousel */}
        {promoBarCards.map((card, index) => {
  const isActive = index === currentCardIndex || index === (currentCardIndex + 1) % promoBarCards.length;
  return (
    <div
      key={index}
      className={`w-44 bg-muted border rounded-lg shadow-md p-1 flex flex-col items-center justify-center ${isActive ? '' : 'hidden'}`}
      style={{
        position: "absolute",  // Position absolutely within the parent container
        top: `${index % 2 === 0 ? 0 : "18%"}`,  // Alternate between top and bottom positions for every two cards
        left: "50%",  // Center horizontally
        transform: "translate(-55%, 620%)"  // Center vertically and horizontally
      }}
    >
      <a href={card.link} target="_blank" rel="noopener noreferrer">
        <img src={card.imgSrc} alt={card.name} className="h-16 mb-0 rounded-md cursor-pointer" />
      </a>
    </div>
  );
})}



      </aside>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed p-5  bottom-0 left-0 w-full bg-dark shadow-md">
        <ul className="flex justify-between px-6 py-1 pb-2">
          {/* Mobile Navigation Links */}
          {/* Similar structure to the desktop version but formatted for mobile screens */}
        </ul>
      </nav>
    </>
  );
};

export default TheSidebar;
