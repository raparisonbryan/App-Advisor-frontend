import styles from './Pourcentage.module.scss';
import React, { useMemo } from 'react';

interface PourcentageProps {
  percentage: number;
  colorStart: string;
  colorEnd: string;
  showAsNote?: boolean;
  maxNote?: number;
}

const Pourcentage = (props: PourcentageProps) => {
  const { percentage, colorStart, colorEnd, showAsNote = false, maxNote = 20 } = props;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const arcPercentage = showAsNote ? (percentage / maxNote) * 100 : percentage;
  const progress = circumference - (arcPercentage / 100) * circumference;
  const gradientId = useMemo(() => `gradient-${percentage}-${colorStart}-${colorEnd}`, [percentage, colorStart, colorEnd]);

  return (
    <div className={styles.container}>
      <svg width="120" height="120">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          transform="rotate(-90, 60, 60)"
        />
      </svg>
      <div className={styles.text}>
        {showAsNote ? `${percentage.toFixed(1)}` : `${percentage}%`}
      </div>
    </div>
  );
}

export default Pourcentage;