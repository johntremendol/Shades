export const generateHex = (): string => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, '0').toUpperCase()}`;
};

// Calculate if text should be black or white based on background luminance
export const getContrastColor = (hexcolor: string): '#000000' | '#FFFFFF' => {
  // If invalid hex, default to white text
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexcolor)) return '#FFFFFF';

  // Convert to RGB
  const r = parseInt(hexcolor.substring(1, 3), 16);
  const g = parseInt(hexcolor.substring(3, 5), 16);
  const b = parseInt(hexcolor.substring(5, 7), 16);

  // Calculate YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Returns black for bright colors, white for dark colors
  return yiq >= 128 ? '#000000' : '#FFFFFF';
};

// Helper to check if a color is very dark (for UI adjustments)
export const isDarkColor = (hexcolor: string): boolean => {
   const r = parseInt(hexcolor.substring(1, 3), 16);
   const g = parseInt(hexcolor.substring(3, 5), 16);
   const b = parseInt(hexcolor.substring(5, 7), 16);
   const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
   return yiq < 40;
}