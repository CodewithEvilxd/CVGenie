"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FooterThird from "./Footer";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is CVGenie really free to use?",
      answer: "Yes! CVGenie offers a completely free resume builder with beautiful templates and smart features."
    },
    {
      question: "Can I download my resume as a PDF?",
      answer: "Absolutely! Once you’re done editing, just click download and your resume will be saved as a high-quality PDF."
    },
    {
      question: "Will my data be safe?",
      answer: "Yes, we respect your privacy. Your resume data stays on your device and is never auto-saved unless you choose to."
    },
    {
      question: "Do I need design skills?",
      answer: "Nope! Our smart layout handles everything for you — just fill in the blanks and get a perfect resume instantly."
    }
  ];

  return (
    <div className="relative h-[830px] sm:h-[800px] overflow-hidden mask-image-top">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover opacity-50 backdrop-blur-sm"
        style={{ backgroundImage: "url('/resume-blue.jpg')" }}
      ></div>

      {/* Text & Content */}
      <div className="relative z-10 pt-20 flex flex-col items-center justify-center px-4">
        <div className="flex items-center justify-center gap-3 mt-4 pt-10">
          <img
            src="/sparkle.png"
            alt="sparkle"
            className="w-6 sm:w-8 h-6 sm:h-8 object-contain animate-sparkle text-extrabold"
          />
          <h2 className=" text-3xl sm:text-6xl font-bold text-black drop-shadow-md">
            Still Confused?
          </h2>
          <img
            src="/sparkle.png"
            alt="sparkle"
            className="w-6 sm:w-8 h-6 sm:h-8 object-contain animate-sparkle text-extrabold mt-2"
          />
        </div>

        <p className="text-xl mt-4 text-gray-700 text-center max-w-2xl description-font"
         style={{ fontFamily: "var(--font-spartan)" }}>
          No worries - we’ve got answers to all your burning questions (except maybe “what’s for lunch?”)
        </p>

        {/* FAQ Accordion */}
        <div className="mt-12 max-w-3xl w-full space-y-4"
          style={{ fontFamily: "var(--font-spartan)" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-xl p-5 shadow-md"
            >
              <button
                className="w-full flex justify-between items-center text-left text-lg text-black"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                {faq.question}
                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                 
                />
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-700 text-md">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        {/* Get Help Button */}
<div className="mt-10 flex justify-center">
  <button className="flex animated-hover-btn items-center gap-1 text-black/80 px-6 py-2 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 font-semibold text-lg hover:scale-105 bg-white/70 backdrop-blur-md bubbles-effect relative title-font">
    <img
      src="/problem-solving.png"
      alt="Problem Solving"
      className="w-6 h-6 object-contain"
    />
    <div className="hover-left absolute w-full h-full top-0 right-2/3 "></div>
    Get Help
    <div className="hover-right absolute w-full h-full top-0 left-2/3"></div>
          <div className="bubbles-effect absolute inset-0 opacity-60 pointer-events-none"></div>
  </button>
    {/* <button 
          className="animated-hover-btn bg-green-600 text-white px-6 py-3 rounded font-bold text-lg relative overflow-hidden shadow-lg"
          
        >
          <div className="hover-left absolute w-full h-full top-0 right-2/3"></div>
          Get Help
          <div className="hover-right absolute w-full h-full top-0 left-2/3"></div>
          <div className="bubbles-effect absolute inset-0 opacity-60 pointer-events-none"></div>
        </button> */}
</div>


      </div>
    </div>
  );
}
