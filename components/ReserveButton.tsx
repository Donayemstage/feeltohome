'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

interface ReserveButtonProps {
  propertyName: string;
  price?: number;
  currency?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ReserveButton: React.FC<ReserveButtonProps> = ({
  propertyName,
  price,
  currency = 'XAF',
  className,
  children,
}) => {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [paymentMethod, setPaymentMethod] = useState('ORANGE_MONEY');

  const formattedPrice = price ? price.toLocaleString('fr-FR') : '';

  const whatsappMessage = encodeURIComponent(
    `Bonjour FeelToHome, je souhaite réserver le logement "${propertyName}"${
      formattedPrice ? ` (${formattedPrice} ${currency}/nuit)` : ''
    }${checkIn ? ` du ${checkIn} au ${checkOut}` : ''} pour ${guests} voyageur(s). Mode de paiement préféré : ${paymentMethod}.`
  );

  const whatsappUrl = `https://wa.me/237696580487?text=${whatsappMessage}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children || t.detail.reserveNow}
      </button>

      {/* Interactive Reservation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-lg rounded-none shadow-2xl border border-slate-300 overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">
                  {locale === 'fr' ? 'Réservation Directe' : locale === 'en' ? 'Direct Booking' : 'Direktbuchung'}
                </span>
                <h3 className="text-base font-extrabold truncate max-w-xs">{propertyName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-none bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Rate Recap */}
              {formattedPrice && (
                <div className="bg-slate-50 p-3.5 rounded-none border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {locale === 'fr' ? 'Tarif par nuit :' : locale === 'en' ? 'Price per night:' : 'Preis pro Nacht:'}
                  </span>
                  <span className="text-sm font-black text-brand-600">
                    {formattedPrice} {currency}
                  </span>
                </div>
              )}

              {/* Dates & Guests Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.hero.checkIn}
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-none font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.hero.checkOut}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Payment Option Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {locale === 'fr' ? 'Mode de paiement' : locale === 'en' ? 'Payment method' : 'Zahlungsmethode'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ORANGE_MONEY')}
                    className={`p-2.5 border text-left rounded-none transition-all flex items-center gap-2 ${
                      paymentMethod === 'ORANGE_MONEY'
                        ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-none bg-orange-500"></span>
                    <span>Orange Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('MTN_MOMO')}
                    className={`p-2.5 border text-left rounded-none transition-all flex items-center gap-2 ${
                      paymentMethod === 'MTN_MOMO'
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-none bg-yellow-500"></span>
                    <span>MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARTE_BANCAIRE')}
                    className={`p-2.5 border text-left rounded-none transition-all flex items-center gap-2 ${
                      paymentMethod === 'CARTE_BANCAIRE'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <i className="fa-solid fa-credit-card text-xs"></i>
                    <span>Carte Bancaire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CASH_ARRIVEE')}
                    className={`p-2.5 border text-left rounded-none transition-all flex items-center gap-2 ${
                      paymentMethod === 'CASH_ARRIVEE'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <i className="fa-solid fa-money-bill-wave text-xs"></i>
                    <span>Cash (Arrivée)</span>
                  </button>
                </div>
              </div>

              {/* Direct Booking Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-none shadow-xs transition-all flex items-center justify-center gap-2 border border-emerald-700"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  <span>
                    {locale === 'fr' ? 'Confirmer la Réservation via WhatsApp' : locale === 'en' ? 'Confirm Booking via WhatsApp' : 'Buchung via WhatsApp bestätigen'}
                  </span>
                </a>

                <a
                  href="tel:+237696580487"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-none transition-all flex items-center justify-center gap-2 border border-slate-900"
                >
                  <i className="fa-solid fa-phone text-xs"></i>
                  <span>
                    {locale === 'fr' ? 'Appeler le Service Réservation (+237 696 58 04 87)' : locale === 'en' ? 'Call Reservation Service (+237 696 58 04 87)' : 'Reservierungsservice anrufen (+237 696 58 04 87)'}
                  </span>
                </a>
              </div>

            </div>

            {/* Modal Footer Note */}
            <div className="bg-slate-100 p-3 text-center border-t border-slate-200 text-[11px] text-slate-500">
              {t.detail.noChargeNote}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
