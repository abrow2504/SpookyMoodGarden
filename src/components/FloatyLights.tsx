import { useEffect } from 'react';
import './FloatyLights.css';

const NUM_LIGHTS = 8;

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const FloatyLights = () => {
  useEffect(() => {
    // Animate floating lights with gentle motion loops
    const lights = document.querySelectorAll('.floaty-light');
    lights.forEach(light => {
      const animate = () => {
        const x = random(0, 100);
        const y = random(0, 100);
        const duration = random(6, 14);
        const el = light as HTMLElement;
        el.style.transition = `transform ${duration}s linear`;
        el.style.transform = `translate(${x}vw, ${y}vh)`;
        setTimeout(animate, duration * 1000);
      };
      animate();
    });
  }, []);

  return (
    <div className="floaty-lights-container">
      {Array.from({ length: NUM_LIGHTS }).map((_, i) => (
        <div key={i} className="floaty-light" />
      ))}
    </div>
  );
};

export default FloatyLights;
