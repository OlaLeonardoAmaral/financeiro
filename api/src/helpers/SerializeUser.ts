import User from "../models/User";

interface SerializedUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  secondName: string;
  tokenVersion?: number;
}
export const SerializeUser = (user: User): SerializedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
    tokenVersion: user?.tokenVersion,
  };
};
