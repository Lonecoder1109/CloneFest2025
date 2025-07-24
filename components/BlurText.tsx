import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  gradientWords?: string[]; // Words that should have gradient styling
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  stepDuration = 0.35,
  gradientWords = [],
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDelay = elements.length * delay + stepDuration * 1000;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalDelay);
      return () => clearTimeout(timer);
    }
  }, [inView, elements.length, delay, stepDuration, onAnimationComplete]);

  const keyframes = useMemo(() => {
    const transformY = direction === 'top' ? '-50px' : '50px';
    return `
      @keyframes blur-in-${direction} {
        0% {
          filter: blur(10px);
          opacity: 0;
          transform: translateY(${transformY});
        }
        50% {
          filter: blur(5px);
          opacity: 0.5;
          transform: translateY(${direction === 'top' ? '5px' : '-5px'});
        }
        100% {
          filter: blur(0px);
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
  }, [direction]);

  const isGradientWord = (word: string) => {
    return gradientWords.some(gradientWord => 
      word.toLowerCase().includes(gradientWord.toLowerCase())
    );
  };

  return (
    <>
      <style>{keyframes}</style>
      <div
        ref={ref}
        className={className}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {elements.map((segment, index) => {
          const animationDelay = `${(index * delay) / 1000}s`;
          const animationDuration = `${stepDuration}s`;
          const shouldUseGradient = isGradientWord(segment);
          
          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                willChange: 'transform, filter, opacity',
                animation: inView 
                  ? `blur-in-${direction} ${animationDuration} ease-out ${animationDelay} forwards`
                  : 'none',
                filter: inView ? undefined : 'blur(10px)',
                opacity: inView ? undefined : 0,
                transform: inView ? undefined : `translateY(${direction === 'top' ? '-50px' : '50px'})`,
              }}
              className={shouldUseGradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500' : ''}
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default BlurText;
