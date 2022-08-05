import { Session } from "@inrupt/solid-client-authn-browser";

export const session = new Session();
export function useAuthentication() {
  if (session.info.isLoggedIn) return session;
  else {
    return null;
  }
}
