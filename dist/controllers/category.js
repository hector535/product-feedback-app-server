import { tryCatch } from "../utils/index.js";
import { validateJWT } from "../validators/index.js";
import { getCategoryServices } from "../services/index.js";
export const getAll = tryCatch(async (req, res) => {
    await validateJWT(req);
    const categoryService = getCategoryServices();
    const categories = await categoryService.getAll();
    res.json(categories);
});
