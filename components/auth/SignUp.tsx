// components/SignupForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import Logo from "../components/image/Logo.png";
import Image from "next/image";

interface MFB {
    id: number;
    name: string;
}



export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [batch, setBatch] = useState("");
  const [faculties, setFaculties] = useState<MFB[]>([]);
  const [majors, setMajors] = useState<MFB[]>([]);
  const [batches, setBatches] = useState<MFB[]>([]);
  

  useEffect(() => {
    // Fetch form data (faculties, majors, and batches)
    const fetchFormData = async () => {
      const response = await fetch("/api/signup");
      const data = await response.json();
      setFaculties(data.faculties);
      setMajors(data.majors);
      setBatches(data.batches);
    };

    fetchFormData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          password,
          faculty,
          major,
          batch,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create account');
      }
  
      const result = await response.json();
      console.log('Account created:', result);
      // Handle successful account creation (e.g., show a success message, redirect user, etc.)
    } catch (error) {
      console.error('Error during submission:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center bg-white">
      <div className="p-8 rounded-xl max-w-md w-full border p-10">
        <div className="flex justify-center mb-6">
          <Image
            src={Logo}
            width={200}
            height={200}
            alt=""
            className="cursor-pointer"
          />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-2 tracking-tighter">
          Now let's make you a Member.
        </h2>
        <p className="text-center text-sm text-gray-500 mb-10">
          Please fill out the form to continue.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* First Name and Last Name */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Faculty */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="faculty"
            >
              Faculty*
            </label>
            <select
              id="faculty"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Faculty
              </option>
              {faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </select>
          </div>

          {/* Major */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="major"
            >
              Major*
            </label>
            <select
              id="major"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Major
              </option>
              {majors.map((maj) => (
                <option key={maj.id} value={maj.id}>
                  {maj.name}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="batch"
            >
              Batch (Year)*
            </label>
            <select
              id="batch"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Batch
              </option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
