import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { formatTime, getSoundDescription } from '@/lib/soundSystem';

interface ClockDisplayProps {
  mode: 'analog' | 'digital' | 'fullscreen';
  isMuted: boolean;
  onMuteToggle: () => void;
  onModeChange?: (mode: 'analog' | 'digital' | 'fullscreen') => void;
}

/**
 * Clockka Clock Display Component
 * Design: Soft Sanctuary aesthetic with luxury Buddhist styling
 * Supports three modes: digital, analog, and fullscreen meditation
 */
export default function ClockDisplay({ 
  mode, 
  isMuted, 
  onMuteToggle,
  onModeChange 
}: ClockDisplayProps) {
  const [time, setTime] = useState<Date>(new Date());
  const [lastChimeMinute, setLastChimeMinute] = useState<number>(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { hours, minutes, seconds } = formatTime(time);
  const soundDescription = getSoundDescription(parseInt(hours));

  // Calculate analog clock angles
  const secondAngle = (time.getSeconds() / 60) * 360;
  const minuteAngle = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourAngle = (time.getHours() % 12) / 12 * 360 + (time.getMinutes() / 60) * 30;

  if (mode === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-sanctuary-dark flex flex-col items-center justify-center z-50">
        {/* Close button */}
        <button
          onClick={() => onModeChange?.('digital')}
          className="absolute top-6 right-6 text-accent hover:opacity-80 transition-opacity"
          aria-label="Exit fullscreen"
        >
          <Maximize2 size={24} />
        </button>

        {/* Main time display */}
        <div className="text-center mb-12">
          <div className="text-display-lg text-accent mb-4 animate-breathe font-serif">
            {hours}:{minutes}:{seconds}
          </div>
          <p className="text-body-md text-accent/70 font-serif">
            {soundDescription}
          </p>
        </div>

        {/* Mute button */}
        <button
          onClick={onMuteToggle}
          className="bg-accent text-accent-foreground px-8 py-4 rounded-full shadow-sanctuary-lg hover:opacity-90 transition-opacity text-heading-md flex items-center gap-3"
        >
          {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>
    );
  }

  if (mode === 'analog') {
    return (
      <div className="flex flex-col items-center gap-8">
        {/* Analog clock face */}
        <div className="relative w-72 h-72 rounded-full bg-card shadow-sanctuary-lg border-8 border-accent/20">
          {/* Clock center dot */}
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-sanctuary" />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * 360;
            const isMainHour = i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute bg-foreground/40"
                style={{
                  height: isMainHour ? '20px' : '10px',
                  width: isMainHour ? '3px' : '2px',
                  top: '12px',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${angle}deg) translateY(0)`,
                  transformOrigin: `0 132px`,
                }}
              />
            );
          })}

          {/* Hour hand */}
          <div
            className="absolute bg-foreground rounded-full origin-bottom shadow-soft"
            style={{
              height: '90px',
              width: '8px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${hourAngle}deg) translateY(-45px)`,
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute bg-accent rounded-full origin-bottom shadow-soft"
            style={{
              height: '110px',
              width: '5px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${minuteAngle}deg) translateY(-55px)`,
            }}
          />

          {/* Second hand */}
          <div
            className="absolute bg-accent/60 rounded-full origin-bottom"
            style={{
              height: '120px',
              width: '2px',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${secondAngle}deg) translateY(-60px)`,
            }}
          />
        </div>
        
        {/* Digital time below analog */}
        <div className="text-center">
          <div className="text-heading-md text-foreground font-serif mb-2">
            {hours}:{minutes}:{seconds}
          </div>
          <p className="text-body-sm text-muted-foreground">
            {soundDescription}
          </p>
        </div>

        {/* Mute button */}
        <button
          onClick={onMuteToggle}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-sanctuary hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    );
  }

  // Digital mode (default)
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Large digital time display */}
      <div className="text-display-lg text-accent animate-breathe font-serif">
        {hours}:{minutes}:{seconds}
      </div>

      {/* Sound description */}
      <p className="text-body-md text-muted-foreground font-serif">
        {soundDescription}
      </p>

      {/* Mute button */}
      <button
        onClick={onMuteToggle}
        className="bg-accent text-accent-foreground px-8 py-4 rounded-full shadow-sanctuary hover:opacity-90 transition-opacity text-heading-md flex items-center gap-3"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
