// src/services/uploadService.ts
import { supabase } from '../utils/supabaseClient';

export const uploadImageToSupabase = async (
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> => {
  const bucket = process.env.SUPABASE_BUCKET || 'image.agents';
  const path = `imagens/${Date.now()}_${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error('[UPLOAD ERROR]', error);
    throw new Error('Erro ao fazer upload da imagem no Supabase.');
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
