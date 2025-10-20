"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

type Project = {
  title: string
  description: string
  points: string[]
  github: string
}

type Props = {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

export default function ProjectsLeft({ projects, setProjects }: Props) {
 const handleChange = (
  index: number,
  field: "title" | "description" | "github", // no "points"
  value: string
) => {
  const updated = [...projects]
  updated[index][field] = value
  setProjects(updated)
}

  const handlePointChange = (projIndex: number, pointIndex: number, value: string) => {
    const updated = [...projects]
    updated[projIndex].points[pointIndex] = value
    setProjects(updated)
  }

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", points: [""], github: "" }])
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const addPoint = (index: number) => {
    const updated = [...projects]
    updated[index].points.push("")
    setProjects(updated)
  }

  const removePoint = (projIndex: number, pointIndex: number) => {
    const updated = [...projects]
    updated[projIndex].points.splice(pointIndex, 1)
    setProjects(updated)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 flex items-center justify-between title-font">
        Projects
        <motion.button
          onClick={addProject}
          className="w-8 h-8 flex"
          title="Add Project"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/plus.png" alt="add" className="w-6 h-6 object-contain items-center" />
        </motion.button>
      </h2>

      <AnimatePresence mode="popLayout">
        {projects.map((proj, index) => (
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
            {/* 🗑️ Delete Button */}
            <motion.button
              onClick={() => removeProject(index)}
              className="absolute top-2 right-2 px-0 py-1 rounded-full hover:bg-red-50 transition-colors duration-200 group"
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

            {/* Title */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block font-medium mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. BookReader"
                value={proj.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block font-medium mb-1">Description</label>
              <textarea
                placeholder="e.g. A full-stack app where users explore books by genre, bookmark, comment..."
                value={proj.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded resize-y focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                rows={3}
              />
            </motion.div>

            {/* Points */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-medium mb-1">Key Features / Tech</label>
              <AnimatePresence>
                {proj.points.map((point, pIndex) => (
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
                      placeholder="Describe feature or tech used"
                      onChange={(e) => handlePointChange(index, pIndex, e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      rows={1}
                    />
                    <motion.button
                      onClick={() => removePoint(index, pIndex)}
                      className="mt-1 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                      title="Remove Point"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.img
                        src="/trash-can.png"
                        alt="Remove Point"
                        className="w-4 h-4 object-contain"
                        whileHover={{
                          rotate: [0, -10, 10, -5, 5, 0],
                          transition: {
                            duration: 0.4,
                            ease: "easeInOut",
                          },
                        }}
                     
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

            {/* GitHub Link */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block font-medium mb-1">GitHub Link</label>
              <input
                type="text"
                placeholder="e.g. https://github.com/username/project-name"
                value={proj.github}
                onChange={(e) => handleChange(index, "github", e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {projects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-gray-500">
          <p>No projects added yet. Click the + button to add your first project!</p>
        </motion.div>
      )}
    </div>
  )
}
