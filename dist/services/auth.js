import bcrypt from "bcryptjs";
import { RequestContext, UniqueConstraintViolationException, } from "@mikro-orm/core";
import { User } from "../db/entities/index.js";
import { BadInputError } from "../errors/custom-errors.js";
import { CREDENTIAL_ERROR_MESSAGE, RETRIEVE_ENTITY_MANAGER_ERROR, } from "../constants/index.js";
export const getAuthServices = () => {
    const em = RequestContext.getEntityManager();
    if (!em)
        throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);
    const signup = async (userProperties) => {
        try {
            const user = em.create(User, {
                ...userProperties,
                createdAt: new Date(),
            });
            await em.persistAndFlush(user);
            return user;
        }
        catch (error) {
            if (error instanceof UniqueConstraintViolationException) {
                const customError = error;
                throw new BadInputError(customError.detail.slice(4));
            }
            throw error;
        }
    };
    const getUserByEmail = async (email) => {
        try {
            return await em.findOneOrFail(User, { email, activated: true });
        }
        catch (error) {
            throw new BadInputError(CREDENTIAL_ERROR_MESSAGE);
        }
    };
    const resetPassword = async (email, password) => {
        const user = await em.findOneOrFail(User, { email });
        user.password = password;
        await em.flush();
    };
    const activateEmail = async (email) => {
        const user = await em.findOneOrFail(User, { email });
        user.activated = true;
        await em.flush();
    };
    const validateCredentials = async (email, password) => {
        const user = await getUserByEmail(email);
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new BadInputError(CREDENTIAL_ERROR_MESSAGE);
        }
        return user;
    };
    return {
        signup,
        getUserByEmail,
        resetPassword,
        validateCredentials,
        activateEmail,
    };
};
