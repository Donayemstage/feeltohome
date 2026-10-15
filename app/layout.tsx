import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { FavoritesProvider } from '@/components/FavoritesContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FeelToHome — Trouvez votre chez-vous au Cameroun',
  description: 'Plateforme web de réservation de logements au Cameroun. Réservez des hôtels, appartements meublés, studios, résidences, villas et auberges à Douala, Yaoundé, Kribi et Limbe.',
  keywords: ['FeelToHome', 'réservation logement Cameroun', 'appartement meublé Douala', 'hôtel Yaoundé', 'villa Kribi', 'studio meublé'],
  authors: [{ name: 'FeelToHome', url: 'https://feeltohome.com' }],
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={`min-h-screen flex flex-col justify-between bg-slate-50 font-sans text-slate-900 ${plusJakartaSans.className}`}>
        <LanguageProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
