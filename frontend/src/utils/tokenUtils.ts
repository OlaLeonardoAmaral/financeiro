import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  const { exp } = jwtDecode<{ exp: number }>(token);
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
}
