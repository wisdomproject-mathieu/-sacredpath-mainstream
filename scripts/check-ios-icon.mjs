import { readFile } from "node:fs/promises";

const iconPath = "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png";

function fail(message) {
  console.error(`check:ios-icon failed: ${message}`);
  process.exit(1);
}

function readUInt32BE(bytes, offset) {
  return (
    (bytes[offset] << 24) |
    (bytes[offset + 1] << 16) |
    (bytes[offset + 2] << 8) |
    bytes[offset + 3]
  ) >>> 0;
}

function verifyPngSignature(bytes) {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length < 8) fail("file is too short to be a PNG.");
  for (let i = 0; i < signature.length; i += 1) {
    if (bytes[i] !== signature[i]) fail("file is not a valid PNG (signature mismatch).");
  }
}

async function main() {
  const bytes = await readFile(iconPath);
  verifyPngSignature(bytes);

  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = -1;
  let sawIHDR = false;
  let hasTRNS = false;

  while (offset + 8 <= bytes.length) {
    const length = readUInt32BE(bytes, offset);
    offset += 4;
    const type = Buffer.from(bytes.slice(offset, offset + 4)).toString("ascii");
    offset += 4;

    if (offset + length + 4 > bytes.length) {
      fail(`invalid PNG chunk length for ${type}.`);
    }

    const data = bytes.slice(offset, offset + length);
    offset += length;
    offset += 4; // Skip CRC

    if (type === "IHDR") {
      if (length < 13) fail("IHDR chunk is invalid.");
      width = readUInt32BE(data, 0);
      height = readUInt32BE(data, 4);
      colorType = data[9];
      sawIHDR = true;
    } else if (type === "tRNS") {
      hasTRNS = true;
    } else if (type === "IEND") {
      break;
    }
  }

  if (!sawIHDR) fail("IHDR chunk was not found.");
  if (width !== 1024 || height !== 1024) {
    fail(`icon dimensions are ${width}x${height}; expected 1024x1024.`);
  }

  const hasAlphaChannel = colorType === 4 || colorType === 6;
  if (hasAlphaChannel || hasTRNS) {
    fail("icon contains transparency (alpha channel or tRNS). Export a 1024x1024 PNG without alpha.");
  }

  console.log(`check:ios-icon passed: ${iconPath} is a valid opaque PNG at 1024x1024.`);
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)));
