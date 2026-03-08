// ── Web Audio Sound Manager ────────────────────────────────────
// Generates sounds programmatically - no files needed.
// All sounds are subtle and tasteful.

let ctx: AudioContext | null = null;
export let soundEnabled = false;

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled && !ctx) {
    ctx = new AudioContext();
  }
  return soundEnabled;
}

export function setSoundEnabled(val: boolean) {
  soundEnabled = val;
  if (val && !ctx) ctx = new AudioContext();
}

function getCtx(): AudioContext | null {
  if (!soundEnabled) return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, vol: number, type: OscillatorType = 'sine') {
  const c = getCtx();
  if (!c) return;
  try {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration);
  } catch {}
}

export const sounds = {
  hover: () => tone(1400, 0.02, 0.04),
  click: () => { tone(600, 0.05, 0.08); tone(900, 0.03, 0.05); },
  type: () => tone(1000, 0.012, 0.035),
  enter: () => { tone(400, 0.08, 0.09); setTimeout(() => tone(600, 0.08, 0.07), 60); setTimeout(() => tone(800, 0.1, 0.06), 120); },
  error: () => { tone(220, 0.1, 0.08, 'square'); setTimeout(() => tone(180, 0.1, 0.06, 'square'), 80); },
  swoosh: () => {
    const c = getCtx();
    if (!c) return;
    try {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.frequency.setValueAtTime(150, c.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.18);
      gain.gain.setValueAtTime(0.04, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.18);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + 0.18);
    } catch {}
  },
  navEnter: () => { tone(800, 0.06, 0.05); setTimeout(() => tone(1000, 0.06, 0.04), 50); },
};
