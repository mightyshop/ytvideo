import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  onComplete: () => void;
  isPlaying: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  onComplete,
  isPlaying
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(59);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    if (timeLeft <= 0) {
      onComplete();
      setTimeLeft(59);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isPlaying]);
  
  // Reset timer when video starts playing
  useEffect(() => {
    if (isPlaying) {
      setTimeLeft(59);
    }
  }, [isPlaying]);
  
  return (
    <span className="text-white text-2xl font-medium">{timeLeft}s</span>
  );
};

export default CountdownTimer;