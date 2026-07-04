import { useState, useEffect } from 'react';
import { FiFile, FiImage, FiVideo, FiCheckCircle, FiClock, FiXCircle, FiLoader } from 'react-icons/fi';
import { getHistory } from '../../api/analysisApi';

const statusIcons = {
  pending: <FiClock className="text-yellow-400" />,
  processing: <FiLoader className="animate-spin text-blue-400" />,
  completed: <FiCheckCircle className="text-green-400" />,
  failed: <FiXCircle className="text-red-400" />,
};

const fileTypeIcons = {
  image: <FiImage className="text-verify-400" />,
  video: <FiVideo className="text-verify-400" />,
};

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory();
      setHistory(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="h-6 w-6 animate-spin text-verify-400" />
        <span className="ml-2 text-sm text-ink-500">Loading history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-alert-500/30 bg-alert-500/10 p-4 text-center text-alert-400">
        <p>Failed to load history: {error}</p>
        <button
          onClick={fetchHistory}
          className="mt-2 text-sm text-verify-400 hover:text-verify-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 text-center text-ink-500">
        <p className="text-sm">No analyses yet.</p>
        <p className="mt-2 text-xs">Upload a file to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl border border-base-700 bg-base-800/50 p-4 transition-colors hover:bg-base-800/80"
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl">
              {fileTypeIcons[item.file_type] || <FiFile className="text-ink-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-ink-100">
                {item.file.split('/').pop()}
              </p>
              <div className="flex items-center gap-2 text-xs text-ink-500">
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="capitalize">{item.file_type}</span>
                {item.result && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-verify-400">
                      {item.result.verdict} ({item.result.confidence}%)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {statusIcons[item.status] || <FiClock className="text-ink-500" />}
            <span className="text-xs capitalize text-ink-500">{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}