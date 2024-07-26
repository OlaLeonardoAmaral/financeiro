export interface User {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  secondName?: string;
  avatar?: string;

  [key: string]: unknown;
}
