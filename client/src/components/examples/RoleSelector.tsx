import { useState } from 'react';
import { RoleSelector } from '../RoleSelector';

export default function RoleSelectorExample() {
  const [role, setRole] = useState<'student' | 'faculty' | 'placement_cell' | 'recruiter'>('student');

  return (
    <div className="p-6">
      <RoleSelector 
        value={role}
        onChange={(value) => {
          setRole(value);
          console.log('Role changed to:', value);
        }}
      />
    </div>
  );
}
