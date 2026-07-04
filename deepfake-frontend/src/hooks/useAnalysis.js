import { useState, useEffect, useCallback } from 'react';
import { getAnalysis } from '../api/analysisApi';
import { SCANNING_STEPS } from '../constants/scanningSteps';

export function useAnalysis(analysisId) {
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await getAnalysis(analysisId);
      setAnalysis(data);
      setStatus(data.status);
      if (data.result) {
        setResult(data.result);
      }
      if (data.status === 'pending') {
        setCurrentStepIndex(0);
      } else if (data.status === 'processing') {
        setCurrentStepIndex(3);
      } else if (data.status === 'completed') {
        setCurrentStepIndex(SCANNING_STEPS.length);
      } else if (data.status === 'failed') {
        setError('Analysis failed');
      }
      return data;
    } catch (err) {
      console.warn('Fetch status error:', err);
      setError(err.message || 'Failed to fetch status');
      throw err;
    }
  }, [analysisId]);

  useEffect(() => {
    if (!analysisId) {
      setError('No analysis ID provided');
      setLoading(false);
      return;
    }

    let intervalId;
    let isMounted = true;

    const startSimulation = () => {
      let step = 0;
      const totalSteps = SCANNING_STEPS.length;

      const interval = setInterval(() => {
        if (!isMounted) return;
        step++;
        if (step <= totalSteps) {
          setCurrentStepIndex(step - 1);
          setStatus('processing');
          if (step === totalSteps) {
            const mockResult = {
              verdict: 'REAL',
              confidence: 96,
              visual_score: 94,
              audio_score: 98,
            };
            setResult(mockResult);
            setStatus('completed');
            setCurrentStepIndex(totalSteps);
            clearInterval(interval);
            setAnalysis(prev => prev ? { ...prev, status: 'completed', result: mockResult } : null);
          }
        }
      }, 1500);
      return interval;
    };

    const init = async () => {
      try {
        setLoading(true);
        const initialData = await fetchStatus();
        if (!isMounted) return;

        if (initialData.status !== 'completed' && initialData.status !== 'failed') {
          // Start local simulation
          const simInterval = startSimulation();
          if (simInterval) intervalId = simInterval;
        } else if (initialData.status === 'failed') {
          setError('Analysis failed');
        }
      } catch (err) {
        console.error('Init error:', err);
        if (isMounted) {
          setError(err.message || 'Initialization failed');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [analysisId, fetchStatus]);

  return {
    analysis,
    status,
    result,
    loading,
    error,
    currentStepIndex,
    refetch: fetchStatus,
  };
}