import { useEffect, useState } from "react";

export function useAutoSlide(totalSlides: number, intervalMs = 3200) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (totalSlides <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, totalSlides]);

  return {
    activeIndex,
    setActiveIndex,
  };
}
