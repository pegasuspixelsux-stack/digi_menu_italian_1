# Images Directory

This directory contains all static images for the La Bella Italia restaurant menu application.

## Structure

```
public/images/
├── hero/                    # Hero section background images
│   ├── hero-desktop.webp   # Desktop hero image WebP (1920x1080+) - PRIMARY
│   ├── hero-desktop.jpg    # Desktop hero image JPEG fallback
│   ├── hero-tablet.webp    # Tablet hero image WebP (1024x768+) - PRIMARY
│   ├── hero-tablet.jpg     # Tablet hero image JPEG fallback
│   ├── hero-mobile.webp    # Mobile hero image WebP (768x768) - PRIMARY
│   └── hero-mobile.jpg     # Mobile hero image JPEG fallback
├── dishes/                  # Menu dish images (optional - if not using external URLs)
└── brand/                   # Brand assets (logo, icons, etc.)
```

## Hero Images Guidelines

### Desktop Hero (hero-desktop.jpg)
- Dimensions: 1920x1080 or larger
- Format: JPEG, optimized
- Content: Italian restaurant atmosphere, elegant plating, wine, ambiance
- Purpose: Large background image for desktop view (80vh height)

### Tablet Hero (hero-tablet.jpg)
- Dimensions: 1024x768 or larger
- Format: JPEG, optimized
- Content: Cropped/adapted version of desktop image
- Purpose: Tablet view adaptation

### Mobile Hero (hero-mobile.jpg)
- Dimensions: 768x768 (1:1 aspect ratio)
- Format: JPEG, optimized
- Content: Portrait-oriented hero, focus on food/ambiance
- Purpose: Mobile view (square aspect ratio)

## Image Optimization

### Format Requirements
All images **MUST** be provided in BOTH formats for optimal performance:

1. **WebP Format (Primary - Recommended)**
   - Superior compression (25-35% smaller than JPEG)
   - Better quality at smaller file sizes
   - Supported in all modern browsers
   - File naming: `hero-{breakpoint}.webp`

2. **JPEG Format (Fallback)**
   - Universal browser support
   - Used for older browsers (IE, etc.)
   - File naming: `hero-{breakpoint}.jpg`

### Image Requirements
- **Optimized for web** (compressed, no metadata)
- **Properly sized** for target breakpoint
- **WebP quality**: 80-85 compression
- **JPEG quality**: 85-90 compression
- **Adhering to** restaurant luxury brand guidelines

### Conversion Tools
To convert your images to WebP:

**Online (No installation):**
- https://cloudconvert.com/ (JPG to WebP)
- https://www.freeconvert.com/jpg-to-webp
- https://www.pexels.com/photo-editor/ (built-in WebP export)

**Command Line (Recommended):**
```bash
# Install ImageMagick or cwebp
# macOS: brew install cwebp
# Ubuntu: sudo apt-get install webp

# Convert to WebP
cwebp -q 85 hero-desktop.jpg -o hero-desktop.webp
cwebp -q 85 hero-tablet.jpg -o hero-tablet.webp
cwebp -q 85 hero-mobile.jpg -o hero-mobile.webp
```

**Batch Conversion (Bash):**
```bash
for img in hero-*.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

## Implementation

To use these images in the hero section, update `app/page.tsx`:

```tsx
<section 
  className="relative w-full aspect-square lg:h-[80vh]"
  style={{
    backgroundImage: `url('/images/hero/hero-mobile.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Hero content */}
</section>
```

Or use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero/hero-desktop.jpg"
  alt="La Bella Italia Restaurant"
  fill
  className="object-cover"
  priority
/>
```
