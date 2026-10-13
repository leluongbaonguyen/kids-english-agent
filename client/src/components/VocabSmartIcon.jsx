import React, { useMemo } from 'react';
import { getCustomSvgForWord } from '../constants/floraFaunaSvgLibrary.js';
import { getColorSvgForWord } from '../constants/colorSvgLibrary.js';
import { getNumberSvgForWord } from '../constants/numberSvgLibrary.js';
import { normalizeSvg } from '../utils/svgNormalizer.js';

/**
 * VocabSmartIcon
 * Cross-platform icon renderer for Vocabulary:
 * 1. Ultra-Detailed Vector SVG (Flora & Fauna, Colors, Numbers) with WebKit/iOS Safari auto-scaling
 * 2. High-Resolution Unicode Emoji for standard core vocabulary
 * 3. Color Swatch fallback if color hex is present
 * 
 * @param {Object} props
 * @param {Object} [props.item] - Vocabulary object with .word, .image, .hex, .svg
 * @param {string} [props.word] - English word
 * @param {string} [props.image] - Fallback emoji
 * @param {string} [props.className] - Tailwind CSS classes for size & styling
 * @param {number} [props.size] - Explicit size in pixels (optional)
 * @param {boolean} [props.showBadge] - Whether to show indicator
 */
export default function VocabSmartIcon({
  item,
  word,
  image,
  className = 'w-8 h-8',
  size,
  showBadge = false
}) {
  const targetWord = (item?.word || word || '').trim();
  const fallbackImage = item?.image || image;
  const hexColor = item?.hex;

  // Find vector SVG from libraries or direct item.svg
  const rawSvg = useMemo(() => {
    if (item?.svg) return item.svg;
    if (!targetWord) return null;
    return getCustomSvgForWord(targetWord) || getColorSvgForWord(targetWord) || getNumberSvgForWord(targetWord);
  }, [item?.svg, targetWord]);

  // Normalized SVG string with width="100%", height="100%" and style block for iOS Safari / WKWebView
  const processedSvg = useMemo(() => {
    if (!rawSvg) return null;
    return normalizeSvg(rawSvg);
  }, [rawSvg]);

  const styleObj = size ? { width: `${size}px`, height: `${size}px` } : {};

  // 1. Vector SVG branch (Highest priority for custom illustrated categories)
  if (processedSvg) {
    return (
      <div
        className={`vocab-smart-icon inline-flex items-center justify-center shrink-0 select-none transition-transform duration-200 hover:scale-110 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:block [&>svg]:shrink-0 ${className}`}
        style={styleObj}
        title={`${targetWord} • Minh họa Vector chuẩn xác`}
        dangerouslySetInnerHTML={{ __html: processedSvg }}
      />
    );
  }

  // 2. High-Resolution Emoji renderer with optimal system font stack
  if (fallbackImage) {
    return (
      <span
        className={`vocab-smart-icon vocab-emoji inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        {fallbackImage}
      </span>
    );
  }

  // 3. Color hex swatch fallback if it's a color category word
  if (hexColor) {
    return (
      <span
        className={`vocab-smart-icon inline-flex items-center justify-center shrink-0 rounded-full border-2 border-white/60 shadow-lg ${className}`}
        style={{ ...styleObj, backgroundColor: hexColor }}
        title={`${targetWord} (${hexColor})`}
      />
    );
  }

  // 4. Default fallback icon
  return (
    <span
      className={`vocab-smart-icon vocab-emoji inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
      style={styleObj}
      title={targetWord}
    >
      📖
    </span>
  );
}
