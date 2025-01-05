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

    // Verificar si el 'ins' ya tiene un anuncio cargado
    if (adRef.current.hasAttribute("data-adsbygoogle-status") && adRef.current.getAttribute("data-adsbygoogle-status") === "done") {
      return; // El anuncio ya fue cargado, no intentar cargarlo de nuevo
    }

    try {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }
      // Añadir el anuncio solo si no está cargado
      window.adsbygoogle.push({});
      // Marcar como cargado
      adRef.current.setAttribute("data-adsbygoogle-status", "done");
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
