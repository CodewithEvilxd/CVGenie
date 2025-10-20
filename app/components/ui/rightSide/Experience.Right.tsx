"use client";

type Experience = {
  role: string;
  organization: string;
  location: string;
  duration: string;
  points: string[];
};

type Props = {
  experience: Experience[];
};

export default function ExperienceRight({ experience }: Props) {
  if (!experience?.length) return null;

  return (
    <div className=" px-6 ">
       <h2 className="font-semibold border-b var[--border] pb-2  leading-relaxed
"  style={{ borderBottom: "var(--border)" }}>WORK EXPERIENCE</h2>

      {experience.map((exp, index) => (
        <div key={index} className="">
          {/* Top Row: Role + Duration */}
          <div className="flex justify-between items-start">
            <p className="font-semibold">
              {exp.role || "Your Role"}
            </p>
            <p className="italic text-sm">
              {exp.duration || "Duration (e.g. Feb 2025 – Apr 2025)"}
            </p>
          </div>

          {/* Organization + Location */}
          <p className="italic text-sm mb-1">
            {exp.organization && exp.location
              ? `${exp.organization}, ${exp.location}`
              : "Organization, Location"}
          </p>

          {/* Points */}
       <ul className=" text-sm space-y-1">
  {(exp.points.length ? exp.points : ["What did you work on?"]).map((point, i) => (
    <li
      key={i}
      className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:top-0.5 before:text-black"
    >
      {point || "Describe your contribution..."}
    </li>
  ))}
</ul>

        </div>
      ))}
    </div>
  );
}
