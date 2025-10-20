"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

type Education = {
  institute: string
  degree: string
  duration: string
  score: string
}

type Props = {
  education: Education[]
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>
}

export default function EducationLeft({ education, setEducation }: Props) {
  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const addEducationRow = () => {
    setEducation([...education, { institute: "", degree: "", duration: "", score: "" }])
  }

  const removeEducationRow = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 flex items-center justify-between title-font">
        Education
        <motion.button
          onClick={addEducationRow}
          className="w-8 h-8 flex"
          title="Add Education"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
         <img src="/plus.png" alt="add" className="w-6 h-6 object-contain items-center" />
        </motion.button>
      </h2>

      <AnimatePresence mode="popLayout">
        {education.map((edu, index) => (
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
            {/* 🗑️ Delete Button Top-Right */}
            <motion.button
              onClick={() => removeEducationRow(index)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 group"
              title="Remove"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src="/trash-can.png"
                alt="Remove"
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

            {/* Institution - Full Width */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block font-medium mb-1">Institution</label>
              <input
                type="text"
                placeholder="e.g. DCRUST University Murthal"
                value={edu.institute}
                onChange={(e) => handleChange(index, "institute", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>

            {/* Degree + Duration Side by Side */}
            <motion.div
              className="flex gap-4 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-1/2">
                <label className="block font-medium mb-1">Degree</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech CSE"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. Sep 2023 – Jul 2027"
                  value={edu.duration}
                  onChange={(e) => handleChange(index, "duration", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </motion.div>

            {/* Score - Full Width */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block font-medium mb-1">Score</label>
              <input
                type="text"
                placeholder="e.g. CGPA 8.2 or 93%"
                value={edu.score}
                onChange={(e) => handleChange(index, "score", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {education.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-gray-500">
          <p>No education entries added yet. Click the + button to add your first education!</p>
        </motion.div>
      )}
    </div>
  )
}
