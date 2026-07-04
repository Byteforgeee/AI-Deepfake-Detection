import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import Button from '../common/Button';

const ACCEPTED_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
};

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

export default function UploadZone({ onFileAccepted, isUploading }) {
  const [fileError, setFileError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setFileError('File is too large. Max size is 100MB.');
      } else if (error.code === 'file-invalid-type') {
        setFileError('Invalid file type. Please upload an image or video.');
      } else {
        setFileError(error.message || 'Invalid file');
      }
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      setFileError(null);
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-verify-400 bg-verify-500/5 scale-105 shadow-lg shadow-verify-500/20'
            : 'border-base-700 hover:border-base-500 hover:bg-base-800/30'
        } ${isUploading ? 'pointer-events-none opacity-50 animate-pulse' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <FiUploadCloud
            className={`text-4xl transition-transform duration-300 ${
              isDragActive ? 'text-verify-400 scale-110' : 'text-ink-500'
            }`}
          />
          <p className="text-sm text-ink-300">
            {isDragActive
              ? 'Drop your file here'
              : 'Drag & drop an image or video, or click to browse'}
          </p>
          <p className="text-xs text-ink-600">
            Supports images (JPG, PNG, GIF, etc.) and videos (MP4, MOV, AVI, MKV) up to 100MB
          </p>
          {fileError && (
            <p className="text-sm text-alert-400">{fileError}</p>
          )}
        </div>
      </div>
    </div>
  );
}