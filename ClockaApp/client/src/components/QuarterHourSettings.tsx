import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface QuarterHourSettingsProps {
  enabledIntervals: Record<number, boolean>;
  onIntervalToggle: (interval: number) => void;
}

const INTERVALS = [
  { minute: 0, label: 'Top of Hour', description: 'Chime at :00 minutes' },
  { minute: 15, label: 'Quarter Past', description: 'Chime at :15 minutes' },
  { minute: 30, label: 'Half Past', description: 'Chime at :30 minutes' },
  { minute: 45, label: 'Quarter To', description: 'Chime at :45 minutes' },
];

/**
 * Quarter Hour Settings Component
 * Design: Soft Sanctuary aesthetic
 * Allows users to enable/disable chime intervals
 */
export default function QuarterHourSettings({
  enabledIntervals,
  onIntervalToggle,
}: QuarterHourSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Clock size={24} className="text-accent" />
        <div>
          <h3 className="text-heading-md text-foreground">Quarter-Hour Bell System</h3>
          <p className="text-body-sm text-muted-foreground">
            Customize when chimes sound throughout the day
          </p>
        </div>
      </div>

      {/* Interval toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTERVALS.map((interval) => (
          <Card
            key={interval.minute}
            className="p-4 border border-border hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-heading-sm text-foreground mb-1">
                  {interval.label}
                </h4>
                <p className="text-body-sm text-muted-foreground">
                  {interval.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={enabledIntervals[interval.minute] || false}
                  onCheckedChange={() => onIntervalToggle(interval.minute)}
                  aria-label={`Toggle ${interval.label}`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Information box */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-2">
        <h4 className="text-heading-sm text-foreground">How It Works</h4>
        <p className="text-body-sm text-muted-foreground">
          The bell system announces time automatically at your selected intervals. Each hour has a unique sound signature to help you recognize time without looking at the clock. Enable or disable intervals based on your practice needs.
        </p>
        <p className="text-body-sm text-muted-foreground">
          For meditation retreats, you might enable only the top of the hour. For daily practice, all intervals create a gentle rhythm throughout the day.
        </p>
      </div>

      {/* Active intervals summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-heading-sm text-foreground mb-3">Active Intervals</h4>
        <div className="flex flex-wrap gap-2">
          {INTERVALS.filter((i) => enabledIntervals[i.minute]).length === 0 ? (
            <p className="text-body-sm text-muted-foreground">No intervals enabled</p>
          ) : (
            INTERVALS.filter((i) => enabledIntervals[i.minute]).map((interval) => (
              <span
                key={interval.minute}
                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-body-sm font-medium"
              >
                :{interval.minute.toString().padStart(2, '0')}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
