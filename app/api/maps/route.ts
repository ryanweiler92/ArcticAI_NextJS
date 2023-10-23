import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const backendUrl = process.env.BACKEND_URL;

export async function POST(request: NextRequest) {
  const token = cookies().get('token')?.value || null;
  if (!token) {
    return { message: 'No JWT', status: 401 };
  }
  try {
    const body = await request.json();
    const response = await axios.post(`${backendUrl}/api/v1/maps`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function PUT(request: NextRequest) {
  const token = cookies().get('token')?.value || null;
  if (!token) {
    return { message: 'No JWT', status: 401 };
  }
  try {
    const body = await request.json();
    const id = body.id;
    const response = await axios.put(`${backendUrl}/api/v1/maps/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function GET() {
  const token = cookies().get('token')?.value || null;
  if (!token) {
    return { message: 'No JWT', status: 401 };
  }
  try {
    const response = await axios.get(`${backendUrl}/api/v1/maps`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return new NextResponse(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = cookies().get('token')?.value || null;
  if (!token) {
    return { message: 'No JWT', status: 401 };
  }
  try {
    const body = await request.json();
    const { mapId } = body;
    const response = await axios.delete(`${backendUrl}/api/v1/maps/${mapId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return new NextResponse(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
