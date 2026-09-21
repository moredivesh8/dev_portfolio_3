import React, { useEffect, useState } from 'react';

interface CountUpNumberProps {
  value: string;
  duration?: number; // Duration in ms
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({ value, duration = 1200 }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    // Extract numerical part and non-numeric prefix/suffix
    const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const hasDecimals = match[2].includes('.');
    const decimalPlaces = hasDecimals ? match[2].split('.')[1].length : 0;

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out expo for snappy count up
      const easeOutProgress = 1 - Math.pow(2, -10 * progress);
      const currentNum = targetNum * easeOutProgress;

      const formattedNum = hasDecimals
        ? currentNum.toFixed(decimalPlaces)
        : Math.floor(currentNum).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <span>{displayValue}</span>;
};
