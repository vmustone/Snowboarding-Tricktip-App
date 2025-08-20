import { parseVideoName } from './videoNameParser';

// Funktio Google Docs tekstin parsimiseen
export const parseDocText = (text) => {
  const lines = text.split(/\r?\n/);
  const mapping = {};
  let currentTitle = null;
  let currentText = [];

  lines.forEach(line => {
    // Etsi otsikkorivejä: "Trick tip Thursday - [tempun nimi]"
    const titleMatch = line.trim().match(/^Trick tip Thursday\s*-\s*(.+)$/i);
    if (titleMatch) {
      // Tallenna edellinen temppu jos sellainen oli
      if (currentTitle) {
        const formattedContent = formatDescriptionText(currentText.join('\n').trim());
        mapping[currentTitle] = formattedContent;
      }
      
      // Käsittele uuden tempun nimi samalla tavalla kuin video nimet
      const rawTrickName = titleMatch[1].trim();
      const cleanTrickName = parseVideoName(rawTrickName);
      
      // Tallenna sekä alkuperäinen että muokattu nimi
      currentTitle = cleanTrickName;
      currentText = [];
      
      // Lisää myös alkuperäinen nimi mappingiin varmuuden vuoksi
      if (rawTrickName !== cleanTrickName) {
        mapping[rawTrickName] = null; // Täytetään myöhemmin
      }
    } else if (line.trim()) {
      // Lisää sisältörivit nykyiseen temppuun
      currentText.push(line);
    }
  });

  // Tallenna viimeinen temppu
  if (currentTitle) {
    const formattedContent = formatDescriptionText(currentText.join('\n').trim());
    mapping[currentTitle] = formattedContent;
    
    // Täytä myös alkuperäinen nimi jos se on eri
    Object.keys(mapping).forEach(key => {
      if (mapping[key] === null) {
        mapping[key] = formattedContent;
      }
    });
  }

  return mapping;
};

// Funktio tekstin muotoiluun
export const formatDescriptionText = (text) => {
  if (!text) return text;
  
  // Lisää rivinvaihto ennen numeroituja kappaleita (1., 2., 3., jne.)
  let formatted = text.replace(/(\d+\.)/g, '\n$1');
  
  // Lisää rivinvaihto ennen ja jälkeen erilaisia osioita
  formatted = formatted.replace(/(Huomioita:)/gi, '\n\n$1\n');
  formatted = formatted.replace(/(Tips:)/gi, '\n\n$1\n');
  formatted = formatted.replace(/(Vastakierto:)/gi, '\n\n$1\n');
  formatted = formatted.replace(/(Huomioita vastakiertoon:)/gi, '\n\n$1\n');
  
  // Poista ylimääräiset rivinvaihdot alusta
  formatted = formatted.replace(/^\n+/, '');
  
  // Varmista että jokaisen numerooidun kappaleen jälkeen on välilyönti
  formatted = formatted.replace(/(\d+\.)([^\s])/g, '$1 $2');
  
  // Lisää ylimääräinen rivinvaihto numeroitujen kappaleiden väliin paremman luettavuuden vuoksi
  formatted = formatted.replace(/(\d+\..+?)(\n\d+\.)/g, '$1\n$2');
  
  // Siivoa ylimääräiset rivinvaihdot (max 2 peräkkäin)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted.trim();
};
