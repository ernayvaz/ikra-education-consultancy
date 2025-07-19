const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Create a canvas
const size = 512;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Red color from the website (var(--primary-color-saturated))
const redColor = '#d10019';

async function createFavicon() {
  // Draw red circle background
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = redColor;
  ctx.fill();
  
  try {
    // Load the IKRA logo
    const logo = await loadImage('./public/IKRA_logo.png');
    
    // Calculate dimensions to fit within the circle with some padding
    const padding = size * 0.15; // 15% padding
    const logoSize = size - (padding * 2);
    
    // Create a new canvas for the white version of the logo
    const logoCanvas = createCanvas(logoSize, logoSize);
    const logoCtx = logoCanvas.getContext('2d');
    
    // Draw the logo on the logo canvas
    logoCtx.drawImage(logo, 0, 0, logoSize, logoSize);
    
    // Get the logo's pixel data
    const imageData = logoCtx.getImageData(0, 0, logoSize, logoSize);
    const data = imageData.data;
    
    // Make the logo white by setting all non-transparent pixels to white
    for (let i = 0; i < data.length; i += 4) {
      // If pixel is not fully transparent
      if (data[i + 3] > 0) {
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
      }
    }
    
    // Put the modified image data back
    logoCtx.putImageData(imageData, 0, 0);
    
    // Draw the white logo on the main canvas
    ctx.drawImage(logoCanvas, padding, padding, logoSize, logoSize);
    
    // Save the favicon
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./public/ikra-favicon.png', buffer);
    
    console.log('Favicon created successfully: ikra-favicon.png');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon(); 