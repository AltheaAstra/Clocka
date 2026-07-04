/**
 * Sound System for Clockka
 * Manages chime sounds with distinct audio for different hours and intervals
 * 
 * Sound Identity:
 * - 06:00 → soft morning temple bell
 * - 09:00 → bright wooden mokugyo rhythm
 * - 12:00 → elegant noon bell with longer resonance
 * - 18:00 → evening chanting bell
 * - 21:00 → calm meditation chime
 * - 00:00 → deep and peaceful temple gong
 * - Other hours → gentle quarter-hour chime
 */

export type SoundPack = 'temple-bell' | 'singing-bowl' | 'mokugyo' | 'wind-chimes' | 'meditation-tones' | 'nature-sounds';

export interface SoundConfig {
  pack: SoundPack;
  volume: number; // 0-100
  enabled: boolean;
}

export interface ChimeConfig {
  intervals: {
    0: boolean;   // Top of hour
    15: boolean;  // Quarter past
    30: boolean;  // Half past
    45: boolean;  // Quarter to
  };
  soundConfig: SoundConfig;
}

/**
 * Generate a simple sine wave tone for testing
 * In production, these would be replaced with actual audio files
 */
function generateTone(frequency: number, duration: number, audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < buffer.length; i++) {
    data[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.3;
  }
  
  return buffer;
}

/**
 * Create an audio context and play a chime sound
 * This is a simplified implementation - production would use actual audio files
 */
export function playChime(hour: number, minute: number, config: SoundConfig): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Determine which sound to play based on hour and minute
    let frequency = 440; // Default A4
    let duration = 0.5;  // Default duration in seconds
    let pattern: number[] = []; // Frequency pattern for rhythm
    
    // Special sounds for specific hours
    if (minute === 0) {
      // Top of hour - use distinct sounds
      switch (hour) {
        case 6:
          // Morning bell - soft, gentle
          frequency = 392; // G4
          duration = 2;
          pattern = [392, 392, 349]; // G, G, F
          break;
        case 9:
          // Mokugyo rhythm - bright, rhythmic
          frequency = 523; // C5
          duration = 1.5;
          pattern = [523, 523, 587, 523]; // C, C, D, C
          break;
        case 12:
          // Noon bell - elegant, long resonance
          frequency = 349; // F4
          duration = 3;
          pattern = [349, 349, 349]; // F, F, F
          break;
        case 18:
          // Evening chanting bell
          frequency = 293; // D4
          duration = 2.5;
          pattern = [293, 293, 330]; // D, D, E
          break;
        case 21:
          // Meditation chime - calm
          frequency = 440; // A4
          duration = 2;
          pattern = [440, 440, 392]; // A, A, G
          break;
        case 0:
          // Midnight gong - deep, peaceful
          frequency = 220; // A3
          duration = 3;
          pattern = [220, 220, 220]; // A, A, A
          break;
        default:
          // Other hours - gentle quarter-hour chime
          frequency = 440; // A4
          duration = 1;
          pattern = [440, 440]; // A, A
      }
    } else {
      // Quarter-hour intervals - gentle chimes
      frequency = 440; // A4
      duration = 0.8;
      pattern = [440]; // Single chime
    }
    
    // Calculate volume from config (0-100 to 0-1)
    const volume = config.volume / 100;
    
    // Play the pattern
    let startTime = audioContext.currentTime;
    for (let i = 0; i < pattern.length; i++) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = pattern[i];
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration / pattern.length);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration / pattern.length);
      
      startTime += duration / pattern.length + 0.1; // Small gap between tones
    }
  } catch (error) {
    console.warn('Audio playback not available:', error);
  }
}

/**
 * Check if a chime should play at the current time
 */
export function shouldPlayChime(
  hour: number,
  minute: number,
  enabledIntervals: Record<number, boolean>
): boolean {
  return enabledIntervals[minute] || false;
}

/**
 * Get the sound description for a specific hour
 */
export function getSoundDescription(hour: number): string {
  switch (hour) {
    case 6:
      return 'Soft morning temple bell';
    case 9:
      return 'Bright wooden mokugyo rhythm';
    case 12:
      return 'Elegant noon bell with longer resonance';
    case 18:
      return 'Evening chanting bell';
    case 21:
      return 'Calm meditation chime';
    case 0:
      return 'Deep and peaceful temple gong';
    default:
      return 'Gentle quarter-hour chime';
  }
}

/**
 * Format time for display
 */
export function formatTime(date: Date): { hours: string; minutes: string; seconds: string } {
  return {
    hours: date.getHours().toString().padStart(2, '0'),
    minutes: date.getMinutes().toString().padStart(2, '0'),
    seconds: date.getSeconds().toString().padStart(2, '0'),
  };
}
