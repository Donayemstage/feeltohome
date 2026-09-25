import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FeelToHome — Votre logement, votre sensation de chez vous',
  description: 'Plateforme web de réservation de logements au Cameroun. Réservez des hôtels, appartements meublés, studios, résidences, villas et auberges à Douala, Yaoundé, Kribi et Limbe.',
  keywords: ['FeelToHome', 'réservation logement Cameroun', 'appartement meublé Douala', 'hôtel Yaoundé', 'villa Kribi', 'studio meublé'],
  authors: [{ name: 'Donayem Tech', url: 'https://www.donayemtech.com/fr' }],
  openGraph: {
    title: 'FeelToHome — Votre logement, votre sensation de chez vous',
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
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
