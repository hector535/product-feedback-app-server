import { orm } from "../config/mikro-orm.config.js";
import { Category } from "../db/entities/index.js";
export const getCategoryServices = () => {
    const getAll = async () => {
        return await orm.em.find(Category, {}, { fields: ["id", "name"] });
    };
    return {
        getAll,
    };
};
