"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CreateEvent = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          start_date: formData.startDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      alert("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        startDate: "",
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the event.");
    }
  };

  return (
    <div className="mt-56 flex items-center justify-center text-black">
      {/* Main Form */}
      <div className="w-full max-w-2xl p-8 border border-gray-600 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Create Event
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
              required
            />
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 text-white font-semibold rounded-md bg-black hover:bg-gray-900"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
