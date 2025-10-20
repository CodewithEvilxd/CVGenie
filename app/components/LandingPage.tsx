// import PdfLogo from "../../public/resume-logo.png"

import TextGenerate from "./TextGenerate";
import{ FollowerPointerCard }from "../components/ui/following-pointer"
export default function LandingPage() {
  return (
    <div className="absolute  left-1/2 -translate-x-1/2 top-40 m-2 w-full">
      
     <div className="text-center px-4 sm:px-8">
 <h1
 className={"text-2xl sm:text-5xl md:text-6xl font-extrabold leading-tight"}
 style={{
   textShadow: '1px 1px 5px rgba(17, 24, 39, 0.3)',
    fontFamily: "cursive"
 }}
>
 BUILD YOUR PERFECT RESUMES
</h1>

 <div className="flex justify-center items-center gap-0 sm:gap-1">
   <h1 className="text-2xl sm:text-5xl   md:text-6xl font-bold leading-tight"
     style={{
   textShadow: '1px 1px 5px rgba(17, 24, 39, 0.3)', // gray-900 with 50% opacity
   fontFamily: "cursive"
 }}>
     FASTER AND SMARTER
   </h1>
   <img
     src="/resume-logo.png"
     alt="PDF Logo"
     className="h-12 sm:h-16 md:h-20 object-contain hidden sm:block "
   />
 </div>





        <p className=" text-md sm:text-xl max-w-2xl m-auto p-3 font-normal text-gray-700"
        style={{ fontFamily: "var(--font-spartan)" }}>
          Create impressive, professional resumes in just two minutes and land your
          dream job - and it is Free to download
        </p>
        <div className="flex justify-center items-center">
          <button className="border animated-hover-btn transition-all duration-300 border-black/30 px-2 sm:px-4 py-1.5 sm:py-2.5 my-3 text-sm sm:text-xl bubbles-effect relative font-semibold bg-green-400/30 flex items-center gap-2 rounded-sm hover:scale-105 hover:bg-green-600/50 title-font">
            <a href="/create-resume">Create Your Resume</a>
            <img
              src="/sparkle.png"
              alt="sparkle"
              className="w-4 sm:w-6  h-4 sm:h-6 object-contain animate-sparkle"
            />
          </button>
          <div className="relative  sm:mt-10"></div>
        </div>
        {/* <FollowerPointerCard> */}
        <img
          src="/resume-templates.png"
          alt="Resume Preview"
          className="absolute left-1/2 -translate-x-1/2  -bottom-43 md:-bottom-132  w-[80%] md:w-[100%] max-w-[1000px] z-0 drop-shadow-xl mask-image-gradient "
        />
        {/* </FollowerPointerCard> */}
      </div>
    </div>
  );
}
