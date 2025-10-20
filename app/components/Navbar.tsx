"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

// Extend the Window interface to include downloadResume
declare global {
  interface Window {
    downloadResume?: () => Promise<void>
  }
}

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleDownloadClick = async () => {
    if (status === "loading") return

    if (!session) {
      // User not signed in - redirect to sign in with download flag
      localStorage.setItem("shouldDownload", "true")
      router.push("/signin")
      return
    }

    // User is signed in
    if (pathname === "/download") {
      // Already on create-resume page - try direct download
      if (typeof window !== "undefined" && window.downloadResume) {
        setIsDownloading(true)
        try {
          await window.downloadResume()
        } catch (error) {
          console.error("Download failed:", error)
        } finally {
          setIsDownloading(false)
        }
      } else {
        // Download function not available yet - set flag and refresh
        localStorage.setItem("shouldDownload", "true")
        window.location.reload()
      }
    } else {
      // Not on create-resume page - navigate there with download flag
      localStorage.setItem("shouldDownload", "true")
      router.push("/download")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-5xl px-2 sm:px-3 py-2 sm:py-3 rounded-sm shadow-md flex justify-between items-center my-2 sm:my-4 border border-black/30 backdrop-blur-sm">
        {/* Logo */}
        <div className="hidden sm:flex items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/cvGenie-logo.png" 
              alt="CVGenie Logo" 
              className="h-8 sm:h-12 w-24 sm:w-30 object-contain" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium title-font">
          <Link 
            href="/" 
            className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-200 hover:scale-105"
          >
            <img src="/home-heart.png" alt="Home Icon" className="w-5 h-5" />
            Home
          </Link>

          <Link 
            href="/create-resume" 
            prefetch={false}
            className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-200 hover:scale-105"
          >
            <img src="/edit.png" alt="Create Icon" className="w-5 h-5" />
            Create
          </Link>

          {!session ? (
            <Link 
              href="/signin"
              className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-200 hover:scale-105"
            >
              <img src="/log-in.png" alt="Sign In Icon" className="w-5 h-5" />
              Sign In
            </Link>
          ) : (
            <button 
              onClick={() => signOut()} 
              className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors duration-200 hover:scale-105"
            >
              <img src="/logout.png" alt="Sign Out Icon" className="w-5 h-5" />
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Button & Download Button Container */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Download Button */}
          <button
            onClick={handleDownloadClick}
            disabled={isDownloading || status === "loading"}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-lg title-font border border-black/20 ${
              isDownloading || status === "loading"
                ? "bg-gray-400/50 cursor-not-allowed text-gray-600"
                : session
                  ? "bg-green-500/50 hover:bg-green-600/50  hover:scale-105"
                  : "bg-green-500/50 hover:bg-green-600/50  hover:scale-105"
            }`}
          >
            {isDownloading ? (
              <>
                <span className="hidden sm:inline">Downloading...</span>
                <span className="sm:hidden">...</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : status === "loading" ? (
              <>
                <span className="hidden sm:inline">Loading...</span>
                <span className="sm:hidden">...</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : session ? (
              <>
                <span className="hidden sm:inline">
                  {pathname === "/create-resume" ? "Download" : "Create & Download"}
                </span>
                <span className="sm:hidden">Download</span>
                <img src="/download.png" alt="download" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Sign in to Download</span>
                <span className="sm:hidden">Sign in</span>
                <img src="/download.png" alt="download" className="w-4 h-4 sm:w-5 sm:h-5 object-contain opacity-80" />
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <div className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-auto w-64 backdrop-blur-lg m-3 mr-4 mt-2 rounded-lg border border-black/30 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-70'
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-black/30 shadow-lg">
          <div>
            <img 
              src="/cvGenie-logo.png" 
              alt="CVGenie Logo" 
              className="h-8 w-auto object-contain" 
            />
          </div>
          <button
            onClick={closeMobileMenu}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close mobile menu"
          >
            {/* cross button */}
            <div className="relative w-5 h-5">
              <div className="absolute w-5 h-0.5 bg-black rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
              <div className="absolute w-5 h-0.5 bg-black -rotate-45 top-1/2 left-0 transform -translate-y-1/2"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="py-4">
          <Link 
            href="/" 
            onClick={closeMobileMenu}
            className="block px-6 py-3 flex items-center gap-1 text-lg font-medium rounded hover:text-black hover:bg-white/25 transition-colors duration-200"
          >
            <img src="/home-heart.png" alt="Home Icon" className="w-4 h-4 mb-0.1" />
            Home
          </Link>
          <Link 
            href="/create-resume" 
            onClick={closeMobileMenu}
            prefetch={false}
            className="block px-6 py-3 text-lg flex gap-1 items-center font-medium hover:text-black hover:bg-white/25 rounded transition-colors duration-200"
          >
            <img src="/edit.png" alt="Create Icon" className="w-4 h-4" />
            Create Resume
          </Link>
          {!session ? (
            <Link 
              href="/signin"
              onClick={closeMobileMenu}
              className="block px-6 py-3 flex gap-1 items-center text-lg font-medium hover:text-black hover:bg-gray-50 transition-colors duration-200"
            >
              <img src="/log-in.png" alt="Sign In Icon" className="w-4 h-4" />
              Sign In
            </Link>
          ) : (
            <button
              onClick={() => {
                signOut()
                closeMobileMenu()
              }} 
              className="block w-full flex gap-1 items-center text-left px-6 py-3 text-lg font-medium font-semibold text-gray-700 hover:bg-red-200/20 text-red-700/60 rounded transition"
            >
              <img src="/logout.png" alt="Sign Out Icon" className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </>
  )
}