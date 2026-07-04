import { useState, useCallback } from 'react';
import { uploadFile } from '../api/analysisApi';

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);

  const reset = useCallback(() => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
    setAnalysisId(null);
  }, []);

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
      return uploaded.id;
    } catch (err) {
      setError(err.message || 'Upload failed');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    file,
    uploadProgress,
    isUploading,
    error,
    analysisId,
    upload,
    reset,
  };
}