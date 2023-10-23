import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const orsKey = process.env.ORS_KEY;

  try {
    const body = await request.json();
    const startCoords = body.startCoords;
    const endCoords = body.endCoords;
    const response = await axios(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsKey}&start=${startCoords[0]},${startCoords[1]}&end=${endCoords[0]},${endCoords[1]}`
    );
    const data = response.data;
    return new NextResponse(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
