"use client"
import { FaTrash } from "react-icons/fa"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

type Experience = {
  role: string
  organization: string
  location: string
  duration: string
  points: string[]
}

type Props = {
  experience: Experience[]
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>
}
type ExperienceStringKeys = Exclude<keyof Experience, "points">;

export default function ExperienceLeft({ experience, setExperience }: Props) {
 const handleChange = (
  index: number,
  field: ExperienceStringKeys,
  value: string
) => {
  const updated = [...experience];
  updated[index][field] = value;
  setExperience(updated);
};

  const handlePointChange = (expIndex: number, pointIndex: number, value: string) => {
    const updated = [...experience]
    updated[expIndex].points[pointIndex] = value
    setExperience(updated)
  }

  const addExperienceRow = () => {
    setExperience([
      ...experience,
      {
        role: "",
        organization: "",
        location: "",
        duration: "",
        points: [""],
      },
    ])
  }

  const removeExperienceRow = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const addPoint = (index: number) => {
    const updated = [...experience]
    updated[index].points.push("")
    setExperience(updated)
  }

  const removePoint = (expIndex: number, pointIndex: number) => {
    const updated = [...experience]
    updated[expIndex].points.splice(pointIndex, 1)
    setExperience(updated)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 flex items-center justify-between title-font">
        Work Experience
        <motion.button
          onClick={addExperienceRow}
          className="w-8 h-8 flex"
          title="Add Experience"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
         
           <img src="/plus.png" alt="add" className="w-6 h-6 object-contain items-center" />
        </motion.button>
      </h2>

      <AnimatePresence mode="popLayout">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: -100,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            transition={{
              layout: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="border border-gray-300 p-4 rounded mb-3 relative hover:shadow-md transition-shadow duration-200"
          >
            <motion.button
              onClick={() => removeExperienceRow(index)}
              className="absolute top-2 right-2 px-0 py-1 rounded-full hover:bg-red-50 transition-colors duration-200 group"
              title="Remove"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src="/trash-can.png"
                alt="Remove"
                className="w-6 h-6 object-contain "
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

            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block font-medium mb-1">Role</label>
              <input
                type="text"
                placeholder="e.g. Junior Web Developer Intern"
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>

            <motion.div
              className="flex gap-4 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-1/2">
                <label className="block font-medium mb-1">Organization</label>
                <input
                  type="text"
                  placeholder="e.g. TBI"
                  value={exp.organization}
                  onChange={(e) => handleChange(index, "organization", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Dehradun"
                  value={exp.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-medium mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. Feb 2025 – April 2025"
                value={exp.duration}
                onChange={(e) => handleChange(index, "duration", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>

            <motion.div
              className="mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-medium mb-1">Responsibilities</label>
              <AnimatePresence>
                {exp.points.map((point, pIndex) => (
                  <motion.div
                    key={pIndex}
                    className="flex items-start gap-2 mb-2"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <textarea
                      value={point}
                      placeholder="Describe your work here..."
                      onChange={(e) => handlePointChange(index, pIndex, e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    />
              

<motion.button
  onClick={() => removePoint(index, pIndex)}
  className="text-red-600 hover:text-red-800 mt-1 p-1 rounded hover:bg-red-50 transition-colors duration-200"
  title="Remove Point"
  whileHover={{ scale: 1.2, rotate: 10 }}
  whileTap={{ scale: 0.9 }}
>
  <img
    src="/trash-can.png"
    alt="Delete"
    className="w-6 h-6 object-contain"
  />
</motion.button>

                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button
                onClick={() => addPoint(index)}
                className="text-blue-600 hover:underline text-sm mt-1 hover:text-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + Add Point
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
