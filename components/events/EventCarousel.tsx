import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

const EventCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex aspect-square items-center justify-center p-6"
          >
            <div className="w-[50rem] h-full rounded-lg overflow-hidden object-cover">
              <img
                src={image}
                alt={`carousel-image-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default EventCarousel;
