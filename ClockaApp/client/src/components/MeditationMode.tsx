import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MeditationModeProps {
  isActive: boolean;
  onClose: () => void;
}

/**
 * Meditation Mode Component
 * Design: Soft Sanctuary aesthetic with minimal distractions
 * Provides a fullscreen meditation experience with breathing animation
 */
export default function MeditationMode({ isActive, onClose }: MeditationModeProps) {
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Breathing animation cycle: 0-4 seconds in, 4-8 seconds hold, 8-12 seconds out
    const breathingInterval = setInterval(() => {
      setBreathingPhase((prev) => (prev + 1) % 12);
    }, 1000);

    return () => clearInterval(breathingInterval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const sessionInterval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(sessionInterval);
  }, [isActive]);

  if (!isActive) return null;

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate breathing orb scale based on phase
  const getOrbScale = () => {
    if (breathingPhase < 4) {
      // Inhale: 0-4 seconds, scale from 1 to 1.3
      return 1 + (breathingPhase / 4) * 0.3;
    } else if (breathingPhase < 8) {
      // Hold: 4-8 seconds, stay at 1.3
      return 1.3;
    } else {
      // Exhale: 8-12 seconds, scale from 1.3 to 1
      return 1.3 - ((breathingPhase - 8) / 4) * 0.3;
    }
  };

  const breathingText = [
    'Breathe in...',
    'Breathe in...',
    'Breathe in...',
    'Breathe in...',
    'Hold...',
    'Hold...',
    'Hold...',
    'Hold...',
    'Breathe out...',
    'Breathe out...',
    'Breathe out...',
    'Breathe out...',
  ];

  return (
    <div className="fixed inset-0 bg-sanctuary-dark flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-accent hover:opacity-80 transition-opacity z-10"
        aria-label="Exit meditation mode"
      >
        <X size={32} />
      </button>

      {/* Main meditation content */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        {/* Breathing orb */}
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-accent/60 shadow-sanctuary-lg transition-transform duration-1000 ease-in-out"
          style={{
            transform: `scale(${getOrbScale()})`,
            opacity: 0.8,
          }}
        />

        {/* Breathing instruction */}
        <p className="text-heading-lg text-accent font-serif animate-fade-in">
          {breathingText[breathingPhase]}
        </p>

        {/* Session timer */}
        <div className="text-center mt-8">
          <p className="text-body-md text-accent/70 font-serif mb-2">Session Time</p>
          <p className="text-display-md text-accent font-serif">
            {formatSessionTime(sessionTime)}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="mb-8 space-y-4 text-center">
        <p className="text-body-md text-accent/70 font-serif">
          Follow your breath. Time flows gently.
        </p>
        <Button
          onClick={onClose}
          variant="outline"
          className="border-accent text-accent hover:bg-accent/10"
        >
          End Session
        </Button>
      </div>
    </div>
  );
}
