"use client"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

interface SkillLeft {
  skills: { category: string; items: string }[]
  setSkills: React.Dispatch<React.SetStateAction<{ category: string; items: string }[]>>
}

export default function SkillLeft({ skills, setSkills }: SkillLeft) {
  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...skills]
    updated[index][field as "category" | "items"] = value
    setSkills(updated)
  }

  const addSkillRow = () => {
    setSkills([...skills, { category: "", items: "" }])
  }

  const removeSkillRow = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 flex items-center justify-between title-font">
        Skills
        <motion.button
          onClick={addSkillRow}
          className="w-8 h-8 flex"
          title="Add Skill"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/plus.png" alt="add" className="w-6 h-6 object-contain items-center" />
        </motion.button>
      </h2>

      <AnimatePresence mode="popLayout">
        {skills.map((skill, index) => (
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
            className="flex items-start gap-4 mb-3 relative p-1 rounded hover:bg-gray-50 transition-colors duration-200"
          >
            <motion.input
              type="text"
              placeholder="Category (e.g. Languages)"
              value={skill.category}
              onChange={(e) => handleChange(index, "category", e.target.value)}
              className="w-1/3 border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            />
            <motion.input
              type="text"
              placeholder="Skills (e.g. HTML, CSS)"
              value={skill.items}
              onChange={(e) => handleChange(index, "items", e.target.value)}
              className="w-2/3 border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            />

            <motion.button
              onClick={() => removeSkillRow(index)}
              className="p-1 rounded-full hover:bg-red-50 transition-colors duration-200 group flex-shrink-0"
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
          </motion.div>
        ))}
      </AnimatePresence>

      {skills.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-gray-500">
          <p>No skills added yet. Click the + button to add your first skill!</p>
        </motion.div>
      )}
    </div>
  )
}
