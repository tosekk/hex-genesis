// Optional assets: no request for an absent file. Restart dev/rebuild after adding MP3s.
export const AUDIO_ASSETS = import.meta.glob<string>(['/src/assets/audio/music/*.mp3', '/src/assets/audio/sfx/*.mp3'],
  { eager: true, query: '?url', import: 'default' });
