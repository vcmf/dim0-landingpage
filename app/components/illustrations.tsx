// Abstract illustrations for feature pillars and the fragmentation hero.

export function ArtSpatial() {
  return (
    <svg viewBox="0 0 380 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <pattern id="sp-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#sp-dots)" color="var(--border)" />

      <rect x="22" y="22" width="336" height="156" rx="10"
            fill="none" stroke="var(--border)" strokeWidth="1.2" strokeDasharray="4 3" />

      <rect x="186" y="40" width="150" height="100" rx="8"
            fill="color-mix(in oklab, var(--card) 60%, transparent)"
            stroke="var(--sidebar-icon-1)" strokeOpacity="0.5" strokeWidth="1" />
      <text x="194" y="54" fontFamily="var(--font-mono)" fontSize="9" fill="var(--sidebar-icon-1)" opacity="0.7">nested · research</text>

      <rect x="198" y="62" width="56" height="24" rx="3"
            fill="color-mix(in oklab, var(--sidebar-icon-1) 18%, var(--card))"
            stroke="var(--sidebar-icon-1)" strokeOpacity="0.35" strokeWidth="0.8" />
      <rect x="262" y="62" width="60" height="24" rx="3"
            fill="color-mix(in oklab, var(--sidebar-icon-2) 18%, var(--card))"
            stroke="var(--sidebar-icon-2)" strokeOpacity="0.35" strokeWidth="0.8" />
      <rect x="218" y="98" width="80" height="28" rx="3"
            fill="color-mix(in oklab, var(--sidebar-icon-4) 16%, var(--card))"
            stroke="var(--sidebar-icon-4)" strokeOpacity="0.35" strokeWidth="0.8" />

      <rect x="50" y="50" width="90" height="40" rx="4"
            fill="color-mix(in oklab, var(--sidebar-icon-3) 20%, var(--card))"
            stroke="var(--sidebar-icon-3)" strokeOpacity="0.45" strokeWidth="0.8" />
      <text x="58" y="66" fontFamily="var(--font-handwriting)" fontSize="10" fill="var(--sidebar-icon-3)">phase transitions</text>
      <text x="58" y="80" fontFamily="var(--font-handwriting)" fontSize="9" fill="var(--sidebar-icon-3)" opacity="0.75">working hypothesis</text>

      <rect x="50" y="110" width="70" height="46" rx="5"
            fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
      <circle cx="56" cy="117" r="1.5" fill="var(--sidebar-icon-4)" />
      <circle cx="61" cy="117" r="1.5" fill="var(--sidebar-icon-3)" />
      <circle cx="66" cy="117" r="1.5" fill="var(--sidebar-icon-2)" />
      <text x="56" y="132" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)">def solve(x):</text>
      <text x="62" y="142" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-2)">return x²</text>

      <circle cx="158" cy="130" r="14" fill="none" stroke="var(--sidebar-icon-2)" strokeOpacity="0.5" strokeWidth="1.2" />

      <path d="M 140 70 Q 170 65 198 74" stroke="var(--muted-foreground)" strokeOpacity="0.35" fill="none" strokeWidth="1" />
      <path d="M 120 130 Q 150 140 186 120" stroke="var(--muted-foreground)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
      <path d="M 158 116 Q 180 100 220 88" stroke="var(--muted-foreground)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
    </svg>
  );
}

