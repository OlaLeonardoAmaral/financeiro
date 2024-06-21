import { Server as SocketIO } from "socket.io";
import { Server } from "http";
import AppError from "../errors/AppError";
import { logger } from "../utils/logger";

let io: SocketIO;

const socket_access_cors = [`${process.env.FRONTEND_URL}`, `${process.env.WHATSAPP_WEB}`]

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    maxHttpBufferSize: 10e7,
    cors: {
      origin: socket_access_cors
    }
  });

  io.on("connection", socket => {
    // Adicione seus WebSockets Aqui

    socket.on("disconnect", () => {
    });
  });
  return io;
};

export const getIO = (): SocketIO => {
  if (!io) {
    throw new AppError("Socket IO not initialized");
  }
  return io;
};
