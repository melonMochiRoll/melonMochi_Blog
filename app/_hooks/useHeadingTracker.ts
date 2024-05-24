import { useEffect, useRef, useState } from "react";

type TUseHeadingTrackReturnType = [
  string,
];

export default function useHeadingTracker(selectors: string): TUseHeadingTrackReturnType {
  const io = useRef<IntersectionObserver>();
  const [ activeId, setActiveId ] = useState('');

  const options: IntersectionObserverInit = {
    rootMargin: '-10% 0px -80% 0px',
  };

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].intersectionRatio <= 0) return;
  
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`;

        if (entry.isIntersecting) {
          setActiveId(targetId);
        }
      });
    };

    io.current = new IntersectionObserver(callback, options);

    const matches = document.querySelectorAll(selectors);

    matches.forEach((item) => {
      io.current?.observe(item);
    });

    return () => {
      io.current?.disconnect();
    };
  }, []);

  return [ activeId ];
}