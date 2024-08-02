import User from "../../models/User";
import AppError from "../../errors/AppError";
import {
  createAccessToken,
  createRefreshToken
} from "../../helpers/CreateTokens";
import { SerializeUser } from "../../helpers/SerializeUser";

interface SerializedUser {
  id: string;
  name: string;
  email: string;
  firsthName?: string;
  secondName?: string;
  tokenVersion?: number;
}

interface Request {
  email: string;
  password: string;
}

interface Response {
  serializedUser: SerializedUser;
  token: string;
  refreshToken: string;
}

const AuthUserService = async ({
  email,
  password
}: Request): Promise<Response> => {
  const user = await User.findOne({
    where: { email }
  });

  if (!user || !(await user.checkPassword(password))) {
    throw new AppError("Email ou senha incorretos.", 401);
  }

  const token = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  const serializedUser = SerializeUser(user);

  return {
    serializedUser,
    token,
    refreshToken
  };
};

export default AuthUserService;
