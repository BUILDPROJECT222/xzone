import React, { useState, useEffect } from "react";

const PromoBar: React.FC = () => {
  // Define the wide card separately
  const wideCard = {
    name: "Get Your Spot Wide!",
    imgSrc: "https://i.ibb.co.com/sFbvqJf/20241107-213454.jpg",
    link: "https://x.com/xzonesol",
    linkTitle: "xzone",
  };

  // Define the carousel cards separately
  const carouselCards = [
    {
      name: "Get Your Spot 1!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone1",
    },
    {
      name: "Get Your Spot 2!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone2",
    },
    {
      name: "Get Your Spot 3!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone1",
    },
    {
      name: "Get Your Spot 4!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone2",
    },
    {
      name: "Get Your Spot 5!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone1",
    },
    {
      name: "Get Your Spot 6!",
      imgSrc: "https://i.ibb.co.com/hC5xqSd/photo-2024-11-07-21-39-39.jpg",
      link: "https://x.com/xzonesol",
      linkTitle: "xzone2",
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 2) % carouselCards.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(timer); 
  }, [carouselCards.length]);

  return (
    <aside className="flex flex-col items-center space-y-2 md:space-y-2 ">
      {/* Wide Card */}
      <div className="w-96 p-5 bg-muted rounded-lg p-2 flex flex-col items-center justify-center">
        <img src={wideCard.imgSrc} alt={wideCard.name} className="h-32 mb-2 rounded-md" />
        <h3 className="text-md font-bold mb-2">{wideCard.name}</h3>
        <a href={wideCard.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
            @{wideCard.linkTitle}
          </button>
        </a>
      </div>

      {/* Carousel Cards */}
      {carouselCards.slice(currentCardIndex, currentCardIndex + 2).map((card, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-5 w-42 bg-muted rounded-lg"
        >
          <img
            src={card.imgSrc}
            alt={`Ad Spot ${currentCardIndex + index + 1}`}
            className="h-28 mb-2 rounded-md"
          />
          <h3 className="text-md font-bold mb-2">{card.name}</h3>
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
              @{card.linkTitle}
            </button>
          </a>
        </div>
      ))}
      {/* Inquiry Button */}
      <a href="https://t.me/xzone_support" target="_blank" rel="noopener noreferrer">
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
          Ads Inquiry
        </button>
      </a>
    </aside>
  );
};

export default PromoBar;
