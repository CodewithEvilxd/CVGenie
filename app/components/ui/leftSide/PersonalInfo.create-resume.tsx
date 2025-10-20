"use client";

import React from "react";
import { motion } from "framer-motion";

type PersonalInfoType = {
  name: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  summary: string;
};

type Props = {
  info: PersonalInfoType;
  setInfo: React.Dispatch<React.SetStateAction<PersonalInfoType>>;
};

export default function PersonalInfo({ info, setInfo }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleDelete = (fieldName: keyof PersonalInfoType) => {
    setInfo({ ...info, [fieldName]: "" });
  };

  const inputFields = [
    { label: "Full Name", name: "name", placeholder: "Enter your name", showDelete: false },
    { label: "Location", name: "location", placeholder: "Enter your location", showDelete: false },
    { label: "Email", name: "email", placeholder: "Enter your email", showDelete: false },
    { label: "GitHub", name: "github", placeholder: "Enter your GitHub username", showDelete: true },
    { label: "LinkedIn", name: "linkedin", placeholder: "Enter your LinkedIn username", showDelete: true },
    { label: "Twitter", name: "twitter", placeholder: "Enter your Twitter handle", showDelete: true },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 title-font">Personal Info</h1>

      <div className="flex flex-wrap -mx-2">
        {inputFields.map((field) => (
          <div key={field.name} className="w-1/2 px-2 mb-4">
            <label className="block mb-1 font-medium">{field.label}</label>
            <div className="flex items-center gap-2">
              {field.showDelete && (
                <motion.button
                  type="button"
                  onClick={() => handleDelete(field.name as keyof PersonalInfoType)}
                  className="px-0 py-1 rounded-full hover:bg-red-50 transition-colors duration-200 group"
                  title={`Delete ${field.label}`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.img
                    src="/trash-can.png"
                    alt="Delete"
                    className="w-6 h-6 object-contain"
                    whileHover={{
                      rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                      scale: 1.1,
                      transition: {
                        duration: 0.6,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 1],
                      },
                    }}
                  />
                </motion.button>
              )}
              <input
                type="text"
                name={field.name}
                value={info[field.name as keyof PersonalInfoType]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="flex-1 border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Field */}
      <div>
        <label className="block mb-1 font-medium">Summary</label>
        <textarea
          name="summary"
          rows={3}
          value={info.summary}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full border border-gray-300 p-2 rounded resize-y"
        />
      </div>
    </div>
  );
}