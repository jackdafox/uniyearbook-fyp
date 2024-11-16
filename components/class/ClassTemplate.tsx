"use client";

import MemoryCard from "@/components/class/MemoryCard";
import ProfileCard from "@/components/class/ProfileCard";
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Playfair } from "next/font/google";
import { Batch, Comment, Faculty, Major, Memory, Student, User } from "@prisma/client";

const playfair = Playfair({
  subsets: ["latin"],
  style: "italic",
  weight: ["400"],
  variable: "--font-playfair",
});

interface ClassClientProps {
  batch: Batch & {
    major: Major;
    faculty: Faculty;
    student: (Student & {
      user: User;
    })[];
  };
  memories?: (Memory & {
    user: User;
  })[];
}

export default function ClassClient({ batch, memories }: ClassClientProps) {
  const [activeSection, setActiveSection] = useState("yearbook");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState("");

  const handleSectionChange = (section: string) => {
    if (section !== activeSection) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSection(section);
        setIsTransitioning(false);
      }, 300); // Adjust the timeout to match the transition duration
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewMemoryTitle("");
    setNewMemoryImage(null);
  };

  // const handleSubmitMemory = async () => {
  //   if (!newMemoryTitle || !newMemoryImage) {
  //     alert("Please provide a title and an image.");
  //     return;
  //   }

  //   try {
  //     // Step 1: Upload the image to Supabase Storage
  //     const { data: imageUploadData, error: imageUploadError } =
  //       await supabase.storage
  //         .from("memories") // Make sure the bucket name is correct
  //         .upload(
  //           `public/${Date.now()}_${newMemoryImage.name}`,
  //           newMemoryImage
  //         );

  //     if (imageUploadError) {
  //       throw new Error(imageUploadError.message);
  //     }

  //     // Step 2: Get the image URL
  //     const imageUrl = supabase.storage
  //       .from("memories")
  //       .getPublicUrl(imageUploadData.path).data.publicUrl;

  //     // Step 3: Send a request to the API to create the memory record
  //     const response = await fetch("/api/memory", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: newMemoryTitle,
  //         batch_id: batch.id,
  //         imageUrl,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create memory");
  //     }

  //     // Handle success (e.g., refresh the page or update the state with the new memory)
  //     alert("Memory created successfully!");

  //     // Optionally, you can refresh the memories list or push the new memory to the state
  //     handleClosePopup();
  //   } catch (error) {
  //     console.error("Error creating memory:", error);
  //     alert("There was an error creating the memory. Please try again.");
  //   }
  // };

  return (
    <div className="mt-24 py-10 flex flex-col items-center justify-center">
      {/* Top Section */}
      <div className="text-center p-8">
        <h1 className="text-9xl font-semibold tracking-tighter mb-5 px-52">
          {batch.major.name.toUpperCase()}
        </h1>
        <p className="mt-4 tracking-tight text-gray-600">
          <span className="text-3xl text23 tracking-tighter">
            {batch.faculty.name}
          </span>
          <span className="bg-gray-400 px-2 py-1 rounded-xl font-bold text-white mx-2 w-1/2">
            {batch.name}
          </span>
        </p>
      </div>

      {/* Navigation and Add Memory Buttons in the Center */}
      <div className="flex justify-center items-center space-x-4 mb-2">
        <button
          onClick={() => handleSectionChange("yearbook")}
          className={`p-2 h-fit border font-bold border-black ${
            activeSection === "yearbook"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          YEARBOOK
        </button>
        <button
          onClick={() => handleSectionChange("memories")}
          className={`p-2 h-fit border font-bold border-black ${
            activeSection === "memories"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          MEMORIES
        </button>
        <button
          onClick={handleOpenPopup}
          className="p-2 bg-gray-100 text-gray-800 border hover:bg-gray-300"
        >
          Add Memory
        </button>
      </div>

      {/* Toggleable Sections with Transition */}
      <div className="relative w-full p-8">
        <div
          className={`absolute w-full transition-opacity duration-300 transform ${
            isTransitioning || activeSection === "memories"
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          {activeSection === "yearbook" && (
            <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-40 mb-10">
              {batch.student.map((student, index: number) => (
                <ProfileCard
                  key={index}
                  name={student.user.first_name}
                  title={student.user.last_name}
                  description={student.user.details || ""}
                  imageUrl={
                    student.user.profile_picture || "/default-profile.png"
                  }
                  year={batch.name}
                  contacts={student.user.contacts}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className={`absolute w-full transition-opacity duration-300 transform ${
            isTransitioning || activeSection === "yearbook"
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          {activeSection === "memories" && (
            <div className="w-full p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-20">
                {(memories || []).map((memory, index) => (
                  <MemoryCard
                    key={index}
                    title={memory.title}
                    monthsAgo={Math.floor(
                      (new Date().getTime() -
                        new Date(memory.date_posted).getTime()) /
                        (1000 * 60 * 60 * 24 * 30)
                    )}
                    image={
                      memory.MemoryImage[0]?.image_url || "/default-memory.png"
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup for Adding Memory */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Memory</h2>
            <input
              type="text"
              placeholder="Memory Title"
              className="w-full p-2 mb-4 border rounded"
              value={newMemoryTitle}
              onChange={(e) => setNewMemoryTitle(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full mb-4"
              onChange={(e) =>
                setNewMemoryImage(e.target.files ? e.target.files[0] : null)
              }
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="p-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMemory}
                className="p-2 bg-black text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
