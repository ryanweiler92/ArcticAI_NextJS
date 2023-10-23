import Geocode from 'react-geocode';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const googleKey = process.env.GOOGLE_KEY || 'DEFAULT_KEY';
  try {
    const body = await request.json();
    const x = body.x;
    const y = body.y;
    Geocode.setApiKey(googleKey);

    Geocode.setLocationType('ROOFTOP');

    Geocode.enableDebug();

    return Geocode.fromLatLng(y.toString(), x.toString()).then(
      (response) => {
        const location = response.results[0].formatted_address;
        return new Response(JSON.stringify({ location }), { status: 200 });
      },
      (error) => {
        console.error(error);
      }
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
