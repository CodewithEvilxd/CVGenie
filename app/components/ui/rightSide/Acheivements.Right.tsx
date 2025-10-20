

type Achievement = {
  items: string;
};

type Props = {
  achievement: Achievement[];
};

export default function AchievementsRight({ achievement }: Props) {
  if (!achievement?.length || achievement.every(a => !a.items?.trim())) return null;

  return (
    <div className="text-black px-6 mt-1 mb-3">
        <h2 className="font-semibold border-b var[--border] pb-2 mb-1 text-base leading-relaxed
"  style={{ borderBottom: "var(--border)" }}> EXTRACURRICULAR ACHIEVEMENTS</h2>
<div>
      <ul className="list-disc list-inside text-sm space-y-1">
        {achievement.map((a, i) => (
          <li key={i}>
            {a.items?.trim() || "Achievement detail goes here..."}
          </li>
        ))}
      </ul>
</div>
    </div>
    
  );
}
