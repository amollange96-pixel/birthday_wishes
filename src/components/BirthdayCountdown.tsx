import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_INFO } from '../data/content';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const BirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // November is month index 10 (0-indexed)
      const targetMonth = BIRTHDAY_INFO.birthdayMonth - 1;
      const targetDay = BIRTHDAY_INFO.birthdayDay;

      // Check if today is the birthday!
      if (now.getMonth() === targetMonth && now.getDate() === targetDay) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      // Calculate next November 2
      let targetDate = new Date(currentYear, targetMonth, targetDay, 0, 0, 0);

      // If November 2 has already passed this year, set target to next year
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, targetMonth, targetDay, 0, 0, 0);
      }

      const diff = Math.max(0, targetDate.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isToday) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 border border-amber-300/40 shadow-[0_0_30px_rgba(251,191,36,0.25)] backdrop-blur-md">
        <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
        <div className="text-left">
          <p className="font-serif text-lg text-amber-200 font-semibold tracking-wide">
            Today is Your Special Day! 🎉
          </p>
          <p className="text-xs text-rose-200/80">
            Happy Birthday, my beautiful Gauravi! Wishing you a world of joy today.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-[#230d2a]/80 border border-rose-500/20 backdrop-blur-md shadow-xl">
      <div className="flex items-center gap-2 text-rose-300 text-xs tracking-wider uppercase font-medium">
        <Calendar className="w-4 h-4 text-rose-400" />
        <span>Countdown to 2 November</span>
      </div>

      <div className="flex items-center gap-3 tabular-nums">
        <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-black/30 min-w-[52px]">
          <span className="font-serif text-2xl font-bold text-rose-100">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-rose-300/70">Days</span>
        </div>
        <span className="text-rose-400 font-bold">:</span>

        <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-black/30 min-w-[52px]">
          <span className="font-serif text-2xl font-bold text-rose-100">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-rose-300/70">Hours</span>
        </div>
        <span className="text-rose-400 font-bold">:</span>

        <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-black/30 min-w-[52px]">
          <span className="font-serif text-2xl font-bold text-rose-100">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-rose-300/70">Mins</span>
        </div>
        <span className="text-rose-400 font-bold">:</span>

        <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-black/30 min-w-[52px]">
          <span className="font-serif text-2xl font-bold text-rose-100">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-rose-300/70">Secs</span>
        </div>
      </div>
    </div>
  );
};
