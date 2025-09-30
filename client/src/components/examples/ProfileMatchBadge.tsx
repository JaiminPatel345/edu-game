import { ProfileMatchBadge } from '../ProfileMatchBadge';

export default function ProfileMatchBadgeExample() {
  return (
    <div className="flex gap-4 p-6">
      <ProfileMatchBadge percentage={85} />
      <ProfileMatchBadge percentage={65} />
      <ProfileMatchBadge percentage={45} />
    </div>
  );
}
