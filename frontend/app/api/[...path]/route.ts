const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000/api';

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join('/')}${request.url.includes('?') ? '?' + request.url.split('?')[1] : ''}`;
  const headers: Record<string, string> = {};
  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;
  const res = await fetch(url, { headers });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}

export async function POST(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;
  const body = await request.json().catch(() => null);
  const res = await fetch(url, { method: 'POST', headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;
  const body = await request.json().catch(() => null);
  const res = await fetch(url, { method: 'PATCH', headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}

export async function PUT(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;
  const body = await request.json().catch(() => null);
  const res = await fetch(url, { method: 'PUT', headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join('/')}`;
  const headers: Record<string, string> = {};
  const authHeader = request.headers.get('authorization');
  if (authHeader) headers['Authorization'] = authHeader;
  const res = await fetch(url, { method: 'DELETE', headers });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}
