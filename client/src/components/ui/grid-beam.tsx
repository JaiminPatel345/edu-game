export function GridBeam({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid-beam opacity-40" />
      <div className="absolute inset-0">
        {/* Animated beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" 
             style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
