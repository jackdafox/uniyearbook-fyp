// components/MemoryCard.tsx

import React from 'react';

interface MemoryCardProps {
  title: string;
  monthsAgo: number;
  image: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ title, monthsAgo, image }) => {
  return (
    <div className="max-w-sm mx-auto p-2">
      {/* Image Section */}
      <div className="mb-4"> {/* Increased margin-bottom */}
        <img src={image} alt="Main Image" className="w-full h-48 object-cover rounded-2xl  bg-white p-5" />
      </div>

      <div className="flex justify-between items-center">
        {/* Left side with two sections */}
          {/* Title Section */}
          <div className="mb-1"> {/* Reduced margin-bottom */}
            <h2 className="text-xl font-bold text-black tracking-tight">{title}</h2> {/* Slightly smaller title */}
          </div>
          <div className="text-xs text-black">
            <p>{monthsAgo} months ago</p>
          </div>
        </div>
    </div>
  );
};

export default MemoryCard;
