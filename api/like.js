import { Redis } from '@upstash/redis'

// Biz bazani qo'lda aniq qiymatlar bilan ulaymiz, 
// chunki avtomatik ulanish 'STORAGE_' prefixini ishlatmoqda.
const redis = new Redis({
  url: process.env.STORAGE_REST_API_URL,
  token: process.env.STORAGE_REST_API_TOKEN,
})

export default async function handler(req, res) {
  const { rasm_id } = req.query;

  if (!rasm_id) {
    return res.status(400).json({ error: "rasm_id topilmadi" });
  }

  if (req.method === 'POST') {
    // Like sonini 1 taga oshiramiz
    const likes = await redis.incr(`likes:${rasm_id}`);
    return res.status(200).json({ likes });
  } else {
    // Like sonini o'qiymiz
    const likes = await redis.get(`likes:${rasm_id}`);
    return res.status(200).json({ likes: likes || 0 });
  }
}
