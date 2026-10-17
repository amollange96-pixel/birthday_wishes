/**
 * Romantic Audio Engine
 * Plays an elegant, soothing acoustic music-box & piano instrumental arpeggio
 * synthesized in real-time via Web Audio API, or streams a custom romantic track.
 */

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private volume = 0.45;
  private customAudio: HTMLAudioElement | null = null;
  private noteIndex = 0;

  // Romantic chord progression arpeggio frequencies (Db Maj7 -> Bbm9 -> Gb Maj7 -> Ab6/9)
  // Soft, emotional, dreamy music box intervals
  private chords: number[][] = [
    // Db Maj7
    [277.18, 349.23, 415.30, 523.25, 554.37, 698.46],
    // Bbm9
    [233.08, 277.18, 349.23, 415.30, 466.16, 554.37],
    // Gb Maj7
    [185.00, 277.18, 369.99, 440.00, 554.37, 739.99],
    // Ab add9
    [207.65, 261.63, 311.13, 415.30, 466.16, 622.25],
  ];

  private currentChord = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;

    if (this.customAudio) {
      this.customAudio.volume = this.volume;
      this.customAudio.play().catch(() => {
        // Fall back to synth
        this.startSynth();
      });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    if (!this.ctx) return;
    const stepInterval = 420; // ms per note

    const step = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chordNotes = this.chords[this.currentChord];
      const freq = chordNotes[this.noteIndex % chordNotes.length];

      this.playNote(freq);

      this.noteIndex++;
      if (this.noteIndex >= chordNotes.length * 2) {
        this.noteIndex = 0;
        this.currentChord = (this.currentChord + 1) % this.chords.length;
      }

      this.timer = window.setTimeout(step, stepInterval);
    };

    step();
  }

  private playNote(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Dual oscillator: Warm sine base + delicate triangle overtone for chime/bell warmth
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft octave harmonic

    // Warm gentle low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 1.2);

    // Envelope
    const noteGain = this.volume * 0.28;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(noteGain, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.5);
    osc2.stop(now + 1.5);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public loadCustomTrack(url: string) {
    this.pause();
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = this.volume;
    this.customAudio = audio;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioPlayer();
