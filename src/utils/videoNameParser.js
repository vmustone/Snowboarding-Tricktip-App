// Funktio video nimien muokkaukseen
export const parseVideoName = (name) => {
  if (!name) return '';
  
  // Poista erilaisia prefiksejä alusta
  let cleanName = name.replace(/^Trick Tip R - /i, '');
  cleanName = name.replace(/^Trick Tip R /i, '');
  cleanName = cleanName.replace(/^Regular /i, '');
  cleanName = cleanName.replace(/^Trick Tip G - /i, '');
  cleanName = cleanName.replace(/^Trick Tip G /i, '');
  cleanName = cleanName.replace(/^Goofy /i, '');
  
  // Poista erilaisia tiedostopäätteitä lopusta
  cleanName = cleanName.replace(/\.mov$/i, '');
  cleanName = cleanName.replace(/\.mp4$/i, '');
  cleanName = cleanName.replace(/\.avi$/i, '');
  cleanName = cleanName.replace(/\.mkv$/i, '');
  cleanName = cleanName.replace(/\.wmv$/i, '');
  cleanName = cleanName.replace(/\.webm$/i, '');
  
  // Poista ylimääräisiä sanoja ja merkkejä lopusta
  cleanName = cleanName.replace(/\s*-\s*final$/i, '');
  cleanName = cleanName.replace(/\s*-\s*v\d+$/i, ''); // -v1, -v2 jne
  cleanName = cleanName.replace(/\s*\(copy\)$/i, '');
  cleanName = cleanName.replace(/\s*\(final\)$/i, '');
  cleanName = cleanName.replace(/\s*\d{4}-\d{2}-\d{2}.*$/i, ''); // Päivämäärät lopusta
  cleanName = cleanName.replace(/\s*-\s*HD$/i, '');
  cleanName = cleanName.replace(/\s*4K$/i, '');
  
  // Poista keskeltä löytyvät ylimääräiset merkit
  cleanName = cleanName.replace(/\s*\[HD\]\s*/i, ' ');
  cleanName = cleanName.replace(/\s*\(tutorial\)\s*/i, ' ');
  cleanName = cleanName.replace(/\s*\[tutorial\]\s*/i, ' ');
  
  // Muuta alaviivat ja väliviivat välilyönneiksi
  cleanName = cleanName.replace(/[_-]/g, ' ');
  
  // Poista ylimääräiset välilyönnit
  cleanName = cleanName.replace(/\s+/g, ' ').trim();
  
  // Isota ensimmäinen kirjain jokaisesta sanasta (Title Case)
  cleanName = cleanName.split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
  
  return cleanName;
};

// Lisäfunktioita tarvittaessa
export const isValidVideoName = (name) => {
  return name && name.trim().length > 0;
};

export const getVideoDisplayName = (video) => {
  return video.displayName || parseVideoName(video.name) || video.name || 'Nimetön video';
};

// Funktio joka etsii video kuvausta usealla eri tavalla
export const findVideoDescription = (video, descriptions, isLoading = false) => {
  if (!video) return "Ei selostusta saatavilla";
  
  // Jos vielä ladataan, näytä loading viesti
  if (isLoading) return "Ladataan selostusta...";
  
  if (!descriptions) return "Ei selostusta saatavilla";
  
  const cleanName = parseVideoName(video.name);
  const originalName = video.name;
  const displayName = video.displayName;
  
  // Etsi kuvaus eri nimivaihtoehdoilla
  return descriptions[cleanName] || 
         descriptions[displayName] || 
         descriptions[originalName] || 
         descriptions[cleanName.toLowerCase()] ||
         descriptions[originalName.toLowerCase()] ||
         "Ei selostusta saatavilla";
};
