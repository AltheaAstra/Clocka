import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

/**
 * Buddhist Event Mode Component
 * Design: Soft Sanctuary aesthetic with luxury styling
 * Provides presets for different Buddhist activities
 */
export default function BuddhistEventMode({
  onEventSelect,
  selectedEvent,
}: BuddhistEventModeProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sparkles size={24} className="text-accent" />
        <div>
          <h3 className="text-heading-md text-foreground">Buddhist Event Presets</h3>
          <p className="text-body-sm text-muted-foreground">
            Choose a preset to automatically configure sounds and schedules
          </p>
        </div>
      </div>

      {/* Event cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map((event) => (
          <Card
            key={event.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selectedEvent === event.id
                ? 'border-accent bg-accent/10 shadow-sanctuary'
                : 'border-border hover:border-accent/50'
            }`}
            onClick={() => onEventSelect(event.id)}
          >
            <h4 className="text-heading-sm text-foreground mb-1">{event.name}</h4>
            <p className="text-body-sm text-muted-foreground mb-3">{event.description}</p>
            
            {/* Features list */}
            <div className="space-y-1">
              {event.features.map((feature, idx) => (
                <div key={idx} className="text-body-sm text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Selected indicator */}
            {selectedEvent === event.id && (
              <div className="mt-3 pt-3 border-t border-accent/20">
                <span className="text-body-sm font-semibold text-accent">✓ Selected</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Information box */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-2">
        <h4 className="text-heading-sm text-foreground">About Event Presets</h4>
        <p className="text-body-sm text-muted-foreground">
          Each preset automatically configures the bell system, sound selections, and timing intervals to match the specific needs of your Buddhist activity. You can still customize individual settings after selecting a preset.
        </p>
      </div>
    </div>
  );
}
