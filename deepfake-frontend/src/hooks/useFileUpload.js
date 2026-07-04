import { useState, useCallback } from 'react';
import { uploadFile, getStatus, simulateProcessing } from '../api/analysisApi';

export const SCANNING_STEPS = [
  { id: 'uploading', label: 'Uploading file...' },
  { id: 'extracting_frames', label: 'Extracting video frames...' },
  { id: 'audio_extraction', label: 'Extracting audio track...' },
  { id: 'visual_analysis', label: 'Analyzing visual features (CNN)...' },
  { id: 'audio_analysis', label: 'Analyzing audio features (Librosa)...' },
  { id: 'fusion', label: 'Fusing visual and audio scores...' },
  { id: 'finalizing', label: 'Generating final verdict...' },
];

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [analysisId, setAnalysisId] = useState(null);

  const reset = useCallback(() => {
    setFile(null);
    setUploadProgress(0);
    setAnalysisStatus(null);
    setAnalysisResult(null);
    setIsUploading(false);
    setIsScanning(false);
    setError(null);
    setCurrentStepIndex(-1);
    setAnalysisId(null);
  }, []);

  const pollStatus = useCallback(async (id) => {
    try {
      const data = await getStatus(id);
      setAnalysisStatus(data.status);
      if (data.result) {
        setAnalysisResult(data.result);
      }
      // Map status to step index (rough)
      if (data.status === 'pending') {
        setCurrentStepIndex(0);
      } else if (data.status === 'processing') {
        setCurrentStepIndex(3);
      } else if (data.status === 'completed') {
        setCurrentStepIndex(SCANNING_STEPS.length);
        setIsScanning(false);
        return data;
      } else if (data.status === 'failed') {
        setError('Analysis failed');
        setIsScanning(false);
        return data;
      }
      return data;
    } catch (err) {
      setError(err.message);
      setIsScanning(false);
      throw err;
    }
  }, []);

  const startScanning = useCallback(async (id) => {
    setIsScanning(true);
    setCurrentStepIndex(0);
    setAnalysisStatus('pending');

    // Wait a moment then call simulate (for demo). In production, you'd have a background task.
    setTimeout(async () => {
      try {
        await simulateProcessing(id);
        const finalData = await pollStatus(id);
        if (finalData && finalData.status === 'completed') {
          setAnalysisResult(finalData.result);
          setAnalysisStatus('completed');
          setCurrentStepIndex(SCANNING_STEPS.length);
        }
        setIsScanning(false);
      } catch (err) {
        setError(err.message);
        setAnalysisStatus('failed');
        setIsScanning(false);
      }
    }, 3000);

    // Poll periodically to update UI
    const interval = setInterval(async () => {
      try {
        const data = await getStatus(id);
        setAnalysisStatus(data.status);
        if (data.status === 'completed') {
          setAnalysisResult(data.result);
          setCurrentStepIndex(SCANNING_STEPS.length);
          setIsScanning(false);
          clearInterval(interval);
        } else if (data.status === 'failed') {
          setError('Analysis failed');
          setIsScanning(false);
          clearInterval(interval);
        } else if (data.status === 'processing') {
          setCurrentStepIndex(3);
        }
      } catch (err) {
        // ignore
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pollStatus]);

  const upload = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploaded = await uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress);
      });
      setAnalysisId(uploaded.id);
      await startScanning(uploaded.id);
    } catch (err) {
      setError(err.message || 'Upload failed');
      setIsUploading(false);
      setAnalysisStatus('failed');
    } finally {
      setIsUploading(false);
    }
  }, [startScanning]);

  return {
    file,
    uploadProgress,
    analysisStatus,
    analysisResult,
    isUploading,
    isScanning,
    error,
    currentStepIndex,
    analysisId,
    upload,
    reset,
  };
}