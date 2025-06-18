const crypto = require("crypto");
require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET.padEnd(32, '0'); // Must be 32 bytes
const IV_LENGTH = 16;

// Encrypt function (no changes needed here)
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// ✅ Decrypt function with safety checks
function decrypt(text) {
  if (!text || typeof text !== 'string' || !text.includes(":")) {
    return ''; // or throw an error if you prefer to catch it in controller
  }

  try {
    const parts = text.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = Buffer.from(parts[1], "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    console.error("Decryption failed:", err.message);
    return ''; // Fallback if decryption fails
  }
}

module.exports = { encrypt, decrypt };
