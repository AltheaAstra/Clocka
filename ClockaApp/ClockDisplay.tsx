import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ClockDisplayProps {
  mode: 'analog' | 'digital' | 'fullscreen';
  isMuted: boolean;
  onMuteToggle: () => void;
}

export default function ClockDisplay({ mode, isMuted, onMuteToggle }: ClockDisplayProps) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Calculate analog clock angles
  const secondAngle = (time.getSeconds() / 60) * 360;
  const minuteAngle = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourAngle = (time.getHours() % 12) / 12 * 360 + (time.getMinutes() / 60) * 30;

  if (mode === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-sanctuary-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-display-lg text-accent mb-8 animate-breathe">
            {hours}:{minutes}:{seconds}
          </div>
          <button
            onClick={onMuteToggle}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-sanctuary hover:opacity-90 transition-opacity"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'analog') {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-64 h-64 rounded-full bg-card shadow-sanctuary border-8 border-accent/20">
          {/* Clock center dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360;
            const isMainHour = i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute w-1 bg-foreground/40"
                style={{
                  height: isMainHour ? '16px' : '8px',
                  width: isMainHour ? '3px' : '2px',
                  top: '8px',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${angle}deg) translateY(0)`,
                  transformOrigin: `0 128px`,
                }}
              />
            );
          })}

          {/* Hour hand */}
          <div
            className="absolute w-1 bg-foreground rounded-full origin-bottom"
            style={{
              height: '80px',
              width: '6px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${hourAngle}deg) translateY(-40px)`,
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute bg-accent rounded-full origin-bottom"
            style={{
              height: '100px',
              width: '4px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${minuteAngle}deg) translateY(-50px)`,
            }}
          />

          {/* Second hand */}
          <div
            className="absolute bg-accent/60 rounded-full origin-bottom"
            style={{
              height: '110px',
              width: '2px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${secondAngle}deg) translateY(-55px)`,
            }}
          />
        </div>
        
        <div className="text-heading-md text-foreground">
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    );
  }

  // Digital mode (default)
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-display-lg text-accent animate-breathe font-serif">
        {hours}:{minutes}:{seconds}
      </div>
      <button
        onClick={onMuteToggle}
        className="bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-sanctuary hover:opacity-90 transition-opacity"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
