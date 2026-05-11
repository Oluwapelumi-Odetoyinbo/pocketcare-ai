// Script to generate PWA icons from the SVG
// Run with: node scripts/generate-icons.js
const fs = require('fs');
const path = require('path');

// Inline the SVG content as a data URL and use sharp/canvas if available
// Otherwise write a minimal fallback PNG (solid teal square with white cross)

const sizes = [192, 512];

// Minimal valid PNG generator - creates a solid teal (#0d9488) square
// with the leaf logo approximated as a lighter teal rectangle
function createMinimalPNG(size) {
  // We'll write the SVG and instruct users to convert, OR use the sharp library
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${size * 0.19}" fill="#f8fbfa"/>
  <g transform="translate(156, 148) rotate(-35, 80, 100) skewX(-18)">
    <rect x="0" y="0" width="110" height="130" rx="8" fill="#9ce3d7" stroke="#101314" stroke-width="8"/>
  </g>
  <g transform="translate(246, 152) rotate(35, 80, 100) skewX(18)">
    <rect x="0" y="0" width="110" height="130" rx="8" fill="#7fd9ca" stroke="#101314" stroke-width="8"/>
  </g>
</svg>`;
  
  const outputPath = path.join(__dirname, '..', 'public', `icon-${size}.svg`);
  fs.writeFileSync(outputPath, svgContent);
  console.log(`Wrote ${outputPath}`);
}

sizes.forEach(createMinimalPNG);
console.log('Done. Convert SVG files to PNG using an online tool or sharp.');
