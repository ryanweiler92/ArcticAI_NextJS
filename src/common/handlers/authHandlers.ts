export const login = async (data: any) => {
  const response = await fetch(`/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    throw new Error('Failed to login');
  }
};

export const register = async (data: any) => {
  const response = await fetch(`/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    throw new Error('Failed to login');
  }
};

export const verifyAuth = async () => {
  const response = await fetch(`/api/authorization`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();

  if (!body.authenticated) {
    console.warn('Not authenticated');
  }
  return body.authenticated;
};

export const logout = async () => {
  const response = await fetch(`/api/logout`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  return body.success;
};
