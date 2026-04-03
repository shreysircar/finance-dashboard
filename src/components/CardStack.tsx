"use client";

import { useState } from "react";
import CardItem from "./CardItem";

const cards = [
  {
    id: 1,
    name: "Primary Card",
    number: "1234567812345678",
    expiry: "12/28",
    balance: 12000,
    color: "bg-gradient-to-r from-[#025a6a] to-[#4a9eb3]",
  },
  {
    id: 2,
    name: "Travel Card",
    number: "9876543210987654",
    expiry: "08/27",
    balance: 8000,
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    name: "Savings Card",
    number: "4567891234567891",
    expiry: "05/29",
    balance: 22000,
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
];

export default function CardStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedCards = [
    cards[activeIndex],
    ...cards.filter((_, i) => i !== activeIndex),
  ];

  return (
<div className="relative w-full max-w-md h-54">
      {orderedCards.map((card, index) => (
        <div
          key={card.id}
          onClick={() =>
            setActiveIndex(cards.findIndex((c) => c.id === card.id))
          }
          className="absolute w-full cursor-pointer transition-all duration-500 ease-in-out"
          style={{
            top: `${index * 28}px`,            //  increased spacing (was 18)
            left: `${index * 6}px`,            //  slight horizontal shift
            zIndex: cards.length - index,
            transform: `scale(${1 - index * 0.04})`, //  less aggressive scaling
          }}
        >
          <CardItem {...card} isActive={index === 0} />
        </div>
      ))}
    </div>
  );
}