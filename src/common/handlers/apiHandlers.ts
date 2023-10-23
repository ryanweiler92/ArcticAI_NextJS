// open route service request
export async function orsRequest(
  startCoords: Array<number>,
  endCoords: Array<number>
) {
  try {
    const response = await fetch('./api/ors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startCoords, endCoords }),
    });

    if (!response.ok) {
      throw new Error('Failed to get directions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting directions:', error);
  }
}

export async function googleReverseGeocode(x: number, y: number) {
  try {
    const response = await fetch('./api/geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x, y }),
    });

    if (!response.ok) {
      throw new Error('Failed to get directions');
    }
    const data = await response.json();
    return data.location;
  } catch (error) {
    console.error('Error getting directions:', error);
  }
}

export async function gptRequest(prompt: string) {
  try {
    const response = await fetch('./api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Format the request body to match your requirements
      body: JSON.stringify({ content: prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get response:', error);
  }
}
