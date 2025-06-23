import reshttp from "reshttp";
import SystemInsights from "./applicationHealth.service";
import { httpResponse } from "../../utils/globalUtils/httpResponse.utils";
import type { FastifyReply, FastifyRequest } from "fastify";
class Performancehandler {
  static getPerformance = (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const healthData = {
        applicationHealth: SystemInsights.getApplicationHealth(),
        systemHealth: SystemInsights.getSystemHealth()
      };
      httpResponse(request, reply, reshttp.okCode, reshttp.okMessage, healthData);
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: reshttp.internalServerErrorCode,
          message: error.message || reshttp.internalServerErrorMessage
        };
      }
    }
  };
}

export default Performancehandler;
