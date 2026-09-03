import fs from 'node:fs';
import path from 'node:path';

/**
 * Intrinsic image dimensions, read straight from the file header at build time.
 *
 * Giving every <img> a width and height lets the browser reserve the right box
 * before the bytes arrive, which is what stops the page shifting as images load
 * (Cumulative Layout Shift). The values are the image's real pixel size — CSS
 * still controls how big it actually renders, so adding them changes layout
 * nowhere; it only supplies the aspect ratio.
 *
 * Deliberately dependency-free: this runs on every build, and parsing four
 * file headers is cheaper and more predictable than pulling in an image
 * library that only ships as a transitive dependency today.
 *
 * Usage in a template, where `src` may be dynamic:
 *
 *   <img src={photo} {...imageSize(photo)} alt="" />
 *
 * An unreadable or unknown file yields `{}`, so the spread simply adds
 * nothing and the markup stays valid.
 */

export interface ImageSize {
  width?: number;
  height?: number;
}

const cache = new Map<string, ImageSize>();

const readPng = (buffer: Buffer): ImageSize | null => {
  // 8-byte signature, then the IHDR chunk: length(4) type(4) width(4) height(4).
  if (buffer.length < 24) return null;
  if (buffer.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};

const readGif = (buffer: Buffer): ImageSize | null => {
  if (buffer.length < 10) return null;
  if (buffer.toString('ascii', 0, 3) !== 'GIF') return null;
  return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
};

const readJpeg = (buffer: Buffer): ImageSize | null => {
  if (buffer.length < 4) return null;
  if (buffer.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    // Start-of-frame markers carry the dimensions; DHT/DAC/DRI and the
    // restart markers never do, so skip past them by their declared length.
    const isSof =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSof) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }
  return null;
};

const readWebp = (buffer: Buffer): ImageSize | null => {
  if (buffer.length < 30) return null;
  if (buffer.toString('ascii', 0, 4) !== 'RIFF') return null;
  if (buffer.toString('ascii', 8, 12) !== 'WEBP') return null;

  const format = buffer.toString('ascii', 12, 16);

  if (format === 'VP8X') {
    // Extended format: 24-bit little-endian canvas size, stored minus one.
    return { width: buffer.readUIntLE(24, 3) + 1, height: buffer.readUIntLE(27, 3) + 1 };
  }

  if (format === 'VP8 ') {
    // Lossy: 3-byte start code, then 14-bit width and height.
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === 'VP8L') {
    // Lossless: 14-bit width and height packed into the 4 bytes after the
    // 0x2f signature byte.
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  return null;
};

const readers = [readPng, readWebp, readJpeg, readGif];

/**
 * Dimensions for a root-relative asset path such as `/images/logo.webp`.
 * Anything that is not a local file under `public/` — a remote URL, a missing
 * file — returns `{}`.
 */
export const imageSize = (src: string | undefined | null): ImageSize => {
  if (!src || !src.startsWith('/')) return {};

  const cached = cache.get(src);
  if (cached) return cached;

  // Strip any query or hash before touching the filesystem.
  const cleanPath = src.split(/[?#]/)[0];
  const filePath = path.join(process.cwd(), 'public', cleanPath);

  let size: ImageSize = {};
  try {
    // The headers we parse all sit well inside the first 64KB; reading a slice
    // keeps a 2MB photo from being pulled into memory just for its size.
    const handle = fs.openSync(filePath, 'r');
    try {
      const buffer = Buffer.alloc(65536);
      const bytesRead = fs.readSync(handle, buffer, 0, 65536, 0);
      const header = buffer.subarray(0, bytesRead);
      for (const reader of readers) {
        const result = reader(header);
        if (result?.width && result?.height) {
          size = result;
          break;
        }
      }
    } finally {
      fs.closeSync(handle);
    }
  } catch {
    // Missing or unreadable file: fall through to {} so the build still runs.
    size = {};
  }

  cache.set(src, size);
  return size;
};
