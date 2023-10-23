import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const aiUrl = process.env.AI_URL;

  try {
    const body = await request.json();
    
    const formattedBody = {
      content: body.content
    };

    const response = await axios.post(
      `${aiUrl}`,
      formattedBody
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