import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

type HeaderParams = {
  x_token: string;
};

const tokenAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { x_token: apiToken } = req.headers as HeaderParams;
    console.info({ apiToken })
  } catch (err) {
    throw new AppError(
      "Acesso não permitido",
      401
    );
  }

  return next();
};

export default tokenAuth;
