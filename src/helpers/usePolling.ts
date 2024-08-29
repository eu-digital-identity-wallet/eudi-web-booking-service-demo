import { useCallback, useEffect, useState } from "react";

type UsePollingResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  startPolling: () => void;
  stopPolling: () => void;
};

type PollingFunction<T> = () => Promise<T>;

export const usePolling = <T>(
  pollingFunction: PollingFunction<T>,
  intervalMs: number = 5000,
  stopAfterMs: number = 60000
): UsePollingResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const startPolling = useCallback(() => {
    setLoading(true);
  }, []);

  const stopPolling = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const pollData = async () => {
      try {
        const result = await pollingFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      }
    };

    if (loading) {
      pollData(); // Initial request immediately on start
      interval = setInterval(pollData, intervalMs);

      // Stop polling after a specific time
      timeout = setTimeout(() => {
        stopPolling();
      }, stopAfterMs);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading, intervalMs, stopAfterMs, stopPolling, pollingFunction]);

  return { data, error, loading, startPolling, stopPolling };
};

export default usePolling;
