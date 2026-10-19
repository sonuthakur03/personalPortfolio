import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:/Users/Acer/.gemini/antigravity-ide/brain/540248d2-03e1-4c88-a0e9-6addd5297750/favicon_icon_1792391172637.jpg';
const publicDir = 'e:/codes/PersonalPortfolio/public';

async function generateFavicons() {
  console.log('Loading input image...');
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  // The rounded card starts around 128px in a 1024x1024 image
  // Let's trim or extract the central 768x768 region
  const extractSize = Math.round(metadata.width * 0.76);
  const left = Math.round((metadata.width - extractSize) / 2);
  const top = Math.round((metadata.height - extractSize) / 2);

  const cropped = sharp(inputPath).extract({
    left,
    top,
    width: extractSize,
    height: extractSize,
  });

  // 1. High-res 192x192 favicon.png
  await cropped
    .clone()
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Generated public/favicon.png (192x192)');

  // 2. 64x64 favicon
  await cropped
    .clone()
    .resize(64, 64)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-64.png'));
  console.log('Generated public/favicon-64.png (64x64)');

  // 3. 32x32 favicon
  await cropped
    .clone()
    .resize(32, 32)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-32.png'));
  console.log('Generated public/favicon-32.png (32x32)');

  // 4. Apple Touch Icon 180x180
  await cropped
    .clone()
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated public/apple-touch-icon.png (180x180)');
}

generateFavicons().catch(console.error);
