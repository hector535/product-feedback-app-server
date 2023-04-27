import { Category } from "../db/entities/index.js";
export declare const getCategoryServices: () => {
    getAll: () => Promise<Category[]>;
};
