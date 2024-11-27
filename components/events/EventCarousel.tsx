import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ImageCarouselProps {
  image: string;
}

const EventCarousel = ({ image }: ImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-2xl self-center">
      <CarouselContent>
          <CarouselItem
            className="flex aspect-square items-center justify-center p-6"
          >
            <div className="w-[50rem] h-full rounded-lg overflow-hidden object-cover">
              <img
                src={image}
                alt={`carousel-image`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default EventCarousel;
