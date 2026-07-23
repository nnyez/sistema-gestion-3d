async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(path, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de conexión' }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  return res.json();
}

export const api = {
  auth: {
    login: (data: { email: string; password: string }) =>
      request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: { nombre: string; email: string; telefono: string; password: string }) =>
      request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    profile: () => request('/api/usuarios/profile'),
  },
  clientes: {
    list: () => request('/api/usuarios'),
  },
  productos: {
    list: () => request('/api/productos'),
    get: (id: number) => request(`/api/productos/${id}`),
  },
  cotizaciones: {
    create: (data: { material: string; calidad: string; cantidad: number }) =>
      request('/api/cotizaciones', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request('/api/cotizaciones'),
    mine: () => request('/api/cotizaciones/mis-cotizaciones'),
    get: (id: number) => request(`/api/cotizaciones/${id}`),
  },
  pedidos: {
    create: (data: { cotizacion_id: number; direccion_entrega: string; metodo_pago: string }) =>
      request('/api/pedidos', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request('/api/pedidos'),
    mine: () => request('/api/pedidos/mis-pedidos'),
    updateEstado: (id: number, estado: string) =>
      request(`/api/pedidos/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ estado }) }),
  },
  inventario: {
    list: () => request('/api/inventario'),
    updateStock: (id: number, cantidad_stock: number) =>
      request(`/api/inventario/${id}`, { method: 'PATCH', body: JSON.stringify({ cantidad_stock }) }),
  },
};
