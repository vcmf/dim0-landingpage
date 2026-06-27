// Mini SVGs for the "what's in the box" cards + the warm Dim0 tile
// for the "built on it" section.

export function MiniViewport() {
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <defs>
        <pattern id="ch-mv-g1" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="var(--ch-line)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="220" height="110" fill="url(#ch-mv-g1)" />
      <rect x="60" y="22" width="48" height="32" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="120" y="44" width="60" height="28" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="36" y="62" width="40" height="22" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="6" y="6" width="48" height="20" rx="10" fill="none" stroke="var(--ch-accent)" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="14" y="20" fontSize="10" fill="var(--ch-accent)" fontFamily="var(--ch-font-mono)">viewport</text>
    </svg>
  );
}

export function MiniHit() {
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <rect x="0" y="0" width="220" height="110" fill="var(--ch-paper)" />
      <rect x="20" y="20" width="60" height="40" rx="6" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="100" y="40" width="80" height="50" rx="6" fill="var(--ch-accent)" opacity="0.12" stroke="var(--ch-accent)" strokeWidth="1.2" />
      <rect x="100" y="40" width="80" height="50" rx="6" fill="none" stroke="var(--ch-accent)" strokeWidth="1.2" strokeDasharray="4 3" />
      <circle cx="140" cy="65" r="2.5" fill="var(--ch-accent)" />
      <path d="M 140 65 L 175 30" stroke="var(--ch-accent)" strokeWidth="1" />
      <text x="178" y="28" fontSize="9" fill="var(--ch-accent)" fontFamily="var(--ch-font-mono)">hit</text>
    </svg>
  );
}

export function MiniVirtual() {
  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      cells.push({ r, c });
    }
  }
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <rect x="0" y="0" width="220" height="110" fill="var(--ch-paper)" />
      {cells.map(({ r, c }) => {
        const inViewport = c >= 2 && c <= 5 && r >= 1 && r <= 2;
        return (
          <rect
            key={`${r}-${c}`}
            x={6 + c * 26}
            y={6 + r * 24}
            width="22"
            height="20"
            rx="3"
            fill={inViewport ? "var(--ch-accent)" : "var(--ch-line)"}
            opacity={inViewport ? 0.85 : 0.45}
          />
        );
      })}
      <rect x="55" y="28" width="106" height="50" rx="4" fill="none" stroke="var(--ch-ink)" strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  );
}

export function MiniSelect() {
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <rect x="0" y="0" width="220" height="110" fill="var(--ch-paper)" />
      <rect x="22" y="20" width="44" height="30" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="80" y="36" width="52" height="34" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="142" y="22" width="50" height="30" rx="4" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <rect x="14" y="14" width="180" height="68" rx="2" fill="var(--ch-accent)" opacity="0.08" stroke="var(--ch-accent)" strokeWidth="1.1" strokeDasharray="4 3" />
      {[[14, 14], [194, 14], [14, 82], [194, 82]].map(([x, y], i) => (
        <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" fill="var(--ch-paper)" stroke="var(--ch-accent)" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

export function MiniHistory() {
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <rect x="0" y="0" width="220" height="110" fill="var(--ch-paper)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(${20 + i * 32}, ${20 + (i % 2) * 8})`}>
          <rect width="26" height="24" rx="3" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1.1" opacity={1 - i * 0.13} />
          {i < 5 && <path d={`M 26 12 L 32 ${12 + (((i + 1) % 2) - (i % 2)) * 8}`} stroke="var(--ch-ink)" strokeWidth="1" opacity="0.5" />}
        </g>
      ))}
      <text x="14" y="98" fontSize="9" fontFamily="var(--ch-font-mono)" fill="var(--ch-sub)">undo · redo · branch</text>
    </svg>
  );
}

export function MiniRender() {
  return (
    <svg viewBox="0 0 220 110" className="ch-mini">
      <rect x="0" y="0" width="220" height="110" fill="var(--ch-paper)" />
      <rect x="14" y="16" width="92" height="78" rx="4" fill="none" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <text x="20" y="32" fontSize="9" fontFamily="var(--ch-font-mono)" fill="var(--ch-sub)">DOM</text>
      <rect x="22" y="40" width="76" height="14" rx="3" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1" />
      <rect x="22" y="60" width="60" height="14" rx="3" fill="var(--ch-paper)" stroke="var(--ch-ink)" strokeWidth="1" />
      <rect x="116" y="16" width="92" height="78" rx="4" fill="none" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <text x="122" y="32" fontSize="9" fontFamily="var(--ch-font-mono)" fill="var(--ch-sub)">canvas2d</text>
      <rect x="124" y="40" width="76" height="14" rx="3" fill="var(--ch-accent)" opacity="0.7" />
      <rect x="124" y="60" width="60" height="14" rx="3" fill="var(--ch-accent2)" opacity="0.8" />
      <path d="M 106 55 L 116 55" stroke="var(--ch-ink)" strokeWidth="1.1" />
      <path d="M 113 51 L 116 55 L 113 59" fill="none" stroke="var(--ch-ink)" strokeWidth="1.1" />
    </svg>
  );
}

// Warm-parchment Dim0 board mini-mock, the cute contrast moment.
// Hard-coded warm colours so it stays warm even inside the cold engine page.
export function BuiltOnDim0() {
  return (
    <svg viewBox="0 0 320 200" className="ch-builton-svg">
      <defs>
        <pattern id="ch-dim0g" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="#D9C9A8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="320" height="200" fill="#F3E9D2" />
      <rect x="0" y="0" width="320" height="200" fill="url(#ch-dim0g)" opacity="0.6" />
      <rect x="22" y="22" width="120" height="60" rx="4" fill="#FBF5E5" stroke="#3a2d1a" strokeWidth="1.1" />
      <line x1="30" y1="36" x2="120" y2="36" stroke="#3a2d1a" strokeWidth="0.6" />
      <line x1="30" y1="46" x2="100" y2="46" stroke="#3a2d1a" strokeWidth="0.6" />
      <line x1="30" y1="56" x2="115" y2="56" stroke="#3a2d1a" strokeWidth="0.6" />
      <line x1="30" y1="66" x2="80" y2="66" stroke="#3a2d1a" strokeWidth="0.6" />
      <rect x="170" y="36" width="120" height="80" rx="4" fill="#FBF5E5" stroke="#3a2d1a" strokeWidth="1.1" />
      <circle cx="230" cy="76" r="22" fill="none" stroke="#3a2d1a" strokeWidth="1" />
      <path d="M 215 86 Q 230 60 245 86" fill="none" stroke="#3a2d1a" strokeWidth="1" />
      <rect x="60" y="120" width="180" height="56" rx="4" fill="#FBF5E5" stroke="#3a2d1a" strokeWidth="1.1" />
      <text x="70" y="138" fontSize="9" fontFamily="var(--ch-font-mono)" fill="#3a2d1a">the canvas thinks back.</text>
      <line x1="78" y1="148" x2="220" y2="148" stroke="#3a2d1a" strokeWidth="0.5" />
      <line x1="78" y1="158" x2="200" y2="158" stroke="#3a2d1a" strokeWidth="0.5" />
      <line x1="78" y1="168" x2="170" y2="168" stroke="#3a2d1a" strokeWidth="0.5" />
      <path d="M 142 72 Q 156 70 170 76" fill="none" stroke="#3a2d1a" strokeWidth="0.7" strokeDasharray="2 2" />
      <path d="M 150 116 Q 156 110 165 120" fill="none" stroke="#3a2d1a" strokeWidth="0.7" strokeDasharray="2 2" />
    </svg>
  );
}