export function ArtGesture() {
  return (
    <svg viewBox="0 0 380 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <pattern id="ge-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#ge-dots)" color="var(--border)" />

      <g>
        <rect x="24" y="52" width="68" height="32" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 20%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.5" strokeWidth="0.8" />
        <rect x="40" y="90" width="68" height="32" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-1) 18%, var(--card))" stroke="var(--sidebar-icon-1)" strokeOpacity="0.5" strokeWidth="0.8" />
        <rect x="28" y="128" width="68" height="32" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-2) 18%, var(--card))" stroke="var(--sidebar-icon-2)" strokeOpacity="0.5" strokeWidth="0.8" />
        <rect x="18" y="46" width="100" height="122" rx="4" fill="none" stroke="var(--sienna)" strokeWidth="1.1" strokeDasharray="3 3" opacity="0.7" />
        <circle cx="18" cy="46" r="2.5" fill="var(--sienna)" />
        <circle cx="118" cy="46" r="2.5" fill="var(--sienna)" />
        <circle cx="18" cy="168" r="2.5" fill="var(--sienna)" />
        <circle cx="118" cy="168" r="2.5" fill="var(--sienna)" />
      </g>

      <path d="M 130 105 C 150 95, 175 118, 200 100" stroke="var(--sienna)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <polygon
        points="200,100 192,97 194,103"
        transform="rotate(-35.8 200 100)"
        fill="var(--sienna)"
        stroke="var(--sienna)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <text x="148" y="90" fontFamily="var(--font-handwriting)" fontSize="10" fill="var(--sienna)">mapify</text>

      <g>
        <ellipse cx="288" cy="100" rx="40" ry="20" fill="var(--card)" stroke="var(--sienna)" strokeOpacity="0.6" strokeWidth="1" />
        <text x="288" y="104" textAnchor="middle" fontFamily="var(--font-handwriting)" fontSize="11" fill="var(--sienna-deep)">core idea</text>

        <path d="M 252 92 Q 235 70 222 60" stroke="var(--muted-foreground)" strokeOpacity="0.45" fill="none" strokeWidth="1" />
        <path d="M 252 108 Q 232 128 220 142" stroke="var(--muted-foreground)" strokeOpacity="0.45" fill="none" strokeWidth="1" />
        <path d="M 324 92 Q 340 70 352 58" stroke="var(--muted-foreground)" strokeOpacity="0.45" fill="none" strokeWidth="1" />
        <path d="M 324 108 Q 340 128 355 140" stroke="var(--muted-foreground)" strokeOpacity="0.45" fill="none" strokeWidth="1" />
        <path d="M 288 120 L 288 154" stroke="var(--muted-foreground)" strokeOpacity="0.45" fill="none" strokeWidth="1" />

        <rect x="200" y="50" width="42" height="18" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 18%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.4" strokeWidth="0.8" />
        <rect x="198" y="134" width="46" height="18" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-1) 18%, var(--card))" stroke="var(--sidebar-icon-1)" strokeOpacity="0.4" strokeWidth="0.8" />
        <rect x="332" y="48" width="42" height="18" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-2) 18%, var(--card))" stroke="var(--sidebar-icon-2)" strokeOpacity="0.4" strokeWidth="0.8" />
        <rect x="334" y="132" width="42" height="18" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-4) 18%, var(--card))" stroke="var(--sidebar-icon-4)" strokeOpacity="0.4" strokeWidth="0.8" />
        <rect x="266" y="154" width="44" height="18" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 18%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.4" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export function ArtAgent() {
  return (
    <svg viewBox="0 0 380 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <pattern id="ag-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#ag-dots)" color="var(--border)" />

      <g transform="translate(190 100)">
        <circle r="26" fill="color-mix(in oklab, var(--sienna) 18%, var(--card))" stroke="var(--sienna)" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle r="40" fill="none" stroke="var(--sienna)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 3" />
        <circle r="56" fill="none" stroke="var(--sienna)" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 4" />
        <text y="5" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="18" fill="var(--sienna-deep)">D</text>
      </g>

      <g opacity="0.9">
        <rect x="28" y="38" width="64" height="24" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 18%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.4" strokeWidth="0.8" />
        <text x="34" y="53" fontFamily="var(--font-handwriting)" fontSize="9" fill="var(--sidebar-icon-3)">notes (8)</text>

        <rect x="20" y="92" width="64" height="24" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-1) 18%, var(--card))" stroke="var(--sidebar-icon-1)" strokeOpacity="0.4" strokeWidth="0.8" />
        <text x="26" y="107" fontFamily="var(--font-handwriting)" fontSize="9" fill="var(--sidebar-icon-1)">2 PDFs</text>

        <rect x="30" y="146" width="64" height="24" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-2) 18%, var(--card))" stroke="var(--sidebar-icon-2)" strokeOpacity="0.4" strokeWidth="0.8" />
        <text x="36" y="161" fontFamily="var(--font-handwriting)" fontSize="9" fill="var(--sidebar-icon-2)">code node</text>
      </g>

      <path d="M 94 50 Q 130 70 158 88" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="1" />
      <path d="M 86 104 Q 125 102 162 100" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="1" />
      <path d="M 96 158 Q 130 130 158 114" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="1" />
      <g fill="var(--muted-foreground)" fillOpacity="0.5" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeWidth="0.5" strokeLinejoin="round">
        <polygon points="158,88 150,85 152,91" transform="rotate(32.7 158 88)" />
        <polygon points="162,100 154,97 156,103" transform="rotate(-3.1 162 100)" />
        <polygon points="158,114 150,111 152,117" transform="rotate(-29.7 158 114)" />
      </g>

      <g>
        <rect x="280" y="44" width="80" height="30" rx="4" fill="var(--card)" stroke="var(--sienna)" strokeOpacity="0.55" strokeWidth="1" />
        <text x="288" y="56" fontFamily="var(--font-mono)" fontSize="8" fill="var(--sienna)" opacity="0.8">chart.svg</text>
        <polyline points="288,68 296,62 304,66 312,58 320,64 328,56 340,60" stroke="var(--sienna)" strokeWidth="1" fill="none" />

        <rect x="290" y="88" width="72" height="28" rx="4" fill="color-mix(in oklab, var(--sidebar-icon-4) 14%, var(--card))" stroke="var(--sidebar-icon-4)" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="297" y="100" fontFamily="var(--font-handwriting)" fontSize="9" fill="var(--sidebar-icon-4)">summary</text>
        <line x1="297" y1="106" x2="351" y2="106" stroke="var(--sidebar-icon-4)" strokeOpacity="0.3" strokeWidth="0.8" />
        <line x1="297" y1="110" x2="341" y2="110" stroke="var(--sidebar-icon-4)" strokeOpacity="0.3" strokeWidth="0.8" />

        <rect x="282" y="128" width="78" height="34" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <text x="289" y="141" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--muted-foreground)">widget: timeline</text>
        <rect x="289" y="146" width="10" height="10" rx="1.5" fill="var(--sidebar-icon-2)" opacity="0.7" />
        <rect x="302" y="146" width="10" height="10" rx="1.5" fill="var(--sidebar-icon-3)" opacity="0.7" />
        <rect x="315" y="146" width="10" height="10" rx="1.5" fill="var(--sidebar-icon-1)" opacity="0.7" />
        <rect x="328" y="146" width="10" height="10" rx="1.5" fill="var(--sidebar-icon-4)" opacity="0.7" />
      </g>

      <path d="M 220 92 Q 250 70 280 60" stroke="var(--sienna)" strokeOpacity="0.55" fill="none" strokeWidth="1.1" />
      <path d="M 222 100 Q 254 100 286 102" stroke="var(--sienna)" strokeOpacity="0.55" fill="none" strokeWidth="1.1" />
      <path d="M 220 112 Q 250 130 280 142" stroke="var(--sienna)" strokeOpacity="0.55" fill="none" strokeWidth="1.1" />
      <g fill="var(--sienna)" fillOpacity="0.85" stroke="var(--sienna)" strokeOpacity="0.85" strokeWidth="0.6" strokeLinejoin="round">
        <polygon points="280,60 272,57 274,63" transform="rotate(-18.4 280 60)" />
        <polygon points="286,102 278,99 280,105" transform="rotate(3.6 286 102)" />
        <polygon points="280,142 272,139 274,145" transform="rotate(21.8 280 142)" />
      </g>
    </svg>
  );
}

