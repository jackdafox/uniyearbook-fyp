import EventCarousel from "@/components/events/EventCarousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const page = () => {

  const images = [
    "https://media.pitchfork.com/photos/643569665cec70ae5fd5e87b/master/w_1280%2Cc_limit/Daniel%2520Caesar-%2520Never%2520Enough.jpeg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    // Add more image URLs as needed
  ];

  return (
    <>
      <EventCarousel images={images}/>
    </>
  );
};

export default page;
