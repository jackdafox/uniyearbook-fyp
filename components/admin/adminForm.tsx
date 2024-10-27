'use client';

import { useState } from "react";

interface InputProps {
  placeholder: string;
  key: string;
  type?: "text" | "select";
  options?: { value: any, label: string }[];
}

interface FormProps {
  title: string;
  action: string;
  inputs: InputProps[];
}

export default function Form({ title, action, inputs }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await fetch(action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData({});
  };

  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {inputs.map((input) =>
        input.type === "select" ? (
          <select
            key={input.key}
            className="border p-2 w-full mt-2"
            value={formData[input.key] || ""}
            onChange={(e) => handleChange(input.key, e.target.value)}
          >
            <option value="">{input.placeholder}</option>
            {input.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            key={input.key}
            type="text"
            className="border p-2 w-full mt-2"
            placeholder={input.placeholder}
            value={formData[input.key] || ""}
            onChange={(e) => handleChange(input.key, e.target.value)}
          />
        )
      )}
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-500 text-white"
      >
        Submit
      </button>
    </div>
  );
}
