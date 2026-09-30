// Optional assets: no request for an absent file. Restart dev/rebuild after adding MP3s.
export const AUDIO_ASSETS = import.meta.glob<string>(['/public/audio/music/*.mp3', '/public/audio/sfx/*.mp3'],
  { eager: true, query: '?url', import: 'default' });
