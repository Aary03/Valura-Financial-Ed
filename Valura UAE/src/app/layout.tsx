/**
 * Root layout — Next.js requires <html> and <body> here.
 * All real styling/providers live in [locale]/layout.tsx which
 * overrides these with the correct lang, dir, and font variables.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
