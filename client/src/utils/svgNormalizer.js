/**
 * svgNormalizer.js
 * Ensures inline SVGs have explicit dimensions and clean responsive styling
 * for WebKit (iOS Safari, WKWebView, Zalo, etc.) and modern desktop browsers.
 */
export function normalizeSvg(svgStr) {
  if (!svgStr || typeof svgStr !== 'string') return '';
  let res = svgStr.trim();
  
  // Guarantee width="100%"
  if (!/<svg[^>]*\bwidth=/i.test(res)) {
    res = res.replace(/<svg\b/i, '<svg width="100%"');
  }
  // Guarantee height="100%"
  if (!/<svg[^>]*\bheight=/i.test(res)) {
    res = res.replace(/<svg\b/i, '<svg height="100%"');
  }
  // Guarantee preserveAspectRatio="xMidYMid meet"
  if (!/<svg[^>]*\bpreserveAspectRatio=/i.test(res)) {
    res = res.replace(/<svg\b/i, '<svg preserveAspectRatio="xMidYMid meet"');
  }
  // Guarantee display:block, full width/height in inline style
  if (!/<svg[^>]*\bstyle=/i.test(res)) {
    res = res.replace(/<svg\b/i, '<svg style="width:100%;height:100%;display:block;"');
  } else if (!/width:\s*100%/i.test(res)) {
    res = res.replace(/style="([^"]*)"/i, 'style="$1;width:100%;height:100%;display:block;"');
  }
  return res;
}

export default normalizeSvg;
