import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ClockDisplay from '@/components/ClockDisplay';
import SoundSettings from '@/components/SoundSettings';
import QuarterHourSettings from '@/components/QuarterHourSettings';
import BuddhistEventMode from '@/components/BuddhistEventMode';
import MeditationMode from '@/components/MeditationMode';
import { SoundPack, playChime, shouldPlayChime } from '@/lib/soundSystem';

/**
 * Clockka - Buddhist Clock & Meditation App
 * Design Philosophy: Soft Sanctuary
 * 
 * A luxury Buddhist-themed clock app with:
 * - Beautiful clock display (analog/digital/fullscreen modes)
 * - Quarter-hour bell system with customizable intervals
 * - Sound customization with multiple packs
 * - Buddhist event presets
 * - Meditation mode with breathing animations
 * - Distinct sounds for specific hours (6, 9, 12, 18, 21, 0)
 */
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [clockMode, setClockMode] = useState<'analog' | 'digital' | 'fullscreen'>('digital');
  const [isMuted, setIsMuted] = useState(false);
  const [currentSound, setCurrentSound] = useState<SoundPack>('temple-bell');
  const [currentVolume, setCurrentVolume] = useState(70);
  const [enabledIntervals, setEnabledIntervals] = useState({
    0: true,
    15: true,
    30: true,
    45: true,
  });
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isMeditationActive, setIsMeditationActive] = useState(false);
  const [lastChimeTime, setLastChimeTime] = useState<string>('');

  // Handle chime playback on minute change
  useEffect(() => {
    const checkChime = setInterval(() => {
      const now = new Date();
      const minute = now.getMinutes();
      const hour = now.getHours();
      const timeKey = `${hour}:${minute}`;

      // Only play chime if it's a new minute and not muted
      if (timeKey !== lastChimeTime && !isMuted) {
        if (shouldPlayChime(hour, minute, enabledIntervals)) {
          playChime(hour, minute, {
            pack: currentSound,
            volume: currentVolume,
            enabled: true,
          });
          setLastChimeTime(timeKey);
        }
      }
    }, 1000);

    return () => clearInterval(checkChime);
  }, [isMuted, currentSound, currentVolume, enabledIntervals, lastChimeTime]);

  const handleIntervalToggle = (interval: number) => {
    setEnabledIntervals((prev) => ({
      ...prev,
      [interval]: !prev[interval as keyof typeof prev],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/clockka-logo_629933cd.png" alt="Clockka" className="w-10 h-10" />
            <h1 className="text-heading-lg text-foreground font-serif">Clockka</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container py-8 space-y-12">
        {/* Hero Section with Clock */}
        <div className="p-8 rounded-2xl bg-card shadow-sanctuary-lg border border-border">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center mb-4">
              <h2 className="text-display-md text-foreground font-serif mb-2">
                Your Meditation Companion
              </h2>
              <p className="text-body-md text-muted-foreground">
                Time flows gently. Practice mindfully.
              </p>
            </div>

            <ClockDisplay 
              mode={clockMode} 
              isMuted={isMuted} 
              onMuteToggle={() => setIsMuted(!isMuted)}
              onModeChange={setClockMode}
            />

            {/* Clock Mode Selector */}
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                onClick={() => setClockMode('digital')}
                variant={clockMode === 'digital' ? 'default' : 'outline'}
                className="rounded-full"
              >
                Digital
              </Button>
              <Button
                onClick={() => setClockMode('analog')}
                variant={clockMode === 'analog' ? 'default' : 'outline'}
                className="rounded-full"
              >
                Analog
              </Button>
              <Button
                onClick={() => setClockMode('fullscreen')}
                variant={clockMode === 'fullscreen' ? 'default' : 'outline'}
                className="rounded-full"
              >
                Fullscreen
              </Button>
            </div>
          </div>
        </div>

        {/* Meditation Mode Button */}
        <div>
          <Button
            onClick={() => setIsMeditationActive(true)}
            className="w-full bg-accent text-accent-foreground py-6 rounded-xl text-heading-md shadow-sanctuary-lg hover:opacity-90 transition-opacity"
          >
            <Zap className="mr-3" size={24} />
            Enter Meditation Mode
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="sounds" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="sounds" className="rounded-lg">
              Sounds
            </TabsTrigger>
            <TabsTrigger value="bell-system" className="rounded-lg">
              Bell System
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-lg">
              Events
            </TabsTrigger>
          </TabsList>

          {/* Sounds Tab */}
          <TabsContent value="sounds" className="space-y-6 p-6 bg-card rounded-xl border border-border">
            <SoundSettings
              onSoundChange={setCurrentSound}
              onVolumeChange={setCurrentVolume}
              currentSound={currentSound}
              currentVolume={currentVolume}
            />
          </TabsContent>

          {/* Bell System Tab */}
          <TabsContent value="bell-system" className="space-y-6 p-6 bg-card rounded-xl border border-border">
            <QuarterHourSettings
              enabledIntervals={enabledIntervals}
              onIntervalToggle={handleIntervalToggle}
            />
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6 p-6 bg-card rounded-xl border border-border">
            <BuddhistEventMode 
              onEventSelect={setSelectedEvent} 
              selectedEvent={selectedEvent} 
            />
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-body-md text-muted-foreground font-serif">
            "Time should not interrupt practice. Time should support mindfulness."
          </p>
          <p className="text-body-sm text-muted-foreground mt-2">
            Clockka — A spiritual companion for mindful timekeeping
          </p>
        </div>
      </main>

      {/* Meditation Mode Overlay */}
      <MeditationMode 
        isActive={isMeditationActive} 
        onClose={() => setIsMeditationActive(false)} 
      />
    </div>
  );
}
