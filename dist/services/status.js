import { orm } from "../config/mikro-orm.config.js";
import { FeedbackStatus } from "../db/entities/index.js";
export const getStatusServices = () => {
    const getAll = async () => {
        return await orm.em.find(FeedbackStatus, {}, { fields: ["id", "name"] });
    };
    return {
        getAll,
    };
};
