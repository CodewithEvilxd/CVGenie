

type Skill = {
  category: string;
  items: string;
};

type Props = {
  skills: Skill[];
};

export default function SkillRight({ skills }: Props) {
  if (!skills?.length) return null;

  return (
    <div className=" px-6 my-1  ">
       <h2 className="font-semibold border-b var[--border] pb-2 mb-1 text-base leading-relaxed
"  style={{ borderBottom: "var(--border)" }}>SKILLS</h2>
      {skills.map((skill, index) => (
        <div key={index} className="flex  text-sm">
          <span className="font-semibold w-1/3 text-[15px]">{skill.category || 'Skill Category'}</span>
          <span className="w-2/3">{skill.items || 'Skill Item'}</span>
        </div>
      ))}
    </div>
  );
}
