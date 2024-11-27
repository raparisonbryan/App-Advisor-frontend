import styles from './Pourcentage.module.scss';
import React, { useMemo } from 'react';

interface PourcentageProps {
  percentage: number;
  colorStart: string;
  colorEnd: string;
}

const Pourcentage = (props: PourcentageProps) => {
  const { percentage, colorStart, colorEnd } = props;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;
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
        {percentage}%
      </div>
    </div>
  );
}

export default Pourcentage;