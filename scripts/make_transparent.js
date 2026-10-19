import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:/Users/Acer/.gemini/antigravity-ide/brain/540248d2-03e1-4c88-a0e9-6addd5297750/sonu_workspace_avatar_1792291423186.jpg';
const outputPath = 'e:/codes/PersonalPortfolio/public/character/sonu_workspace_sitting.png';

async function processImage() {
  console.log('Loading image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Extract raw RGBA buffer
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to get pixel index
  const getIdx = (x, y) => (y * width + x) * 4;

  // Check if pixel is background (near white / light grey)
  const isBackground = (x, y) => {
    const idx = getIdx(x, y);
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background in generated image is white / near white (>= 242)
    return r >= 240 && g >= 240 && b >= 240;
  };

  // Seed flood fill from all perimeter pixels
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      visited[0 * width + x] = 1;
      queue.push([x, 0]);
    }
    if (isBackground(x, height - 1)) {
      visited[(height - 1) * width + x] = 1;
      queue.push([x, height - 1]);
    }
  }

  for (let y = 0; y < height; y++) {
    if (isBackground(0, y)) {
      visited[y * width + 0] = 1;
      queue.push([0, y]);
    }
    if (isBackground(width - 1, y)) {
      visited[y * width + (width - 1)] = 1;
      queue.push([width - 1, y]);
    }
  }

  console.log(`Starting BFS flood-fill with ${queue.length} seed points...`);
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          if (isBackground(nx, ny)) {
            visited[nPos] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  console.log(`Visited ${queue.length} background pixels. Applying transparency & edge feathering...`);

  // Clear visited background pixels to alpha 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * 4;
      if (visited[pos]) {
        data[idx + 3] = 0; // Transparent
      } else {
        // Check adjacent visited pixels for slight anti-aliasing edge softening
        let bgNeighbors = 0;
        if (x > 0 && visited[pos - 1]) bgNeighbors++;
        if (x < width - 1 && visited[pos + 1]) bgNeighbors++;
        if (y > 0 && visited[pos - width]) bgNeighbors++;
        if (y < height - 1 && visited[pos + width]) bgNeighbors++;

        if (bgNeighbors > 0) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          // If edge pixel is very light, blend alpha
          const brightness = (r + g + b) / 3;
          if (brightness > 220) {
            data[idx + 3] = Math.max(0, Math.min(255, Math.round(255 - (brightness - 220) * 8)));
          }
        }
      }
    }
  }

  // Trim transparent bounding box slightly for clean framing
  console.log('Writing transparent PNG output...');
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .trim()
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Successfully generated transparent asset at ${outputPath}`);
}

processImage().catch(console.error);
