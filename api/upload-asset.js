export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await req.formData();
    const apiKey = req.headers.get('x-api-key') || formData.get('apiKey');
    const requestMetadata = formData.get('request'); // JSON string
    const fileContent = formData.get('fileContent'); // File/Blob

    if (!apiKey) {
      return new Response(JSON.stringify({ message: 'Missing API Key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!requestMetadata || !fileContent) {
      return new Response(JSON.stringify({ message: 'Missing request metadata or file content' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Construct the payload for Roblox API
    const robloxFormData = new FormData();
    robloxFormData.append('request', requestMetadata);
    robloxFormData.append('fileContent', fileContent, 'audio.wav');

    // Make the request to Roblox Open Cloud Assets API
    const robloxResponse = await fetch('https://apis.roblox.com/assets/v1/assets', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: robloxFormData,
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
    console.error('Serverless function error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
