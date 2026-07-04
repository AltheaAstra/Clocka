import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface BuddhistEventModeProps {
  onEventSelect: (event: string) => void;
  selectedEvent: string | null;
}

const EVENTS = [
  {
    id: 'dharma-camp',
    name: "Children's Dharma Camp",
    description: 'Friendly, engaging sounds for young practitioners',
    features: ['Playful bell sounds', 'Shorter intervals', 'Encouraging messages'],
  },
  {
    id: 'meditation-retreat',
    name: 'Meditation Retreat',
    description: 'Deep, peaceful atmosphere for extended practice',
    features: ['Gentle bells', 'Hourly announcements', 'Silence periods'],
  },
  {
    id: 'yogi-intensive',
    name: 'Yogi Intensive Practice',
    description: 'Structured schedule for advanced practitioners',
    features: ['Precise timing', 'Multiple practice sessions', 'Progress tracking'],
  },
  {
    id: 'temple-ceremony',
    name: 'Temple Ceremony',
    description: 'Traditional ceremonial timing and sounds',
    features: ['Ceremonial bells', 'Chanting cues', 'Sacred atmosphere'],
  },
  {
    id: 'merit-making',
    name: 'Merit-Making Event',
    description: 'Supportive timing for group merit-making activities',
    features: ['Uplifting sounds', 'Group coordination', 'Celebration tones'],
  },
  {
    id: 'ordination',
    name: 'Ordination Ceremony',
    description: 'Sacred timing for ordination ceremonies',
    features: ['Solemn bells', 'Ceremonial sequences', 'Reverent atmosphere'],
  },
];

export default function BuddhistEventMode({
  onEventSelect,
  selectedEvent,
}: BuddhistEventModeProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles size={24} className="text-accent" />
        <h3 className="text-heading-md text-foreground">Buddhist Event Presets</h3>
      </div>

      <p className="text-body-md text-muted-foreground">
        Choose a preset to automatically configure sounds and schedules for your event.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map((event) => (
          <button
            key={event.id}
            onClick={() => onEventSelect(event.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedEvent === event.id
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/50'
            }`}
          >
            <h4 className="font-semibold text-foreground mb-1">{event.name}</h4>
            <p className="text-body-sm text-muted-foreground mb-3">{event.description}</p>
            <div className="space-y-1">
              {event.features.map((feature, idx) => (
                <div key={idx} className="text-body-sm text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
