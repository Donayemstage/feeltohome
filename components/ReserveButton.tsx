'use client';

import React from 'react';

interface ReserveButtonProps {
  propertyName: string;
  className?: string;
  children?: React.ReactNode;
}

export const ReserveButton: React.FC<ReserveButtonProps> = ({ propertyName, className, children }) => {
  const handleReserve = () => {
    alert(`Réservation préparée pour "${propertyName}". Le module de paiement et calendrier sera activé dans la phase suivante.`);
  };

  return (
    <button type="button" onClick={handleReserve} className={className}>
      {children || 'Réserver maintenant'}
    </button>
  );
};
