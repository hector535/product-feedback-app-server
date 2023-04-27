import { tryCatch } from "../utils/index.js";
import { validateJWT } from "../validators/auth.js";
import { getStatusServices } from "../services/index.js";
export const getAll = tryCatch(async (req, res) => {
    await validateJWT(req);
    const statusService = getStatusServices();
    const status = await statusService.getAll();
    res.json(status);
});
