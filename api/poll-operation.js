export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path'); // e.g. "operations/abcd-efgh..."
    const apiKey = req.headers.get('x-api-key');

    if (!path || !apiKey) {
      return new Response(JSON.stringify({ message: 'Missing path or API key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const robloxResponse = await fetch(`https://apis.roblox.com/assets/v1/${path}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const responseStatus = robloxResponse.status;
    const responseText = await robloxResponse.text();

    return new Response(responseText, {
      status: responseStatus,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Polling proxy error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
