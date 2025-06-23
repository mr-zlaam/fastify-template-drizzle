import type { FastifyRequest, FastifyReply } from "fastify";
import envConfig from "../../configs/env.config";
import dayjs from "dayjs";
const ENV = envConfig.NODE_ENV;

export interface IHTTPRESPONSE {
  success: boolean;
  status: number;
  message: string;
  data: unknown;
  metaData?: unknown;
  optMessage?: string;
  requestInfo: {
    ip?: string;
    url: string | null;
    method: string | null;
  };
}

export const jsonResponse = (
  status: number,
  message: string = "OK",
  data: object | null = null,
  metaData: object | null = null,
  optMessage: string = ""
) => {
  return {
    success: status < 400,
    statusCode: status,
    message,
    data,
    metaData,
    optMessage
  };
};

export const httpResponse = (req: FastifyRequest, reply: FastifyReply, statusCode: number, message: string, data: unknown = null) => {
  const response: IHTTPRESPONSE = {
    success: statusCode < 400,
    status: statusCode,
    message,
    data,
    requestInfo: {
      url: req.raw.url || null,
      ip: req.ip,
      method: req.raw.method || null
    },
    metaData: {
      timeStamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
  };

  if (ENV === "production") {
    delete response.requestInfo.ip;
  }

  return reply.code(statusCode).send(response);
};
