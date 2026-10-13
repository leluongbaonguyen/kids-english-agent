import React from 'react';
import { getCustomSvgForWord } from '../constants/floraFaunaSvgLibrary.js';
import { getColorSvgForWord } from '../constants/colorSvgLibrary.js';
import { getNumberSvgForWord } from '../constants/numberSvgLibrary.js';

/**
 * VocabSmartIcon
 * Automatically chooses between Ultra-Detailed Vector SVG (for Flora & Fauna, Colors, and Numbers)
 * and High-Resolution Unicode Emoji for standard vocabulary.
 * 
 * @param {Object} props
 * @param {Object} [props.item] - Vocabulary object with .word and .image
 * @param {string} [props.word] - English word
 * @param {string} [props.image] - Fallback emoji
 * @param {string} [props.className] - Tailwind CSS classes for size & styling
 * @param {number} [props.size] - Explicit size in pixels (optional)
 * @param {boolean} [props.showBadge] - Whether to show a tiny "SVG Vector" badge indicator on hover
 */
export default function VocabSmartIcon({
  item,
  word,
  image,
  className = 'w-8 h-8',
  size,
  showBadge = false
}) {
  const targetWord = item?.word || word || '';
  const fallbackImage = item?.image || image || '📖';
  
  const customSvg = getCustomSvgForWord(targetWord) || getColorSvgForWord(targetWord) || getNumberSvgForWord(targetWord);

  const styleObj = size ? { width: `${size}px`, height: `${size}px` } : {};

  if (customSvg) {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 select-none transition-transform duration-200 hover:scale-110 ${className}`}
        style={styleObj}
        title={`${targetWord} • Minh họa Vector chuẩn xác`}
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  // Standard Emoji renderer with optimal sizing
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
      style={styleObj}
      title={targetWord}
    >
      {fallbackImage}
    </span>
  );
}
