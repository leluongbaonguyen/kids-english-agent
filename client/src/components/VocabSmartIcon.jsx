import React, { useMemo, useState } from 'react';
import { getCustomSvgForWord } from '../constants/floraFaunaSvgLibrary.js';
import { getColorSvgForWord } from '../constants/colorSvgLibrary.js';
import { getNumberSvgForWord } from '../constants/numberSvgLibrary.js';
import { CLAY_3D_SVGS } from '../constants/clay3dSvgLibrary.js';
import { getFluentEmojiUrl } from '../utils/fluentEmojiMap.js';
import { normalizeSvg } from '../utils/svgNormalizer.js';

/**
 * VocabSmartIcon - Microsoft Fluent 3D & 3D Claymorphic Icon Engine
 * Renders high-resolution 3D clay emojis (matching Microsoft Fluent 3D) and volumetric 3D SVGs
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
export const CLAY_3D_ASSETS = {
  'crossing': '/images/vocab_3d/crossing_clean.png',
  'pollution': '/images/vocab_3d/pollution_clean.png',
  'country': '/images/vocab_3d/country_clean.png',
  'foreign': '/images/vocab_3d/foreign_clean.png',
  'challenge': '/images/vocab_3d/challenge_clean.png'
};

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
  const [imgFailed, setImgFailed] = useState(false);

  // 0. Check if there is a pixel-perfect photorealistic 3D Clay Diorama Asset (matching reference cards)
  const clay3dAsset = useMemo(() => {
    if (!targetWord) return null;
    const key = targetWord.toLowerCase().trim();
    return CLAY_3D_ASSETS[key] || null;
  }, [targetWord]);

  // 1. Check if there is a handcrafted 3D Clay SVG (table, skirt, triceratops, stegosaurus, etc.)
  const clay3dSvg = useMemo(() => {
    if (!targetWord) return null;
    const key = targetWord.toLowerCase().trim();
    return CLAY_3D_SVGS[key] || null;
  }, [targetWord]);

  // 2. Check if there is an official Microsoft Fluent 3D WebP emoji asset
  const fluent3dUrl = useMemo(() => {
    if (!fallbackImage) return null;
    return getFluentEmojiUrl(fallbackImage);
  }, [fallbackImage]);

  // 3. Find other vector SVGs (Flora/Fauna, Colors, Numbers, direct item.svg)
  const rawSvg = useMemo(() => {
    if (clay3dSvg) return clay3dSvg;
    if (item?.svg) return item.svg;
    if (!targetWord) return null;
    return getColorSvgForWord(targetWord) || getNumberSvgForWord(targetWord) || getCustomSvgForWord(targetWord);
  }, [clay3dSvg, item?.svg, targetWord]);

  // Normalized SVG string with width="100%", height="100%"
  const processedSvg = useMemo(() => {
    if (!rawSvg) return null;
    return normalizeSvg(rawSvg);
  }, [rawSvg]);

  const styleObj = size ? { width: `${size}px`, height: `${size}px` } : {};

  // Branch 0: Pixel-Perfect High-Res 3D Clay Diorama Asset (from reference cards)
  if (clay3dAsset && !imgFailed) {
    return (
      <div
        className={`vocab-smart-icon vocab-clay-3d-diorama ${animClass} relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <img
          src={clay3dAsset}
          alt={targetWord}
          className="w-full h-full object-contain filter drop-shadow-xl select-none pointer-events-none transform-gpu transition-transform duration-300"
          loading="eager"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
        )}
      </div>
    );
  }

  // Branch 1: Handcrafted 3D Clay or specialized Vector SVG (Table, Skirt, Dinosaurs, etc.)
  if (processedSvg) {
    return (
      <div
        className={`vocab-smart-icon ${animClass} relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <div
          className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:block [&>svg]:shrink-0 filter drop-shadow-sm"
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        )}
      </div>
    );
  }

  // Branch 2: Microsoft Fluent 3D Emoji (High-Resolution Claymorphic 3D WebP)
  if (fluent3dUrl && !imgFailed) {
    return (
      <span
        className={`vocab-smart-icon vocab-fluent-3d ${animClass} relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <img
          src={fluent3dUrl}
          alt={targetWord || fallbackImage}
          className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none transform-gpu transition-transform duration-200"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-400 ring-2 ring-slate-950" />
        )}
      </span>
    );
  }

  // Branch 3: Standard Native Unicode Emoji fallback
  if (fallbackImage) {
    return (
      <span
        className={`vocab-smart-icon vocab-emoji ${animClass} relative inline-flex items-center justify-center shrink-0 select-none font-emoji leading-none ${className}`}
        style={styleObj}
        title={targetWord}
      >
        <span className="leading-none flex items-center justify-center text-[1.1em] transform-gpu">
          {fallbackImage}
        </span>
        {showBadge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-400 ring-2 ring-slate-950" />
        )}
      </span>
    );
  }

  // Branch 4: Clean Color Swatch Circle
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

  // Branch 5: Default Fallback icon
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
