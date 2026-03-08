import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER, NEOFETCH, PROJECTS, SKILLS, TIMELINE, TERMINAL_DATA } from '../data/content';
import { sounds } from '../utils/sounds';

// ── Types ─────────────────────────────────────────────────────
type LineType = 'cmd' | 'out' | 'err' | 'welcome';
type Line = { id: number; type: LineType; content: React.ReactNode };
let _lineId = 0;
const mkLine = (type: LineType, content: React.ReactNode): Line => ({ id: _lineId++, type, content });

// ── Inline colored text helper ────────────────────────────────
const C = ({ c = 'text-primary', children }: { c?: string; children: React.ReactNode }) => (
  <span className={c}>{children}</span>
);

// ── Easter egg trigger (direct DOM, no prop drilling) ─────────
function triggerEgg(egg: string, durationMs?: number) {
  document.documentElement.setAttribute('data-egg', egg);
  if (durationMs) {
    setTimeout(() => {
      if (document.documentElement.getAttribute('data-egg') === egg) {
        document.documentElement.removeAttribute('data-egg');
      }
    }, durationMs);
  }
}
function clearEgg() {
  document.documentElement.removeAttribute('data-egg');
}

// ── ASCII art ────────────────────────────────────────────────
const LOGO_ASCII = `
 ██╗  ██╗██████╗ 
 ██║ ██╔╝██╔══██╗
 █████╔╝ ██████╔╝
 ██╔═██╗ ██╔═══╝ 
 ██║  ██╗██║     
 ╚═╝  ╚═╝╚═╝     `;

// ── Random quotes ─────────────────────────────────────────────
const QUOTES = [
  '"The best performance improvement is the transition from nonworking to working." — John Ousterhout',
  '"Hardware is hard." — Every EE Student',
  '"It worked in simulation." — Literally everyone',
  '"Add a decoupling cap and try again." — Senior Engineer',
  '"There are only 10 types of people: those who understand binary and those who don\'t."',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Debugging is twice as hard as writing the code in the first place." — Kernighan',
  '"Weeks of coding can save you hours of planning." — Unknown EE',
  '"If it ain\'t broke, route it again." — PCB Designer Proverb',
  '"Simulation is not reality. Reality has parasitics." — Analog Engineer',
];

// ── Fake git log ──────────────────────────────────────────────
const GIT_LOG = [
  { hash: 'a3f9c12', ref: 'HEAD -> main', msg: 'feat: it finally works (don\'t touch it)',     ago: '2 hours ago'   },
  { hash: 'b7e2d45', ref: '',             msg: 'fix: typo in abstract (was in the title)',        ago: '1 day ago'     },
  { hash: 'c1a8f67', ref: '',             msg: 'chore: 3am debugging session (no idea why)',      ago: '3 days ago'    },
  { hash: 'd4b3a90', ref: '',             msg: 'docs: wrote README nobody will read it',          ago: '1 week ago'    },
  { hash: 'e9f1c23', ref: 'origin/main',  msg: 'feat: actual working Verilog (rare occurrence)', ago: '2 weeks ago'   },
  { hash: 'f2d7b56', ref: '',             msg: 'refactor: changed everything, nothing improved',  ago: '3 weeks ago'   },
];

// ── Welcome message ───────────────────────────────────────────
const WELCOME: React.ReactNode = (
  <div className="space-y-0.5">
    <pre className="text-primary text-[7.5px] leading-[1.45]">{LOGO_ASCII}</pre>
    <div className="mt-2 space-y-0.5">
      {NEOFETCH.map(({ key, value }) => (
        <div key={key} className="flex gap-2">
          <span className="text-primary w-12 shrink-0 text-[10px]">{key}</span>
          <span className="text-zinc-500 text-[10px]">: {value}</span>
        </div>
      ))}
      <div className="flex gap-1.5 mt-2">
        {['bg-red-500','bg-yellow-400','bg-green-500','bg-cyan-400','bg-blue-500','bg-violet-500','bg-pink-400','bg-white/80'].map(c=>(
          <span key={c} className={`w-3 h-3 inline-block rounded-sm ${c}`}/>
        ))}
      </div>
    </div>
    <p className="mt-2.5 text-zinc-600 text-[10px]">
      Type <C>help</C> for commands.{' '}
      <span className="text-zinc-700 italic">Try: ls · cd projects · whoami · love · matrix…</span>
    </p>
  </div>
);

