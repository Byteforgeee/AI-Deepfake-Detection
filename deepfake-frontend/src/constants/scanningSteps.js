export const SCANNING_STEPS = [
  { id: 'uploading', label: 'Uploading file...' },
  { id: 'extracting_frames', label: 'Extracting video frames...' },
  { id: 'audio_extraction', label: 'Extracting audio track...' },
  { id: 'visual_analysis', label: 'Analyzing visual features (CNN)...' },
  { id: 'audio_analysis', label: 'Analyzing audio features (Librosa)...' },
  { id: 'fusion', label: 'Fusing visual and audio scores...' },
  { id: 'finalizing', label: 'Generating final verdict...' },
];