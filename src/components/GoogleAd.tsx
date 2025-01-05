import React, { useEffect, useRef } from 'react';

interface Props {
  client: string;
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAd({ client, slot }: Props) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Evitar reinicialización en componentes remount
    if (adRef.current.getAttribute("data-adsbygoogle-status") === "done") {
      return;
    }

    try {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      setTimeout(() => {
        window.adsbygoogle.push({});
      }, 500); // Esperar 500ms para asegurar que AdSense está cargado
    } catch (error) {
      console.error("Error loading AdSense:", error);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block', minHeight: '100px' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}