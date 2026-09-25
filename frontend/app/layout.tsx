import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'FeelToHome — Trouvez votre chez-vous au Cameroun',
  description: 'Plateforme web de réservation de logements au Cameroun. Réservez des hôtels, appartements meublés, studios, résidences, villas et auberges à Douala, Yaoundé, Kribi et Limbe.',
  keywords: ['FeelToHome', 'réservation logement Cameroun', 'appartement meublé Douala', 'hôtel Yaoundé', 'villa Kribi', 'studio meublé'],
  authors: [{ name: 'Donayem Tech', url: 'https://www.donayemtech.com/fr' }],
  openGraph: {
    title: 'FeelToHome — Trouvez votre chez-vous au Cameroun',
    description: 'Plateforme de réservation de logements d\'exception au Cameroun.',
    url: 'https://feeltohome.com',
    siteName: 'FeelToHome',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans text-slate-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
