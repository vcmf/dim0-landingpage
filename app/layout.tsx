import type { Metadata } from "next";
import type { ReactNode } from "react";

// Root layout intentionally minimal — no fonts, no global theme.
// Route-segment layouts (app/(dim0)/layout.tsx, app/engine/layout.tsx) own
// the theme + fonts so each segment only ships what it actually uses.

export const metadata: Metadata = {
  metadataBase: new URL("https://dim0.net"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
