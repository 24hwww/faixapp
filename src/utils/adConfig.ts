interface AdConfig {
  isEnabled: boolean;
  client: string;
  slot: string;
}

export function getAdConfig(): AdConfig {
  return {
    isEnabled: true,
    client: 'ca-pub-8845831046952578',
    slot: '3528913011',
  };
}