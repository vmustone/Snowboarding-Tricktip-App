import { useEffect, useState } from 'react';
import { GOOGLE_DOCS_ID } from '@env';
import { parseDocText } from '../utils/docTextParser';

export const useVideoDescriptions = () => {
  const [descriptions, setDescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescriptions = async () => {
      setLoading(true);
      try {
        const docUrl = `https://docs.google.com/document/d/${GOOGLE_DOCS_ID}/export?format=txt`;
        const res = await fetch(docUrl);
        const text = await res.text();
        setDescriptions(parseDocText(text));
      } catch (error) {
        console.error("Failed to fetch doc:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDescriptions();
  }, []);

  return { descriptions, loading };
};
