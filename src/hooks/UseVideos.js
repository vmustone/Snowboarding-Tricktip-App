import { useEffect, useState } from 'react';
import { GOOGLE_DRIVE_API_KEY, GOOGLE_DRIVE_FOLDER_ID_GOOFY, GOOGLE_DRIVE_FOLDER_ID_REGULAR } from '@env';
import { parseVideoName } from '../utils/videoNameParser';

export const useVideos = (stance) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stance) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const folderId = stance === 'regular' ? GOOGLE_DRIVE_FOLDER_ID_REGULAR : GOOGLE_DRIVE_FOLDER_ID_GOOFY;
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${GOOGLE_DRIVE_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        
        // Parsero video nimet
        const parsedVideos = (data.files || []).map(video => ({
          ...video,
          displayName: parseVideoName(video.name), // Säilytä alkuperäinen nimi ja lisää muokattu versio
        }));
        
        setVideos(parsedVideos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [stance]);

  return { videos, loading };
};
