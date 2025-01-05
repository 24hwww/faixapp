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
  const initialized = useRef(false);

  useEffect(() => {
    if (adRef.current && !initialized.current) {
      try {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        window.adsbygoogle.push({});
        initialized.current = true;
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }

    return () => {
      initialized.current = false;
    };
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