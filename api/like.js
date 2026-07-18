import { Redis } from '@upstash/redis'

// Vercel avtomatik yaratgan kalitlarni ishlatamiz
const redis = Redis.fromEnv()

export default async function handler(req, res) {
  const { rasm_id } = req.query; // Saytdan qaysi rasmga like bosilganini olamiz

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
