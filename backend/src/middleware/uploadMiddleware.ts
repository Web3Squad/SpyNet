// src/middleware/upload.ts
import multer from 'multer';
const storage = multer.memoryStorage(); // Salva em memória
export const upload = multer({ storage });
