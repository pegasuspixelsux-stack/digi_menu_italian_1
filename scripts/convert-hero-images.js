#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '../public/images');
const heroDir = path.join(imagesDir, 'hero');

// Ensure hero directory exists
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

// Image configurations for different breakpoints
const imageConfigs = [
  {
    input: path.join(imagesDir, 'hero_landscape.jfif'),
    outputs: [
      { name: 'hero-desktop', width: 1920, height: 1080 },
    ]
  },
  {
    input: path.join(imagesDir, 'hero_landscape.jfif'),
    outputs: [
      { name: 'hero-tablet', width: 1024, height: 768 },
    ]
  },
  {
    input: path.join(imagesDir, 'hero_square.jfif'),
    outputs: [
      { name: 'hero-mobile', width: 768, height: 768 },
    ]
  }
];

async function convertImages() {
  try {
    for (const config of imageConfigs) {
      if (!fs.existsSync(config.input)) {
        console.warn(`⚠️ Input file not found: ${config.input}`);
        continue;
      }

      for (const output of config.outputs) {
        const webpPath = path.join(heroDir, `${output.name}.webp`);
        const jpgPath = path.join(heroDir, `${output.name}.jpg`);

        // Convert to WebP
        await sharp(config.input)
          .resize(output.width, output.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`✅ Created: ${output.name}.webp`);

        // Convert to JPG
        await sharp(config.input)
          .resize(output.width, output.height, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 85 })
          .toFile(jpgPath);
        console.log(`✅ Created: ${output.name}.jpg`);
      }
    }

    console.log('\n✨ All hero images converted successfully!');
    console.log(`📁 Files saved to: ${heroDir}`);
  } catch (error) {
    console.error('❌ Error converting images:', error.message);
    process.exit(1);
  }
}

convertImages();
