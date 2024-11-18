export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export function set(window: WindowLocalStorage, data: IToken) {
  window.localStorage.setItem('token', data.accessToken);
  window.localStorage.setItem('refresh_token', data.refreshToken);
}

export function remove(window: WindowLocalStorage) {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refresh_token');
}
