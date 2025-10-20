'use client';

import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { loadFromLocalStorage } from '../utils/localStorageHelper';

import PersonalInfoRight from "../components/ui/rightSide/PersonalInfo.Right";
import SkillRight from "../components/ui/rightSide/SkillRight";
import EducationRight from "../components/ui/rightSide/EducationRight";
import ExperienceRight from "../components/ui/rightSide/Experience.Right";
import ProjectsRight from "../components/ui/rightSide/Project.Right";
import AchievementsRight from "../components/ui/rightSide/Acheivements.Right";

export default function DownloadPage() {
  const [info, setInfo] = useState({ name: "", location: "", email: "", github: "", linkedin: "", twitter: "" });
  const [skills, setSkills] = useState([{ category: "", items: "" }]);
  const [education, setEducation] = useState([{ institute: '', degree: '', duration: '', score: '' }]);
  const [experience, setExperience] = useState([{ role: '', organization: '', location: '', duration: '', points: [''] }]);
  const [projects, setProjects] = useState([{ title: '', description: '', points: [''], github: '' }]);
  const [achievement, setAchievement] = useState([{ items: '' }]);

  const captureRef = useRef(null);

  useEffect(() => {
    const savedData = loadFromLocalStorage("resumeData");
    if (savedData) {
      setInfo(savedData.info || {});
      setSkills(savedData.skills || []);
      setEducation(savedData.education || []);
      setExperience(savedData.experience || []);
      setProjects(savedData.projects || []);
      setAchievement(savedData.achievement || []);
    }
  }, []);

  const handleDownloadPDF = async () => {
    const element = captureRef.current;
    if (!element) return;

    try {
      // Save original styles
      const originalStyle = element.style.cssText;
      const originalBodyOverflow = document.body.style.overflow;
      
      // Set auto width and height - let content determine size
      element.style.width = 'auto';
      element.style.height = 'auto';
      element.style.minWidth = 'auto';  
      element.style.maxWidth = 'none';
      element.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
      
      // Wait for layout to adjust
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get the natural dimensions after setting auto
      const elementRect = element.getBoundingClientRect();
      const naturalWidth = elementRect.width;
      const naturalHeight = elementRect.height;

      const canvas = await html2canvas(element, {
        scale: 2, // Reduced scale for better performance with auto sizing
        backgroundColor: '#ffffff', 
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: naturalWidth,
        height: naturalHeight,
        windowWidth: naturalWidth + 100,
        windowHeight: naturalHeight + 100,
        removeContainer: true,
      });

      // Restore original styles
      element.style.cssText = originalStyle;
      document.body.style.overflow = originalBodyOverflow;

      // PDF creation with auto dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pdfWidth = Math.round(canvasWidth * 72 / 96);
      const pdfHeight = Math.round(canvasHeight * 72 / 96);

      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'pt', 
        format: [pdfWidth, pdfHeight]
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

      // Add clickable links
      await addClickableLinks(pdf, element, pdfWidth, pdfHeight, naturalWidth, naturalHeight);

      pdf.save('resume.pdf');
      
    } catch (err) {
      console.error('PDF Download Error:', err);
      alert('Failed to download PDF. Please try again.');
    }
  };

  // ✅ Function to add clickable links (mailto, http, etc.)
  const addClickableLinks = async (pdf, element, pdfWidth, pdfHeight, elementWidth, elementHeight) => {
    const links = element.querySelectorAll('a[href]');
    const boundingBox = element.getBoundingClientRect();

    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const href = link.getAttribute('href');

      if (!href) return;

      // Calculate relative position
      const x = rect.left - boundingBox.left;
      const y = rect.top - boundingBox.top;
      const width = rect.width;
      const height = rect.height;

      // Map to PDF coordinates using actual element dimensions
      const pdfX = (x / elementWidth) * pdfWidth;
      const pdfY = (y / elementHeight) * pdfHeight;
      const pdfW = (width / elementWidth) * pdfWidth;
      const pdfH = (height / elementHeight) * pdfHeight;

      pdf.link(pdfX, pdfY, pdfW, pdfH, { url: href });
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 mt-20">
      <div
        ref={captureRef}
        style={{
          width: 'auto', // Changed to auto
          height: 'auto', // Changed to auto
          padding: '20px 15px',
          border: '1px solid #ccc',
          backgroundColor: '#ffffff',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px',
          lineHeight: '1.5',
          maxWidth: '850px', // Optional: set a max-width to prevent it from being too wide
          minWidth: '650px', // Optional: set a min-width to maintain readability
        }}
      >
        <PersonalInfoRight info={info} />
        <SkillRight skills={skills} />
        <EducationRight education={education} />
        <ExperienceRight experience={experience} />
        <ProjectsRight projects={projects} />
        <AchievementsRight achievement={achievement} />
      </div>

      <button
        onClick={handleDownloadPDF}
        style={{
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Download as PDF
      </button>
    </main>
  );
}