export function ArtMedia() {
  return (
    <svg viewBox="0 0 380 200" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <pattern id="md-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#md-dots)" color="var(--border)" />

      <g transform="translate(30 30)">
        <rect width="82" height="96" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <line x1="10" y1="18" x2="58" y2="18" stroke="var(--foreground)" strokeOpacity="0.65" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="32" x2="72" y2="32" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeWidth="0.8" />
        <line x1="10" y1="40" x2="66" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeWidth="0.8" />
        <line x1="10" y1="48" x2="70" y2="48" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeWidth="0.8" />
        <line x1="10" y1="56" x2="48" y2="56" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeWidth="0.8" />
        <rect x="10" y="66" width="62" height="22" rx="2" fill="color-mix(in oklab, var(--sienna) 10%, transparent)" stroke="var(--sienna)" strokeOpacity="0.3" strokeWidth="0.7" strokeDasharray="2 2" />
        <text x="14" y="80" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sienna-deep)" opacity="0.7">quote block</text>
      </g>

      <g transform="translate(140 38)">
        <rect width="100" height="70" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <circle cx="8" cy="9" r="2" fill="var(--sidebar-icon-4)" />
        <circle cx="16" cy="9" r="2" fill="var(--sidebar-icon-3)" />
        <circle cx="24" cy="9" r="2" fill="var(--sidebar-icon-2)" />
        <text x="8" y="28" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--muted-foreground)">import numpy</text>
        <text x="8" y="40" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--sidebar-icon-2)">def run(x):</text>
        <text x="14" y="52" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--foreground)">return x ** 2</text>
        <text x="8" y="64" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--sidebar-icon-1)">→ 81</text>
      </g>

      <g transform="translate(268 30)">
        <rect width="86" height="60" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <text x="8" y="14" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)">weekly loss</text>
        <polyline points="8,50 20,42 30,46 42,32 52,36 62,22 76,26"
                  stroke="var(--sienna)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="76" cy="26" r="2" fill="var(--sienna)" />
        <line x1="8" y1="54" x2="78" y2="54" stroke="var(--border)" strokeWidth="0.6" />
      </g>

      <g transform="translate(262 108)">
        <rect width="92" height="56" rx="5" fill="color-mix(in oklab, var(--sidebar-icon-1) 12%, var(--card))" stroke="var(--sidebar-icon-1)" strokeOpacity="0.35" strokeWidth="0.8" />
        <text x="8" y="14" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-1)">timer · live</text>
        <text x="10" y="38" fontFamily="var(--font-sans)" fontSize="18" fontWeight="600" fill="var(--sidebar-icon-1)">00:24</text>
        <circle cx="78" cy="34" r="3" fill="var(--sidebar-icon-1)" opacity="0.7" className="heart-pulse" />
      </g>

      <g transform="translate(142 120) rotate(-3)">
        <rect width="76" height="52" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 22%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.4" strokeWidth="0.8" />
        <text x="8" y="18" fontFamily="var(--font-handwriting)" fontSize="11" fill="var(--sidebar-icon-3)">todo:</text>
        <text x="8" y="32" fontFamily="var(--font-handwriting)" fontSize="9.5" fill="var(--sidebar-icon-3)">· verify proof</text>
        <text x="8" y="44" fontFamily="var(--font-handwriting)" fontSize="9.5" fill="var(--sidebar-icon-3)">· rerun k=3</text>
      </g>

      <path d="M 112 78 Q 130 90 140 80" stroke="var(--muted-foreground)" strokeOpacity="0.35" fill="none" strokeWidth="0.9" />
      <path d="M 240 70 Q 260 60 268 58" stroke="var(--muted-foreground)" strokeOpacity="0.35" fill="none" strokeWidth="0.9" />
      <path d="M 214 128 Q 240 130 262 134" stroke="var(--muted-foreground)" strokeOpacity="0.35" fill="none" strokeWidth="0.9" />
    </svg>
  );
}

