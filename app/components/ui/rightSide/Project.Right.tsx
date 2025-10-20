
import { FaLink } from 'react-icons/fa';

type Project = {
  title: string;
  description: string;
  points: string[];
  github: string;
};

type Props = {
  projects: Project[];
};

export default function ProjectsRight({ projects }: Props) {
  if (!projects?.length) return null;

  return (
    <div className=" px-6 ">
       <h2 className="font-semibold border-b var[--border] pb-2  text-base leading-relaxed
"  style={{ borderBottom: "var(--border)" }}>PROJECTS</h2>

      {projects.map((proj, index) => (
        <div key={index} className="">
          {/* Project Title */}
          <p className="font-semibold">{proj.title || 'Project Title'}</p>

          {/* Description */}
          <p className="text-sm mb-1">
            {proj.description || 'Project description goes here...'}
          </p>

          {/* Features / Tech */}
          <ul className=" text-sm space-y-1">
            {(proj.points.length ? proj.points : ['Feature / Tech used...']).map(
              (point, i) => (
                <li key={i}   className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:top-0.5 before:text-black">{point || "Enter your tech stack/other features"}</li>
              )
            )}
          </ul>

          {/* GitHub Link */}
          {proj.github && (
            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-1 mt-1 text-sm" style={{color:"var(--link-color)"}}
            >
            <span role="img" aria-label="link">🔗</span> GitHub
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
