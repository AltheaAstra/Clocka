import { Volume2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { SoundPack, playChime } from '@/lib/soundSystem';

interface SoundSettingsProps {
  currentSound: SoundPack;
  currentVolume: number;
  onSoundChange: (sound: SoundPack) => void;
  onVolumeChange: (volume: number) => void;
}

const SOUND_PACKS: { id: SoundPack; name: string; description: string }[] = [
  {
    id: 'temple-bell',
    name: 'Temple Bell',
    description: 'Traditional Buddhist temple bell with warm resonance',
  },
  {
    id: 'singing-bowl',
    name: 'Singing Bowl',
    description: 'Meditative singing bowl with peaceful vibration',
  },
  {
    id: 'mokugyo',
    name: 'Wooden Mokugyo',
    description: 'Bright wooden rhythm instrument used in meditation halls',
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    description: 'Gentle wind chimes for a calming atmosphere',
  },
  {
    id: 'meditation-tones',
    name: 'Meditation Tones',
    description: 'Pure tones designed for deep meditation practice',
  },
  {
    id: 'nature-sounds',
    name: 'Nature Sounds',
    description: 'Forest ambience and natural soundscapes',
  },
];

/**
 * Sound Settings Component
 * Design: Soft Sanctuary aesthetic with luxury styling
 * Allows users to select sound packs and adjust volume
 */
export default function SoundSettings({
  currentSound,
  currentVolume,
  onSoundChange,
  onVolumeChange,
}: SoundSettingsProps) {
  const handlePreviewSound = () => {
    playChime(12, 0, {
      pack: currentSound,
      volume: currentVolume,
      enabled: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Volume Control */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Volume2 size={24} className="text-accent" />
          <h3 className="text-heading-md text-foreground">Volume Control</h3>
        </div>
        
        <div className="space-y-3">
          <Slider
            value={[currentVolume]}
            onValueChange={(value) => onVolumeChange(value[0])}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-body-sm text-muted-foreground">
            <span>Quiet</span>
            <span className="text-accent font-semibold">{currentVolume}%</span>
            <span>Loud</span>
          </div>
        </div>
      </div>

      {/* Sound Pack Selection */}
      <div className="space-y-4">
        <h3 className="text-heading-md text-foreground">Choose Sound Pack</h3>
        <p className="text-body-md text-muted-foreground">
          Select your preferred chime sound for meditation and practice sessions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOUND_PACKS.map((pack) => (
            <Card
              key={pack.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                currentSound === pack.id
                  ? 'border-accent bg-accent/10 shadow-sanctuary'
                  : 'border-border hover:border-accent/50'
              }`}
              onClick={() => onSoundChange(pack.id)}
            >
              <h4 className="text-heading-sm text-foreground mb-1">{pack.name}</h4>
              <p className="text-body-sm text-muted-foreground mb-3">{pack.description}</p>
              
              {currentSound === pack.id && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviewSound();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Play size={16} className="mr-2" />
                  Preview
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Sound Information */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h4 className="text-heading-sm text-foreground">Sound Identity</h4>
        <p className="text-body-sm text-muted-foreground">
          Each hour has a unique sound signature to help you recognize time without looking at the clock:
        </p>
        <ul className="text-body-sm text-muted-foreground space-y-1 ml-4">
          <li>• <strong>6:00</strong> — Soft morning temple bell</li>
          <li>• <strong>9:00</strong> — Bright wooden mokugyo rhythm</li>
          <li>• <strong>12:00</strong> — Elegant noon bell with longer resonance</li>
          <li>• <strong>18:00</strong> — Evening chanting bell</li>
          <li>• <strong>21:00</strong> — Calm meditation chime</li>
          <li>• <strong>00:00</strong> — Deep and peaceful temple gong</li>
        </ul>
      </div>
    </div>
  );
}
