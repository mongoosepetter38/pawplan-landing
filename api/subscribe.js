export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const PUB_ID = 'pub_ec3f3d8b-1b8a-40c8-bee8-eb72d82206ee';

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer SaBlBZdTFdaodOQUeCU0111mMZPhwVnvoSm0WNTCPRdZhOtaWwblI3dBuKJSw24P'
    },
    body: JSON.stringify({
      email: email,
      reactivate_existing: false,
      send_welcome_email: false
    })
  });

  const text = await response.text();
  console.log('Beehiiv status:', response.status);
  console.log('Beehiiv body:', text);

  return res.status(response.ok ? 200 : 400).send(text);
}
