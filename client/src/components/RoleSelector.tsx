import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, GraduationCap, Users, Building2 } from 'lucide-react';

interface RoleSelectorProps {
  value: 'student' | 'faculty' | 'placement_cell' | 'recruiter';
  onChange: (value: 'student' | 'faculty' | 'placement_cell' | 'recruiter') => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'faculty', label: 'Faculty', icon: User },
    { value: 'placement_cell', label: 'Placement Cell', icon: Users },
    { value: 'recruiter', label: 'Recruiter', icon: Building2 },
  ];

  const currentRole = roles.find(r => r.value === value);
  const Icon = currentRole?.icon || User;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]" data-testid="select-role">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => {
          const RoleIcon = role.icon;
          return (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center gap-2">
                <RoleIcon className="w-4 h-4" />
                <span>{role.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
