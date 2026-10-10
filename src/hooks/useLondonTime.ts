import { useEffect, useState } from 'react';

const formatLondon = () =>
  new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

/** Live "HH:MM in London" clock shown in the navigation bars. */
export function useLondonTime() {
  const [time, setTime] = useState(formatLondon);

  useEffect(() => {
    const tick = () => setTime(formatLondon());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