// ── Command processor ─────────────────────────────────────────
function processCommand(
  rawInput: string
): React.ReactNode | '__CLEAR__' | '__ENTER__' {
  const input = rawInput.trim();
  if (!input) return null;

  const lower = input.toLowerCase();
  const parts = lower.split(/\s+/);
  const base = parts[0];
  const arg = parts.slice(1).join(' ');
  const argRaw = input.split(/\s+/).slice(1).join(' ');

  // ═══════════════════════════════════════════════════════════
  //  EASTER EGGS
  // ═══════════════════════════════════════════════════════════

  if (['love', 'i love you', 'love kp', 'love you'].includes(lower)) {
    triggerEgg('love', 8500);
    return (
      <div className="space-y-1">
        <pre className="text-pink-400 text-[10px] leading-tight select-none">
{`  ♥♥♥   ♥♥♥
 ♥♥♥♥♥ ♥♥♥♥♥
♥♥♥♥♥♥♥♥♥♥♥♥♥
 ♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥
   ♥♥♥♥♥♥♥
    ♥♥♥♥♥
     ♥♥♥
      ♥`}
        </pre>
        <p className="text-pink-400 text-[10px]">kernel panic: too many feelings detected</p>
        <p className="text-pink-300 text-[10px]">switching website to rose mode for 8 seconds...</p>
        <p className="text-zinc-600 text-[9px] italic">type <C c="text-pink-400">hate</C> to restore normal mode early</p>
      </div>
    );
  }

  if (['hate', 'hate you', 'reset', 'reset colors', 'normal', 'nevermind'].includes(lower)) {
    clearEgg();
    return <p className="text-zinc-400 text-[10px]">color mode reset. cold and calculated. as it should be.</p>;
  }

  if (lower === 'matrix' || lower === 'enter the matrix') {
    triggerEgg('matrix', 10000);
    return (
      <div className="text-green-400 space-y-0.5 text-[10px]">
        <p>Wake up, Neo...</p>
        <p>The Matrix has you.</p>
        <p className="text-green-600">Follow the white rabbit. 🐇</p>
        <p className="text-zinc-600 mt-1">type <C c="text-green-400">exit matrix</C> to escape</p>
      </div>
    );
  }

  if (lower === 'exit matrix' || lower === 'take the blue pill') {
    clearEgg();
    return <p className="text-zinc-400 text-[10px]">you took the blue pill. reality restored. the matrix never existed.</p>;
  }

  if (lower === 'hack' || lower === 'hack the planet' || lower === 'i am in') {
    triggerEgg('hack', 5000);
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-green-400">Initializing hack sequence...</p>
        <p className="text-green-400">[ ███░░░░░░░ ] 30% — bypassing firewall</p>
        <p className="text-green-400">[ ██████░░░░ ] 60% — injecting payload</p>
        <p className="text-green-400">[ ██████████ ] 100% — ACCESS GRANTED</p>
        <p className="text-yellow-400 mt-1">just kidding. this is a portfolio, not a CTF.</p>
      </div>
    );
  }

  if (lower === 'coffee' || lower === 'brew coffee' || lower === 'make coffee') {
    return (
      <div className="space-y-0.5">
        <pre className="text-yellow-400 text-[10px] leading-tight">
{`    ) )
   ( (
 ________
|        |]
|  ~~~~  |
|  BREW  |
|________|`}
        </pre>
        <p className="text-yellow-400 text-[10px]">brewing... ☕  caffeine level: CRITICAL</p>
        <p className="text-zinc-600 text-[9px] italic">fun fact: this entire portfolio was built on caffeine and One Piece episodes.</p>
      </div>
    );
  }

  if (lower === 'sudo rm -rf /' || lower === 'sudo rm -rf *' || lower === 'rm -rf /') {
    return (
      <div className="text-red-400 text-[10px] space-y-0.5">
        <p>rm: it is dangerous to operate recursively on '/'</p>
        <p>rm: use --no-preserve-root to override this failsafe</p>
        <p className="text-zinc-600 mt-1 italic">nice try. this portfolio is immutable. like a mask ROM.</p>
      </div>
    );
  }

  if (lower === 'vim' || lower === 'vi' || lower === 'nano') {
    return (
      <div className="text-[10px] space-y-1">
        <div className="border border-zinc-800 p-3 bg-zinc-900/40">
          <p className="text-zinc-500">~</p>
          <p className="text-zinc-500">~</p>
          <p className="text-zinc-500">~</p>
          <p className="text-zinc-700 text-[9px]">"portfolio.tsx" [readonly] 309L, 12741C — you are now trapped</p>
        </div>
        <p className="text-yellow-400">you are inside vim. there is no escape. there has never been escape.</p>
        <p className="text-zinc-600 italic">hint: type <C>:q!</C> if you think that will help.</p>
      </div>
    );
  }

  if ([':q!', ':q', ':wq', ':wq!', ':x'].includes(lower)) {
    return <p className="text-zinc-400 text-[10px]">vim closed. you escaped. you are the chosen one.</p>;
  }

  if (lower === 'fortune' || lower === 'fortune cookie') {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return (
      <div className="border-l-2 border-primary/40 pl-3 text-[10px]">
        <p className="text-zinc-300 italic">{q}</p>
      </div>
    );
  }

  if (lower === 'cowsay' || lower.startsWith('cowsay ')) {
    const text = argRaw || 'moo';
    const pad = text.length + 2;
    const top = ' ' + '_'.repeat(pad);
    const bot = ' ' + '-'.repeat(pad);
    return (
      <pre className="text-zinc-400 text-[9.5px] leading-tight">{`${top}\n< ${text} >\n${bot}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`}</pre>
    );
  }

  if (lower === 'git log' || lower === 'git log --oneline' || lower === 'git log --all') {
    return (
      <div className="text-[10px] space-y-1.5">
        {GIT_LOG.map(({ hash, ref, msg, ago }) => (
          <div key={hash} className="flex gap-3 items-baseline flex-wrap">
            <span className="text-yellow-400 shrink-0 font-bold">{hash}</span>
            {ref && <span className="text-primary text-[9px]">({ref})</span>}
            <span className="text-zinc-300">{msg}</span>
            <span className="text-zinc-700 ml-auto shrink-0 text-[9px]">{ago}</span>
          </div>
        ))}
      </div>
    );
  }

  if (lower === 'git status') {
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-zinc-400">On branch <C>main</C></p>
        <p className="text-zinc-400">Your branch is ahead of <C>'origin/main'</C> by 1 commit</p>
        <p className="text-zinc-600 mt-1">Changes not staged for commit:</p>
        <p className="text-red-400">  modified:   src/heart/motivation.rs</p>
        <p className="text-red-400">  modified:   config/sleep_schedule.conf</p>
        <p className="text-red-400">  deleted:    docs/social_life.md</p>
        <p className="text-zinc-600 mt-1">nothing added to commit but untracked files present</p>
      </div>
    );
  }

  if (lower === 'git diff') {
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-zinc-500">diff --git a/life.rs b/life.rs</p>
        <p className="text-red-400">- free_time: 8h/day</p>
        <p className="text-green-400">+ free_time: 0h/day</p>
        <p className="text-red-400">- sleep: regular</p>
        <p className="text-green-400">+ sleep: optional</p>
        <p className="text-red-400">- motivation: high</p>
        <p className="text-green-400">+ motivation: "it compiles, ship it"</p>
      </div>
    );
  }

  if (lower === 'ping kp' || lower === 'ping kaustubh' || lower === 'ping kaustubh.pandey') {
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-zinc-400">PING kaustubh.pandey (kaustubhofficial.kp@gmail.com)</p>
        <p className="text-green-400">64 bytes: icmp_seq=1 ttl=64 time=0.1ms — (always online)</p>
        <p className="text-green-400">64 bytes: icmp_seq=2 ttl=64 time=0.1ms — (currently debugging)</p>
        <p className="text-green-400">64 bytes: icmp_seq=3 ttl=64 time=0.1ms — (probably watching One Piece)</p>
        <p className="text-zinc-600 mt-1">--- kaustubh.pandey ping statistics ---</p>
        <p className="text-zinc-600">3 packets transmitted, 3 received, 0% packet loss</p>
      </div>
    );
  }

  if (lower.startsWith('ping ')) {
    const host = arg;
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-zinc-400">PING {host}...</p>
        <p className="text-yellow-400">Request timeout. Unreachable. Unlike KP — use <C>ping kp</C>.</p>
      </div>
    );
  }

  if (lower === 'uname -a' || lower === 'uname') {
    return <p className="text-zinc-400 text-[10px]">KP-Linux 22.04.0 KP-WORKSTATION #1 SMP RTL-Debug Hardware-Design-x86_64 Verilog GNU/EDA</p>;
  }

  if (lower === 'date') {
    return <p className="text-zinc-400 text-[10px]">{new Date().toString()}</p>;
  }

  if (lower === 'pwd') {
    return <p className="text-zinc-400 text-[10px]">/home/kp/portfolio</p>;
  }

  if (lower === 'uptime') {
    return <p className="text-zinc-400 text-[10px]">22:00:00 up 22 years, 0 days, 42 min — load average: 0.94, 0.88, 0.72</p>;
  }

  if (lower === 'whoami') {
    return (
      <div className="space-y-0.5 text-[10px]">
        <p className="text-zinc-300"><C>Name  :</C> {OWNER.name}</p>
        <p className="text-zinc-300"><C>Role  :</C> {OWNER.role}</p>
        <p className="text-zinc-400"><C>Study :</C> {OWNER.education}</p>
        <p className="text-zinc-500"><C>Web   :</C> <a href={OWNER.website} target="_blank" rel="noreferrer" className="underline underline-offset-2 text-primary">{OWNER.website}</a></p>
      </div>
    );
  }

  if (lower.startsWith('echo ')) {
    const txt = input.slice(5).replace(/^['"]|['"]$/g, '');
    if (lower.includes('$feelings') || lower.includes('$emotions')) return <p className="text-zinc-400 text-[10px]">undefined</p>;
    if (lower.includes('$path')) return <p className="text-zinc-400 text-[10px] break-all">/usr/local/sbin:/usr/local/bin:/home/kp/cadence:/home/kp/vivado:/home/kp/.cargo/bin</p>;
    return <p className="text-zinc-400 text-[10px]">{txt}</p>;
  }

  if (lower === 'history') {
    const fake = ['neofetch', 'cd projects', 'ls -la', 'vim simulation.txt', 'cat about', 'git log', 'fortune', 'coffee', 'love', 'git diff', 'ping kp', 'man kp'];
    return (
      <div className="text-[10px] space-y-0.5 text-zinc-400">
        {fake.map((cmd, i) => <p key={i}><span className="text-zinc-700 w-5 inline-block mr-2">{i+1}</span>{cmd}</p>)}
      </div>
    );
  }

  if (lower === 'top' || lower === 'htop') {
    return (
      <div className="text-[10px] space-y-0.5">
        <p className="text-primary">KP-TOP — System Monitor</p>
        <p className="text-zinc-500">Tasks: 12 running, 4 sleeping (all blocked on coffee)</p>
        <p className="text-zinc-500">CPU: [████████░░] 80% — compiling Verilog</p>
        <p className="text-zinc-500">MEM: [██████░░░░] 64% — too many browser tabs</p>
        <div className="border-t border-zinc-800 mt-1 pt-1 space-y-0.5">
          {[['kicad', '28%', 'S'], ['vivado', '22%', 'R'], ['one_piece', '18%', 'S'], ['motivation', '0%', 'Z']].map(([name,cpu,st])=>(
            <div key={name} className="flex gap-4">
              <span className="text-primary w-20">{name}</span>
              <span className="text-green-400 w-10">{cpu}</span>
              <span className={`${st === 'Z' ? 'text-red-400' : 'text-zinc-500'}`}>{st}</span>
            </div>
          ))}
        </div>
        <p className="text-zinc-700 italic mt-1">press q to quit (just type another command)</p>
      </div>
    );
  }

  if (lower === 'man kp' || lower === 'man kaustubh') {
    return (
      <div className="text-[10px] space-y-1.5">
        <p className="text-primary font-bold">KP(1) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User Commands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; KP(1)</p>
        <div className="space-y-1 text-zinc-400">
          <p><C>NAME</C>{'        '}kaustubh-pandey — hardware engineer, occasional overachiever</p>
          <p><C>SYNOPSIS</C>{'    '}kp [--design pcb|ic|fpga] [--compete] [--publish] [--debug 3am]</p>
          <p><C>DESCRIPTION</C>{'  '}Ships working hardware. Debugs RTL in the dark.</p>
          <p>{'             '}Known to watch One Piece while routing differential pairs.</p>
          <p><C>OPTIONS</C></p>
          <p>{'        '}--design pcb    Route high-speed signals, add decoupling caps.</p>
          <p>{'        '}--design ic     Bias transistors. Check stability. Repeat.</p>
          <p>{'        '}--compete       Win things internationally (see ACHIEVEMENTS).</p>
          <p><C>EXIT STATUS</C>{'  '}0 — always delivers (eventually)</p>
          <p><C>BUGS</C>{'        '}Tunnel vision. Refuses Windows. Excessive coffee consumption.</p>
          <p><C>SEE ALSO</C>{'    '}coffee(1), vim(1), kicad(8), cadence-virtuoso(1), one-piece(∞)</p>
        </div>
      </div>
    );
  }

  if (lower === 'sudo' || lower.startsWith('sudo ')) {
    return (
      <div className="text-[10px]">
        <p className="text-red-400">[sudo] password for kp:</p>
        <p className="text-red-400">kp is not in the sudoers file. this incident has been reported.</p>
        <p className="text-zinc-600 italic mt-1">(to Anthropic, probably)</p>
      </div>
    );
  }

  if (lower === 'cat .secrets' || lower === 'cat .env' || lower === 'cat /etc/passwd') {
    return (
      <div className="text-[10px]">
        <p className="text-red-400">cat: .secrets: Permission denied</p>
        <p className="text-zinc-700 italic mt-1">(it's just that I really like One Piece. and coffee. that's the whole secret.)</p>
      </div>
    );
  }

  if (lower === 'rm motivation.txt' || lower === 'rm -f motivation.txt') {
    return <p className="text-red-400 text-[10px]">rm: cannot remove 'motivation.txt': file is read-only. also it's the only thing keeping this going.</p>;
  }

  // ═══════════════════════════════════════════════════════════
  //  STANDARD COMMANDS
  // ═══════════════════════════════════════════════════════════

  if (lower === 'help' || lower === '?') {
    return (
      <div className="text-[10px] space-y-3">
        <p className="text-primary uppercase tracking-widest text-[9px]">Available Commands_</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0.5">
          {[
            ['ls / ls -la',     'list contents'],
            ['whoami',          'identity & info'],
            ['cat about',       'bio & philosophy'],
            ['cd education',    'academic background'],
            ['cd experience',   'work & internships'],
            ['cd projects',     'all projects'],
            ['cd skills',       'tech stack'],
            ['cd awards',       'achievements'],
            ['cd contact',      'get in touch'],
            ['neofetch',        'system info (pretty)'],
            ['git log',         'commit history'],
            ['git status',      'repo status'],
            ['git diff',        'life changes'],
            ['fortune',         'random wisdom'],
            ['top / htop',      'system monitor'],
            ['ping kp',         'am i online?'],
            ['man kp',          'read the manual'],
            ['uptime',          'how long running'],
            ['date',            'current date/time'],
            ['history',         'command history'],
            ['cowsay [text]',   'ASCII cow says...'],
            ['clear',           'clear terminal'],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex gap-2">
              <span className="text-primary shrink-0 min-w-[130px]">{cmd}</span>
              <span className="text-zinc-700">— {desc}</span>
            </div>
          ))}
        </div>
        <p className="text-zinc-700 italic text-[9px] border-t border-zinc-900 pt-2">
          🥚 easter eggs: try <C>love</C> · <C>matrix</C> · <C>coffee</C> · <C>hack</C> · <C>vim</C> · <C>cowsay hello</C> · <C>sudo anything</C>
        </p>
      </div>
    );
  }

  if (lower === 'ls' || lower === 'ls .' || lower === 'ls ~') {
    return (
      <div className="flex flex-wrap gap-5 text-[10px]">
        {['education/', 'experience/', 'projects/', 'skills/', 'awards/', 'contact/'].map(d => (
          <span key={d} className="text-primary">{d}</span>
        ))}
        <span className="text-zinc-600">README.md</span>
        <span className="text-zinc-600">resume.pdf</span>
      </div>
    );
  }

  if (lower === 'ls -la' || lower === 'ls -l' || lower === 'ls -a') {
    return (
      <div className="text-[10px] space-y-0.5 text-zinc-400">
        <p className="text-zinc-600">total 48</p>
        {[
          ['drwxr-xr-x', 'kp', '4096', 'Jan 2023', 'education/'],
          ['drwxr-xr-x', 'kp', '4096', 'Jun 2024', 'experience/'],
          ['drwxr-xr-x', 'kp', '4096', 'Mar 2026', 'projects/'],
          ['-rw-r--r--', 'kp', '183K', 'Feb 2025', 'resume.pdf'],
          ['drwxr-xr-x', 'kp', '4096', 'Mar 2026', 'skills/'],
          ['drwxr-xr-x', 'kp', '4096', 'Mar 2026', 'awards/'],
          ['-rw-------', 'kp', '???', '??? ????', '.secrets'],
        ].map(([perms, user, size, date, name]) => (
          <p key={name}><span className="text-zinc-600">{perms} kp {user}</span> {size.padStart(5)} {date} <span className={name.includes('.') ? 'text-zinc-600' : 'text-primary'}>{name}</span></p>
        ))}
      </div>
    );
  }

  if (lower === 'cat about' || lower === 'cat readme' || lower === 'cat readme.md' || lower === 'cat ./readme.md') {
    return (
      <div className="space-y-2 text-[10px] max-w-lg">
        <p className="text-zinc-200 leading-relaxed">{OWNER.shortBio}</p>
        <p className="text-zinc-500 leading-relaxed">{OWNER.longBio}</p>
        <p className="text-zinc-600 italic">"Engineering is the art of organizing the physical world into logical systems."</p>
      </div>
    );
  }

  if (base === 'cat') {
    return <p className="text-yellow-400 text-[10px]">cat: {argRaw || '(no file)'}: No such file or directory. Try: <C>cat about</C></p>;
  }

  if (base === 'cd') {
    switch (arg) {
      case 'education':
      case 'education/': {
        const ed = TERMINAL_DATA.education;
        return (
          <div className="space-y-2 text-[10px]">
            <p className="text-primary font-bold text-[11px]">{ed.institution}</p>
            <p className="text-zinc-300">{ed.degree}</p>
            <p className="text-zinc-500">{ed.duration} &nbsp;·&nbsp; CGPA {ed.cgpa}</p>
            <div>
              <p className="text-zinc-700 mb-1.5">Coursework:</p>
              <div className="flex flex-wrap gap-1.5">
                {ed.coursework.map(c => (
                  <span key={c} className="border border-zinc-800 text-zinc-500 px-2 py-0.5 text-[9px]">{c}</span>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'experience':
      case 'experience/':
        return (
          <div className="space-y-4 text-[10px]">
            {TERMINAL_DATA.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-3 space-y-0.5">
                <p className="text-primary font-medium">{exp.role}</p>
                <p className="text-zinc-400">{exp.org} &nbsp;·&nbsp; {exp.period}</p>
                {exp.points.map((pt, j) => (
                  <p key={j} className="text-zinc-600">▸ {pt}</p>
                ))}
              </div>
            ))}
          </div>
        );
      case 'projects':
      case 'projects/':
        return (
          <div className="space-y-1.5 text-[10px]">
            {PROJECTS.map(p => (
              <div key={p.id} className="flex gap-3 items-baseline flex-wrap">
                <span className="text-primary shrink-0 w-40">{p.title}</span>
                <span className="text-zinc-600">{p.subtitle}</span>
                <span className={`ml-auto text-[9px] shrink-0 ${
                  p.status === 'PUBLISHED' ? 'text-green-400' :
                  p.status === 'ONGOING' ? 'text-yellow-400' :
                  p.status === 'AWARD WINNING' ? 'text-amber-400' :
                  p.status === 'RESEARCH' ? 'text-violet-400' : 'text-sky-400'
                }`}>{p.status}</span>
              </div>
            ))}
            <p className="text-zinc-700 italic mt-1">→ scroll to Work section for full project cards</p>
          </div>
        );
      case 'skills':
      case 'skills/':
        return (
          <div className="space-y-3 text-[10px]">
            {SKILLS.map(g => (
              <div key={g.group}>
                <p className="text-zinc-600 mb-1 uppercase text-[9px] tracking-wider">{g.group}:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                  {g.items.map(s => <span key={s.name} className="text-primary">{s.name}</span>)}
                </div>
              </div>
            ))}
          </div>
        );
      case 'awards':
      case 'awards/':
        return (
          <div className="space-y-1.5 text-[10px]">
            {TIMELINE.filter(e => e.badge).map((e, i) => (
              <div key={i} className="flex gap-3 items-baseline flex-wrap">
                <span className="text-primary w-10 shrink-0">{e.year}</span>
                <span className="text-zinc-300">{e.title}</span>
                <span className="text-yellow-400 ml-auto text-[9px]">{e.badge}</span>
              </div>
            ))}
          </div>
        );
      case 'contact':
      case 'contact/':
        return (
          <div className="space-y-0.5 text-[10px]">
            <p className="text-zinc-400">Email     &nbsp;&nbsp; <a href={`mailto:${OWNER.email}`} className="text-primary underline">{OWNER.email}</a></p>
            <p className="text-zinc-400">LinkedIn  &nbsp; <a href={OWNER.linkedin} target="_blank" rel="noreferrer" className="text-primary underline">linkedin.com/in/kaustubh-pandey-b42082218</a></p>
            <p className="text-zinc-400">GitHub    &nbsp;&nbsp; <a href={OWNER.github} target="_blank" rel="noreferrer" className="text-primary underline">github.com/KPkaustubhKP</a></p>
            <p className="text-zinc-400">Instagram &nbsp; <a href={OWNER.instagram} target="_blank" rel="noreferrer" className="text-primary underline">@kp._.kaustubh</a></p>
          </div>
        );
      case '..':
        return <p className="text-zinc-500 text-[10px]">already at root. nothing above this.</p>;
      case '~':
      case '/':
      case '.':
        return <p className="text-zinc-500 text-[10px]">kp@portfolio:~$</p>;
      default:
        return <p className="text-yellow-400 text-[10px]">-bash: cd: {arg || '(empty)'}: No such file or directory</p>;
    }
  }

  if (lower === 'neofetch') return WELCOME;
  if (lower === 'clear' || lower === 'cls') return '__CLEAR__';
  if (lower === 'exit' || lower === './portfolio' || lower === 'enter') return '__ENTER__';

  // Typo correction
  const corrections: Record<string, string> = {
    'hlep': 'help', 'halp': 'help', 'hepl': 'help',
    'whomi': 'whoami', 'whoami?': 'whoami',
    'clar': 'clear', 'clera': 'clear',
    'gti': 'git', 'got': 'git',
    'lss': 'ls', 'sl': 'ls',
    'pign': 'ping',
  };
  if (corrections[lower]) {
    return <p className="text-yellow-400 text-[10px]">bash: {lower}: command not found — did you mean <C>{corrections[lower]}</C>?</p>;
  }

  return (
    <p className="text-red-400 text-[10px]">
      bash: {input}: command not found — type <C>help</C> for available commands
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════

const TAB_COMPLETIONS = [
  'ls', 'ls -la', 'whoami', 'help', 'neofetch', 'clear', 'date', 'history', 'fortune', 'uptime', 'top',
  'git log', 'git status', 'git diff',
  'cat about', 'cat readme',
  'cd education', 'cd experience', 'cd projects', 'cd skills', 'cd awards', 'cd contact',
  'ping kp', 'man kp', 'love', 'matrix', 'coffee', 'hack', 'vim', 'cowsay',
];

interface InteractiveTerminalProps {
  className?: string;
  onEnterPortfolio?: () => void;
  initialCommand?: string;
  compact?: boolean;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  className = '',
  onEnterPortfolio,
  initialCommand,
  compact = false,
}) => {
  const [lines, setLines] = useState<Line[]>([mkLine('welcome', WELCOME)]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [tabCycle, setTabCycle] = useState<string[]>([]);
  const [tabIdx, setTabIdx] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLines = useCallback((...newLines: Line[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const submit = useCallback((val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    sounds.enter();
    setHistory(h => [trimmed, ...h.slice(0, 99)]);
    setHistIdx(-1);
    setInput('');
    setTabCycle([]);
    addLines(mkLine('cmd', trimmed));
    const result = processCommand(trimmed);
    if (result === '__CLEAR__') { setLines([]); return; }
    if (result === '__ENTER__') {
      addLines(mkLine('out', <p className="text-primary text-[10px]">→ entering portfolio...</p>));
      setTimeout(() => onEnterPortfolio?.(), 700);
      return;
    }
    if (result !== null) addLines(mkLine('out', result));
  }, [addLines, onEnterPortfolio]);

  useEffect(() => {
    if (initialCommand) {
      const t = setTimeout(() => submit(initialCommand), 900);
      return () => clearTimeout(t);
    }
  }, [initialCommand, submit]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(input);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (tabCycle.length > 0) {
        // Cycle through existing matches
        const nextIdx = (tabIdx + 1) % tabCycle.length;
        setTabIdx(nextIdx);
        setInput(tabCycle[nextIdx]);
      } else {
        // Find matches
        const matches = TAB_COMPLETIONS.filter(c => c.startsWith(input) && c !== input);
        if (matches.length === 1) {
          setInput(matches[0]);
          sounds.type();
        } else if (matches.length > 1) {
          setTabCycle(matches);
          setTabIdx(0);
          setInput(matches[0]);
          sounds.type();
          // Show options
          addLines(mkLine('out', (
            <div className="flex flex-wrap gap-3 text-[10px]">
              {matches.map(m => <span key={m} className="text-zinc-500">{m}</span>)}
            </div>
          )));
        }
      }
      return;
    }

    // Arrow key history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
      return;
    }

    // Ctrl+C
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      addLines(mkLine('cmd', `${input}^C`));
      setInput('');
      return;
    }

    // Ctrl+L
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
      return;
    }

    // Reset tab cycle on other keys
    if (!['Tab', 'ArrowUp', 'ArrowDown', 'Shift', 'Meta', 'Alt', 'Control'].includes(e.key)) {
      setTabCycle([]);
    }

    if (e.key.length === 1) sounds.type();
  };

  return (
    <div
      className={`terminal-window flex flex-col ${compact ? 'h-[260px]' : 'h-[400px] md:h-[460px]'} ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10 shrink-0 bg-black/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-zinc-600 text-[9px] ml-2 tracking-widest uppercase select-none">
          kp@portfolio ~ %
        </span>
        <span className="ml-auto text-[9px] text-zinc-800 select-none italic hidden md:block">
          tab: complete &nbsp;↑↓: history &nbsp;ctrl+l: clear
        </span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <AnimatePresence initial={false}>
          {lines.map(line => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.13 }}
            >
              {line.type === 'cmd' ? (
                <div className="flex gap-2 items-start">
                  <span className="text-primary shrink-0 select-none">❯</span>
                  <span className="text-dim break-all">{line.content}</span>
                </div>
              ) : (
                <div className="pl-5">{line.content}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-primary/10 shrink-0">
        <span className="text-primary shrink-0 select-none">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-dim text-[11px] outline-none caret-primary placeholder-zinc-800"
          placeholder="type a command… (tab to autocomplete)"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          autoFocus
        />
        <span className="cursor-blink text-primary text-[10px] select-none">▋</span>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
