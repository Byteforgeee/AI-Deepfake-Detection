import axiosInstance from "./axiosInstance";

export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post('/analysis/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percentCompleted);
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || error.response?.data?.detail || error.message;
    throw new Error(typeof message === 'string' ? message : 'Upload failed');
  }
};

export const getStatus = async (analysisId) => {
  const response = await axiosInstance.get(`/analysis/status/${analysisId}/`);
  return response.data;
};

// Alias for consistency
export const getAnalysis = getStatus;

export const getHistory = async () => {
  const response = await axiosInstance.get('/analysis/history/');
  return response.data;
};

export const simulateProcessing = async (analysisId) => {
  const response = await axiosInstance.post(`/analysis/simulate/${analysisId}/`);
  return response.data;
};