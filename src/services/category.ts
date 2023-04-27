import { RequestContext } from "@mikro-orm/core";
import { Category } from "../db/entities/index.js";
import { RETRIEVE_ENTITY_MANAGER_ERROR } from "../constants/index.js";

export const getCategoryServices = () => {
  const em = RequestContext.getEntityManager();

  if (!em) throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);

  const getAll = async (): Promise<Category[]> => {
    return await em.find(Category, {}, { fields: ["id", "name"] });
  };

  return {
    getAll,
  };
};
