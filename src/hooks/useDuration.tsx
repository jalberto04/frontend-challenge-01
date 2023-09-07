import { useEffect, useState } from 'react';

type UseDurationProps = { autoStart?: boolean; duration?: number };
type UseDurationReturn = { duration: number; start: () => void; stop: () => void };

const useDuration = (props?: UseDurationProps): UseDurationReturn => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [duration, setDuration] = useState<number>(props?.duration ?? 0);

  const start = () => {
    const intervalId = setInterval(() => {
      setDuration((prev) => prev + 1000);
    }, 1000);
    setIntervalId(intervalId);
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (props?.autoStart) start();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    duration: duration,
    start: start,
    stop: stop
  };
};

export default useDuration;
