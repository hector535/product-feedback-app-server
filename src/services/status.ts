import { RequestContext } from "@mikro-orm/core";
import { FeedbackStatus } from "../db/entities/index.js";
import { RETRIEVE_ENTITY_MANAGER_ERROR } from "../constants/index.js";

export const getStatusServices = () => {
  const em = RequestContext.getEntityManager();

  if (!em) throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);

  const getAll = async (): Promise<FeedbackStatus[]> => {
    return await em.find(FeedbackStatus, {}, { fields: ["id", "name"] });
  };

  return {
    getAll,
  };
};
