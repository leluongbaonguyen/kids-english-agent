import React, { useMemo } from 'react';
import { getCustomSvgForWord } from '../constants/floraFaunaSvgLibrary.js';
import { getColorSvgForWord } from '../constants/colorSvgLibrary.js';
import { getNumberSvgForWord } from '../constants/numberSvgLibrary.js';
import { normalizeSvg } from '../utils/svgNormalizer.js';

/**
 * VocabSmartIcon - Clean, Crisp Vector & Unicode Icon Engine (Flat & Modern, No 3D Effects)
 * 
 * @param {Object} props
 * @param {Object} [props.item] - Vocabulary object with .word, .image, .hex, .svg
 * @param {string} [props.word] - English word
 * @param {string} [props.image] - Fallback emoji
 * @param {string} [props.className] - Tailwind CSS classes for size & styling
 * @param {number} [props.size] - Explicit size in pixels (optional)
 * @param {boolean} [props.showBadge] - Whether to show indicator dot
 * @param {boolean} [props.animate] - Whether to enable physics-based bouncing (default: true)
 * @param {boolean} [props.dance] - Whether to use rhythmic dance instead of squash-hop (default: false)
 */
export default function VocabSmartIcon({
  item,
  word,
  image,
  className = 'w-8 h-8',
  size,
  showBadge = false,
  animate = true,
  dance = false
}) {
  const targetWord = (item?.word || word || '').trim();
  const fallbackImage = item?.image || image;
  const hexColor = item?.hex;
  const animClass = animate ? (dance ? 'icon-dance' : 'icon-bounce-playful') : '';

  // Find vector SVG from libraries or direct item.svg
  const rawSvg = useMemo(() => {
    if (item?.svg) return item.svg;
    if (!targetWord) return null;
    return getCustomSvgForWord(targetWord) || getColorSvgForWord(targetWord) || getNumberSvgForWord(targetWord);
  }, [item?.svg, targetWord]);

  // Normalized SVG string with width="100%", height="100%"
  const processedSvg = useMemo(() => {
    if (!rawSvg) return null;
    return normalizeSvg(rawSvg);
  }, [rawSvg]);

  const styleObj = size ? { width: `${size}px`, height: `${size}px` } : {};

  // 1. Vector SVG branch (Flora/Fauna, Colors, Numbers, etc.) - Clean flat vector
  if (processedSvg) {
    return (
      <div
        className={`vocab-smart-icon ${animClass} relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <div
          className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:block [&>svg]:shrink-0"
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        )}
      </div>
    );
  }

  // 2. Unicode Emoji branch - Clean, natural emoji rendering
  if (fallbackImage) {
    return (
      <span
        className={`vocab-smart-icon vocab-emoji ${animClass} relative inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <span className="leading-none flex items-center justify-center">
          {fallbackImage}
        </span>
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-400 ring-2 ring-slate-950" />
        )}
      </span>
    );
  }

  // 3. Clean Color Swatch Circle (Flat & crisp, no 3D marble glint)
  if (hexColor) {
    return (
      <span
        className={`vocab-smart-icon ${animClass} relative inline-flex items-center justify-center shrink-0 rounded-full select-none ${className}`}
        style={{
          ...styleObj,
          backgroundColor: hexColor,
          border: '1.5px solid rgba(255,255,255,0.6)'
        }}
        title={`${targetWord} (${hexColor})`}
      />
    );
  }

  // 4. Default Fallback icon
  return (
    <span
      className={`vocab-smart-icon vocab-emoji ${animClass} relative inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
      style={styleObj}
      title={targetWord}
    >
      <span className="leading-none flex items-center justify-center">
        📖
      </span>
    </span>
  );
}
