import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import '../assets/Styles/risingInk.css';

/**
 * RisingInk - Exact Replica of React Bits Pro 3D Kinetic Typography
 * Reference: https://pro.reactbits.dev/docs/components/rising-ink
 */

// Helper to interpolate between two hex/rgb colors
const interpolateColor = (color1, color2, factor) => {
  const parse = (c) => {
    if (!c) return [177, 158, 239];
    if (c.startsWith('#')) {
      const hex = c.replace('#', '');
      const fullHex = hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex;
      const num = parseInt(fullHex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    const rgb = c.match(/\d+/g);
    return rgb ? rgb.slice(0, 3).map(Number) : [177, 158, 239];
  };

  const [r1, g1, b1] = parse(color1);
  const [r2, g2, b2] = parse(color2);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
};

const RisingInk = ({
  text = 'Raise the standard.',
  as = 'span',
  color = '#FFFFFF',
  near = '#B19EEF',
  far = '#3A1DB8',
  colors, // optional [near, far]
  plates = 7,
  lift = 0.50,
  radius = 1.40,
  angle = 35,
  stiffness = 1.00,
  damping = 0.50,
  pop = 1.00,
  shadow = 0.60,
  intro = true,
  uppercase = false,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const animStates = useRef([]);
  const rafId = useRef(null);
  const [ready, setReady] = useState(false);

  const nearColor = colors?.[0] || near;
  const farColor = colors?.[1] || far;

  const displayText = uppercase ? text.toUpperCase() : text;

  // Split text into words and characters preserving spaces
  const words = useMemo(() => {
    const rawWords = displayText.split(/(\s+)/);
    let charIdx = 0;
    return rawWords.map((token, wIdx) => {
      const isWhitespace = /^\s+$/.test(token);
      if (isWhitespace) {
        return { isWhitespace: true, text: token, id: `space-${wIdx}` };
      }
      const chars = token.split('').map((char) => {
        const id = charIdx++;
        return { char, id };
      });
      return { isWhitespace: false, chars, id: `word-${wIdx}` };
    });
  }, [displayText]);

  const totalChars = useMemo(() => {
    return displayText.replace(/\s+/g, '').length;
  }, [displayText]);

  // Initialize animation states
  useEffect(() => {
    animStates.current = Array.from({ length: totalChars }, () => ({
      currentLift: 0,
      targetLift: 0,
      velocity: 0,
      popScale: 1,
      popVelocity: 0
    }));
    setReady(true);
  }, [totalChars]);

  // Spring physics and 3D extrusion render loop
  const updateLoop = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const computedFontSize = parseFloat(window.getComputedStyle(container).fontSize) || 48;
    const maxLiftPx = computedFontSize * lift;
    const radiusPx = computedFontSize * radius * 1.25;

    // 35 degrees extrusion angle (downwards and to the right)
    const radAngle = (angle * Math.PI) / 180;
    const cosA = Math.cos(radAngle);
    const sinA = Math.sin(radAngle);

    animStates.current.forEach((state, i) => {
      const el = letterRefs.current[i];
      if (!el) return;

      // 1. Calculate proximity target lift
      if (mouseRef.current.active) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseRef.current.x - centerX, mouseRef.current.y - centerY);

        if (dist < radiusPx) {
          const proximity = 1 - (dist / radiusPx);
          state.targetLift = Math.pow(proximity, 1.4) * maxLiftPx;
        } else {
          state.targetLift = 0;
        }
      } else {
        state.targetLift = 0;
      }

      // 2. Spring physics with stiffness & damping
      const springForce = (state.targetLift - state.currentLift) * stiffness;
      state.velocity = (state.velocity + springForce) * damping;
      state.currentLift += state.velocity;

      // 3. Click-to-pop dynamics
      if (pop > 0 && (state.popScale !== 1 || Math.abs(state.popVelocity) > 0.001)) {
        const popForce = (1 - state.popScale) * 0.35;
        state.popVelocity = (state.popVelocity + popForce) * 0.65;
        state.popScale += state.popVelocity;
        if (Math.abs(state.popScale - 1) < 0.002 && Math.abs(state.popVelocity) < 0.002) {
          state.popScale = 1;
          state.popVelocity = 0;
        }
      }

      // 4. Activity check & settle
      if (Math.abs(state.currentLift) < 0.1 && Math.abs(state.velocity) < 0.05 && state.targetLift === 0) {
        state.currentLift = 0;
        state.velocity = 0;
      }

      // 5. Apply 3D extrusion plates & ambient depth shadow
      const current = Math.max(0, state.currentLift);
      const popFactor = state.popScale;

      if (current > 0.2 || popFactor !== 1) {
        // Face moves up and back slightly
        const faceLiftX = (-current * cosA * 0.45).toFixed(2);
        const faceLiftY = (-current * sinA * 0.45).toFixed(2);

        // Extrusion vector extends down-right (positive X and Y)
        const extrudeX = current * cosA;
        const extrudeY = current * sinA;

        // Generate N extrusion plates (solid gradient from Near to Far)
        const shadowLayers = [];
        const numPlates = Math.max(3, plates);

        for (let p = 1; p <= numPlates; p++) {
          const frac = p / numPlates;
          const sx = (extrudeX * frac).toFixed(2);
          const sy = (extrudeY * frac).toFixed(2);
          const plateCol = interpolateColor(nearColor, farColor, frac);
          shadowLayers.push(`${sx}px ${sy}px 0 ${plateCol}`);
        }

        // Ambient ground contact shadow (controlled by shadow prop)
        if (shadow > 0) {
          const groundX = (extrudeX * 1.35).toFixed(2);
          const groundY = (extrudeY * 1.35 + 2).toFixed(2);
          const groundBlur = Math.round(current * 0.9 + 5);
          const groundAlpha = (shadow * 0.75 * Math.min(1, current / 6)).toFixed(2);
          shadowLayers.push(`${groundX}px ${groundY}px ${groundBlur}px rgba(0, 0, 0, ${groundAlpha})`);
        }

        el.style.transform = `translate3d(${faceLiftX}px, ${faceLiftY}px, 0) scale(${popFactor.toFixed(3)})`;
        el.style.textShadow = shadowLayers.join(', ');
        el.style.zIndex = Math.round(current * 10) + 15;
      } else {
        el.style.transform = '';
        el.style.textShadow = '';
        el.style.zIndex = '';
      }
    });

    rafId.current = requestAnimationFrame(updateLoop);
  }, [lift, radius, angle, stiffness, damping, plates, pop, shadow, nearColor, farColor]);

  // Pointer event handlers
  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(updateLoop);
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleCharClick = (i) => {
    if (pop <= 0 || !animStates.current[i]) return;
    animStates.current[i].popScale = 1.25 * pop;
    animStates.current[i].popVelocity = 0.08 * pop;
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(updateLoop);
    }
  };

  // Mount intro wave animation
  useEffect(() => {
    if (!intro || !ready) return;

    const timeouts = [];
    animStates.current.forEach((state, i) => {
      const delay = 100 + i * 28;
      const tid = setTimeout(() => {
        if (state) {
          state.currentLift = 0;
          state.velocity = 6.5;
        }
      }, delay);
      timeouts.push(tid);
    });

    rafId.current = requestAnimationFrame(updateLoop);

    return () => timeouts.forEach(clearTimeout);
  }, [intro, ready, updateLoop]);

  // Lifecycle
  useEffect(() => {
    rafId.current = requestAnimationFrame(updateLoop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateLoop]);

  const Tag = as;

  return (
    <Tag
      ref={containerRef}
      className={`rising-ink-container ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ color, ...style }}
    >
      {words.map((word) => {
        if (word.isWhitespace) {
          return (
            <span key={word.id} className="rising-ink-space">
              {word.text}
            </span>
          );
        }
        return (
          <span key={word.id} className="rising-ink-word">
            {word.chars.map(({ char, id }) => (
              <span
                key={id}
                ref={(el) => (letterRefs.current[id] = el)}
                className="rising-ink-letter cursor-target"
                onClick={() => handleCharClick(id)}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
};

export default RisingInk;