export function ArtFragmentation() {
  return (
    <svg viewBox="0 0 760 240" width="100%" height="100%" style={{ display: "block", maxHeight: 260 }}>
      <defs>
        <pattern id="fr-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>

      <g transform="translate(0 0)">
        <g transform="translate(20 40) rotate(-6)">
          <rect width="86" height="60" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <line x1="8" y1="10" x2="40" y2="10" stroke="var(--muted-foreground)" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="22" x2="72" y2="22" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
          <line x1="8" y1="30" x2="62" y2="30" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
          <line x1="8" y1="38" x2="68" y2="38" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
          <text x="8" y="54" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)" opacity="0.6">browser</text>
        </g>
        <g transform="translate(120 20) rotate(4)">
          <rect width="80" height="58" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <line x1="8" y1="12" x2="60" y2="12" stroke="var(--foreground)" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="24" x2="70" y2="24" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
          <line x1="8" y1="32" x2="54" y2="32" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
          <text x="8" y="52" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)" opacity="0.6">notes</text>
        </g>
        <g transform="translate(35 118) rotate(3)">
          <rect width="84" height="58" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <circle cx="8" cy="10" r="1.5" fill="var(--sidebar-icon-4)" />
          <circle cx="14" cy="10" r="1.5" fill="var(--sidebar-icon-3)" />
          <circle cx="20" cy="10" r="1.5" fill="var(--sidebar-icon-2)" />
          <text x="8" y="26" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)">def run():</text>
          <text x="12" y="36" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-2)">return x</text>
          <text x="8" y="52" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)" opacity="0.6">code</text>
        </g>
        <g transform="translate(145 138) rotate(-5)">
          <rect width="80" height="56" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <polyline points="10,40 22,30 34,34 46,22 58,28 70,18" stroke="var(--sienna)" strokeWidth="1.3" fill="none" strokeOpacity="0.7" />
          <text x="8" y="52" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)" opacity="0.6">chart</text>
        </g>
        <g transform="translate(240 70) rotate(6)">
          <rect width="76" height="72" rx="5" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
          <rect x="8" y="10" width="60" height="12" rx="3" fill="color-mix(in oklab, var(--sienna) 18%, var(--card))" stroke="var(--sienna)" strokeOpacity="0.3" strokeWidth="0.6" />
          <line x1="8" y1="32" x2="62" y2="32" stroke="var(--muted-foreground)" strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="8" y1="40" x2="58" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="8" y1="48" x2="64" y2="48" stroke="var(--muted-foreground)" strokeOpacity="0.4" strokeWidth="0.8" />
          <text x="8" y="66" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)" opacity="0.6">chat</text>
        </g>
      </g>

      <g transform="translate(360 112)">
        <path d="M 0 8 L 40 8" stroke="var(--sienna)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 36 4 L 40 8 L 36 12" stroke="var(--sienna)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="20" y="0" textAnchor="middle" fontFamily="var(--font-handwriting)" fontSize="11" fill="var(--sienna-deep)">one surface</text>
      </g>

      <g transform="translate(432 20)">
        <rect width="310" height="200" rx="10" fill="color-mix(in oklab, var(--card) 70%, transparent)" stroke="var(--sienna)" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="4 3" />
        <rect x="0" y="0" width="310" height="200" rx="10" fill="url(#fr-dots)" color="var(--border)" />

        <rect x="18" y="22" width="76" height="36" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-3) 20%, var(--card))" stroke="var(--sidebar-icon-3)" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="24" y="38" fontFamily="var(--font-handwriting)" fontSize="10" fill="var(--sidebar-icon-3)">research</text>
        <text x="24" y="50" fontFamily="var(--font-handwriting)" fontSize="8" fill="var(--sidebar-icon-3)" opacity="0.75">3 sources</text>

        <rect x="110" y="20" width="80" height="52" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <line x1="118" y1="30" x2="168" y2="30" stroke="var(--foreground)" strokeOpacity="0.6" strokeWidth="1.5" />
        <line x1="118" y1="40" x2="182" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.3" strokeWidth="0.7" />
        <line x1="118" y1="48" x2="176" y2="48" stroke="var(--muted-foreground)" strokeOpacity="0.3" strokeWidth="0.7" />
        <line x1="118" y1="56" x2="180" y2="56" stroke="var(--muted-foreground)" strokeOpacity="0.3" strokeWidth="0.7" />
        <line x1="118" y1="64" x2="166" y2="64" stroke="var(--muted-foreground)" strokeOpacity="0.3" strokeWidth="0.7" />

        <rect x="206" y="24" width="82" height="54" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <text x="214" y="38" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)">chart.svg</text>
        <polyline points="214,64 226,56 238,60 250,48 262,52 276,42" stroke="var(--sienna)" strokeWidth="1.2" fill="none" />

        <rect x="26" y="88" width="88" height="38" rx="4" fill="var(--card)" stroke="var(--border)" strokeWidth="0.8" />
        <circle cx="34" cy="98" r="1.5" fill="var(--sidebar-icon-4)" />
        <circle cx="40" cy="98" r="1.5" fill="var(--sidebar-icon-3)" />
        <circle cx="46" cy="98" r="1.5" fill="var(--sidebar-icon-2)" />
        <text x="34" y="112" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-2)">run(x):</text>
        <text x="40" y="120" fontFamily="var(--font-mono)" fontSize="7" fill="var(--muted-foreground)">return x**2</text>

        <rect x="130" y="90" width="70" height="34" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-1) 16%, var(--card))" stroke="var(--sidebar-icon-1)" strokeOpacity="0.4" strokeWidth="0.7" />
        <text x="138" y="102" fontFamily="var(--font-handwriting)" fontSize="10" fill="var(--sidebar-icon-1)">hypothesis</text>
        <text x="138" y="116" fontFamily="var(--font-handwriting)" fontSize="8" fill="var(--sidebar-icon-1)" opacity="0.8">supports H1</text>

        <rect x="214" y="92" width="72" height="34" rx="3" fill="color-mix(in oklab, var(--sidebar-icon-4) 14%, var(--card))" stroke="var(--sidebar-icon-4)" strokeOpacity="0.4" strokeWidth="0.7" />
        <text x="220" y="104" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-4)">agent:</text>
        <text x="220" y="114" fontFamily="var(--font-mono)" fontSize="7" fill="var(--sidebar-icon-4)" opacity="0.8">synthesizing…</text>
        <circle cx="278" cy="108" r="2.5" fill="var(--sidebar-icon-4)" opacity="0.7" className="heart-pulse" />

        <rect x="60" y="144" width="200" height="38" rx="4" fill="color-mix(in oklab, var(--sienna) 10%, var(--card))" stroke="var(--sienna)" strokeOpacity="0.4" strokeWidth="0.8" />
        <text x="70" y="158" fontFamily="var(--font-handwriting)" fontSize="11" fill="var(--sienna-deep)">synthesis</text>
        <line x1="70" y1="166" x2="250" y2="166" stroke="var(--sienna)" strokeOpacity="0.25" strokeWidth="0.7" />
        <line x1="70" y1="172" x2="240" y2="172" stroke="var(--sienna)" strokeOpacity="0.25" strokeWidth="0.7" />

        <path d="M 94 40 Q 102 36 110 38" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
        <path d="M 190 46 Q 200 46 206 48" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
        <path d="M 64 58 Q 68 74 64 90" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
        <path d="M 114 108 Q 124 108 130 108" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
        <path d="M 200 110 Q 208 110 214 110" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
        <path d="M 164 124 Q 164 136 164 144" stroke="var(--muted-foreground)" strokeOpacity="0.4" fill="none" strokeWidth="0.9" />
      </g>
    </svg>
  );
}
