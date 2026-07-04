import { useState } from 'react';
import { FiX, FiFile, FiImage, FiVideo } from 'react-icons/fi';

export default function FilePreview({ file, onRemove }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);

  // Generate preview when file changes
  useState(() => {
    if (file) {
      const type = file.type;
      setIsVideo(type.startsWith('video/'));
      setIsImage(type.startsWith('image/'));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!file) return null;

  const fileSize = (file.size / (1024 * 1024)).toFixed(2);
  const fileTypeLabel = file.type.split('/')[0];

  return (
    <div className="rounded-xl border border-base-700 bg-base-800/50 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-base-700">
            {isImage && <FiImage className="text-2xl text-verify-400" />}
            {isVideo && <FiVideo className="text-2xl text-verify-400" />}
            {!isImage && !isVideo && <FiFile className="text-2xl text-ink-500" />}
          </div>
          <div>
            <p className="font-medium text-ink-100">{file.name}</p>
            <p className="text-xs text-ink-500">
              {fileTypeLabel} · {fileSize} MB
            </p>
          </div>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="rounded-full p-1 text-ink-500 hover:bg-base-700 hover:text-ink-300"
            aria-label="Remove file"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Preview thumbnail */}
      {isImage && previewUrl && (
        <div className="mt-3 overflow-hidden rounded-lg border border-base-700">
          <img
            src={previewUrl}
            alt={file.name}
            className="max-h-48 w-full object-contain"
          />
        </div>
      )}
      {isVideo && previewUrl && (
        <div className="mt-3 overflow-hidden rounded-lg border border-base-700">
          <video
            src={previewUrl}
            controls
            className="max-h-48 w-full"
          />
        </div>
      )}
    </div>
  );
}