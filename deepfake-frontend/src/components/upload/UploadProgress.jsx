export default function UploadProgress({ progress }) {
  if (progress < 0 || progress > 100) return null;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-ink-500">
        <span>Uploading...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-base-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-verify-400 to-verify-300 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}