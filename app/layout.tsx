import { Providers } from '@providers/providers';
import '../src/common/styles/olmap.css';
import '../src/common/styles/globals.css';
import '../src/common/styles/overrides.css';

export const metadata = {
  title: 'ArcticAI',
  description: 'ArcticAI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
