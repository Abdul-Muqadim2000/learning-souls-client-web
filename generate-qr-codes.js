const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// Ensure the images directory exists
const imagesDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Define the books and their URLs
const books = [
  {
    name: "wise-quran",
    url: "https://www.mustaqim.co.uk/TheWiseQuran.pdf",
    title: "The Wise Quran",
  },
  {
    name: "muhammad-prophet-for-our-time",
    url: "https://archive.org/details/muhammad_1997/mode/2up",
    title: "Muhammad - A Prophet for Our Time",
  },
  {
    name: "muhammad-earliest-sources",
    url: "https://archive.org/details/B-001-000-904",
    title: "Muhammad - His Life Based on the Earliest Sources",
  },
];

// QR code options
const qrOptions = {
  errorCorrectionLevel: "H",
  type: "image/png",
  width: 512,
  margin: 2,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
};

// Generate QR codes
async function generateQRCodes() {
  console.log("Generating QR codes...\n");

  for (const book of books) {
    const outputPath = path.join(imagesDir, `${book.name}-qr.png`);

    try {
      await QRCode.toFile(outputPath, book.url, qrOptions);
      console.log(`✓ Generated QR code for "${book.title}"`);
      console.log(`  File: ${book.name}-qr.png`);
      console.log(`  URL: ${book.url}\n`);
    } catch (error) {
      console.error(
        `✗ Failed to generate QR code for "${book.title}":`,
        error.message,
      );
    }
  }

  console.log("QR code generation complete!");
}

generateQRCodes().catch(console.error);
