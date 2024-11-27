import React from "react";

const CircleNumber = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center rounded-full w-5 h-5 bg-black text-white">
      <h1 className="text-[10px]">{text}</h1>
    </div>
  );
};

export default CircleNumber;
