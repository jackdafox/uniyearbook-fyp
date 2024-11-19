'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      alert("Sign-up successful! Redirecting to login...");
      router.push("/login");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="p-7 rounded-lg w-full">
    {/* Sign Up Header */}
    <h1 className="text-8xl font-bold text-center mb-3">SIGN UP</h1>
    
    {/* Sign-In Link */}
    <p className="text-center text-sm text-gray-600 mb-6">
      Already have an account? <a href="/login" className="text-black font-semibold underline">Sign In</a>
    </p>
    
    {/* Sign-Up Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}
      
      {/* First Name Input */}
      <div>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      {/* Last Name Input */}
      <div>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      {/* Email Input */}
      <div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      {/* Password Input */}
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
          required
        />
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full p-4 text-white ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  </div>
</div>

  );
}
