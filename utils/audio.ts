class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(87.31, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime(130.81, this.ctx.currentTime);

    const padGain1 = this.ctx.createGain();
    padGain1.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.osc1.connect(padGain1);
    padGain1.connect(this.filter);

    const padGain2 = this.ctx.createGain();
    padGain2.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.osc2.connect(padGain2);
    padGain2.connect(this.filter);

    this.osc1.start();
    this.osc2.start();
  }

  public toggle(): boolean {
    if (!this.isPlaying) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.35, now + 1.2);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 0.6);
    this.isPlaying = false;
  }

  public triggerTick(frequency = 580) {
    if (!this.isPlaying || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const tickOsc = this.ctx.createOscillator();
      const tickGain = this.ctx.createGain();
      tickOsc.type = "sine";
      tickOsc.frequency.setValueAtTime(frequency, now);
      tickGain.gain.setValueAtTime(0.04, now);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      tickOsc.connect(tickGain);
      tickGain.connect(this.ctx.destination);
      tickOsc.start(now);
      tickOsc.stop(now + 0.09);
    } catch {
      // Audio tick error suppression
    }
  }

  public updateFilter(speedProgress: number) {
    if (!this.isPlaying || !this.ctx || !this.filter) return;
    const targetFreq = 260 + speedProgress * 500;
    this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = typeof window !== "undefined" ? new AmbientAudioEngine() : null;
