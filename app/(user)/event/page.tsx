import EventCard from "@/components/events/EventCard";
import React from "react";

const page = () => {
  const cardData = [
    {
      imageUrl:
        "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
      title: "WIM Live in Malaysia",
      date: "Wednesday, November 6 · 8 - 9pm GMT+8",
      author: "Jaki",
    },
    {
      imageUrl: "https://example.com/another-image.jpg",
      title: "Another Event",
      date: "Thursday, December 1 · 7 - 9pm GMT+8",
      author: "Alex",
    },
    {
      imageUrl:
        "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
      title: "WIM Live in Malaysia",
      date: "Wednesday, November 6 · 8 - 9pm GMT+8",
      author: "Jaki",
    },
    {
      imageUrl:
        "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
      title: "WIM Live in Malaysia",
      date: "Wednesday, November 6 · 8 - 9pm GMT+8",
      author: "Jaki",
    },
    {
      imageUrl:
        "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
      title: "WIM Live in Malaysia",
      date: "Wednesday, November 6 · 8 - 9pm GMT+8",
      author: "Jaki",
    },
    {
      imageUrl:
        "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/1:1/w_1024%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
      title: "WIM Live in Malaysia",
      date: "Wednesday, November 6 · 8 - 9pm GMT+8",
      author: "Jaki",
    },
    // Add more items as needed
  ];
  return (
    <div>
      <EventCard items={cardData} />
    </div>
  );
};

export default page;
