import { useState } from 'react';
import { ResumeUploadZone } from '../ResumeUploadZone';

export default function ResumeUploadZoneExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (file: File) => {
    console.log('Uploading file:', file.name);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl">
      <ResumeUploadZone 
        onUpload={handleUpload}
        isLoading={isLoading}
      />
    </div>
  );
}
