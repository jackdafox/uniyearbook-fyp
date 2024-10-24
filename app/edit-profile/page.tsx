'use client';

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Playfair } from "next/font/google";

interface Major {
  id: number;
  name: string;
}

interface Batch {
  id: number;
  name: string;
}

interface Faculty {
  id: number;
  name: string;
}

const AccountSettings = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect to the sign-in page if not authenticated
    }
  }, [status]);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    details: "",
    contacts: "",
    facultyId: "",
    majorId: "",
    batchId: "",
    profilePicture: "",
  });

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isMajorLocked, setIsMajorLocked] = useState(true);
  const [isBatchLocked, setIsBatchLocked] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Supabase client for uploading images
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserDataAndFaculties = async () => {
      try {
        // Fetch faculties
        const facultiesResponse = await fetch("/api/faculties");
        const facultiesData = await facultiesResponse.json();
        setFaculties(facultiesData);

        // Fetch user data from the backend
        const userResponse = await fetch("/api/user/session");
        if (userResponse.ok) {
          const userData = await userResponse.json();

          const facultyId = userData.Student?.Batch?.facultyId || "";
          const majorId = userData.Student?.Batch?.majorId || "";
          const batchId = userData.Student?.batch_id || "";

          setFormData({
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            details: userData.details,
            contacts: userData.contacts,
            facultyId,
            majorId,
            batchId,
            profilePicture: userData.profile_picture || "",
          });

          // If facultyId exists, fetch related majors and batches
          if (facultyId) {
            await fetchMajorsAndBatches(facultyId, majorId, batchId);
          }
        } else {
          console.error("User not found:", userResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };

    fetchUserDataAndFaculties();
  }, []);

  const fetchMajorsAndBatches = async (facultyId: string, majorId?: string, batchId?: string) => {
    const response = await fetch(`/api/faculty/${facultyId}`);
    const data = await response.json();
    setMajors(data.majors);
    setBatches(data.batches);

    setIsMajorLocked(false);
    setIsBatchLocked(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Lock major and batch dropdowns until faculty is selected
    if (name === "facultyId") {
      setIsMajorLocked(true);
      setIsBatchLocked(true);
      fetchMajorsAndBatches(value); // Fetch majors and batches based on the new faculty selection
    }
  };

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload image to Supabase storage
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`public/${file.name}`, file);

      if (error) {
        throw error;
      }

      // Retrieve the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('profile')
        .getPublicUrl(`public/${file.name}`);

      // Update the form data with the profile picture URL
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: urlData.publicUrl,
      }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <div className="mt-56 flex items-center justify-center text-black">
      {/* Main Form */}
      <div className={`w-full max-w-2xl p-8 border border-gray-400 rounded-lg ${loading ? "bg-gray-200 opacity-70 pointer-events-none" : ""}`}>
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Account Settings
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading} // Disable when loading
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading} // Disable when loading
              />
            </div>
            <div>
              <label className="block text-gray-700">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading} // Disable when loading
              />
            </div>
            <div>
              <label className="block text-gray-700">Contacts</label>
              <input
                type="text"
                name="contacts"
                value={formData.contacts}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading} // Disable when loading
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700">Faculty</label>
              <select
                name="facultyId"
                value={formData.facultyId}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading} // Disable when loading
              >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Major</label>
              <select
                name="majorId"
                value={formData.majorId}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading || isMajorLocked} // Disable when loading or major is locked
              >
                <option value="">Select Major</option>
                {majors.map((major) => (
                  <option key={major.id} value={major.id}>
                    {major.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Batch</label>
              <select
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-transparent text-black"
                disabled={loading || isBatchLocked} // Disable when loading or batch is locked
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Edit Profile Picture */}
          <div className="mt-6">
            <label className="block text-gray-700">Profile Picture</label>
            <div className="flex items-center">
              <Image
                src={formData.profilePicture || "/default-profile.png"}
                alt=""
                className="rounded-full h-16 w-16 mr-4"
                width={64}
                height={64}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="ml-4"
                disabled={loading} // Disable when loading
              />
              {uploading && <p>Uploading...</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 border text-white rounded-md font-semibold bg-black hover:bg-slate-900"
              disabled={loading} // Disable the submit button when loading
            >
              Save Changes
            </button>
            <SignOutButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
