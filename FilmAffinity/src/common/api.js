// Código que llama a nuestra API en el servidor fake

export function login(email, password) {
  const body = JSON.stringify({email, password});
  return fetch('/api/users/login', {method: 'post', body});
}
export function logout() {
  return fetch('/api/users/logout', {method: 'delete'});
}
export function registro(data) {
  const body = JSON.stringify(data);
  return fetch('/api/users', {method: 'post', body});
}
export function perfil(data) {
  if (!data) return fetch('/api/users/me');
  const body = JSON.stringify(data);
  return fetch('/api/users/me', {method: 'put', body});
}
export function baja() {
  return fetch('/api/users/me', {method: 'delete'});
}