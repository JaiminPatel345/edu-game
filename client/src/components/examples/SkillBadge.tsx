import { SkillBadge } from '../SkillBadge';

export default function SkillBadgeExample() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <SkillBadge skill="React" hasSkill={true} proficiency={85} showStatus={true} />
      <SkillBadge skill="Python" hasSkill={true} proficiency={75} showStatus={true} />
      <SkillBadge skill="Docker" hasSkill={false} showStatus={true} />
      <SkillBadge skill="JavaScript" />
    </div>
  );
}
