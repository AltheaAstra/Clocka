import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Settings, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ClockDisplay from '@/components/ClockDisplay';
import SoundSettings from '@/components/SoundSettings';
import QuarterHourSettings from '@/components/QuarterHourSettings';
import BuddhistEventMode from '@/components/BuddhistEventMode';
import MeditationMode from '@/components/MeditationMode';

/**
 * Clockka - Buddhist Clock & Meditation App
 * Design Philosophy: Soft Sanctuary
 * 
 * This home page combines:
 * - Beautiful clock display (analog/digital/fullscreen modes)
 * - Quarter-hour bell system with customizable intervals
 * - Sound customization with multiple packs
 * - Buddhist event presets
 * - Meditation mode with breathing animations
 */
export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [clockMode, setClockMode] = useState<'analog' | 'digital' | 'fullscreen'>('digital');
  const [isMuted, setIsMuted] = useState(false);
  const [currentSound, setCurrentSound] = useState('temple-bell');
  const [currentVolume, setCurrentVolume] = useState(70);
  const [enabledIntervals, setEnabledIntervals] = useState({
    0: true,
    15: true,
    30: true,
    45: true,
  });
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isMeditationActive, setIsMeditationActive] = useState(false);

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
            <img src="/manus-storage/clockka-logo_d6e9a3b2.png" alt="Clockka" className="w-10 h-10" />
            <h1 className="text-heading-lg text-foreground font-serif">Clockka</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section with Clock */}
        <div className="mb-12 p-8 rounded-2xl bg-card shadow-sanctuary border border-border">
          <div className="flex flex-col items-center gap-8">
            <ClockDisplay mode={clockMode} isMuted={isMuted} onMuteToggle={() => setIsMuted(!isMuted)} />

            {/* Clock Mode Selector */}
            <div className="flex gap-2">
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
        <div className="mb-12">
          <Button
            onClick={() => setIsMeditationActive(true)}
            className="w-full bg-accent text-accent-foreground py-6 rounded-xl text-heading-md shadow-sanctuary hover:opacity-90 transition-opacity"
          >
            <Zap className="mr-2" size={24} />
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
            <BuddhistEventMode onEventSelect={setSelectedEvent} selectedEvent={selectedEvent} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Meditation Mode Overlay */}
      <MeditationMode isActive={isMeditationActive} onClose={() => setIsMeditationActive(false)} />
    </div>
  );
}
