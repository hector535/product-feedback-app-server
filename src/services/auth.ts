import bcrypt from "bcryptjs";
import {
  RequestContext,
  UniqueConstraintViolationException,
} from "@mikro-orm/core";
import { User } from "../db/entities/index.js";
import { SignupParams } from "../types/index.js";
import { BadInputError } from "../errors/custom-errors.js";
import {
  CREDENTIAL_ERROR_MESSAGE,
  RETRIEVE_ENTITY_MANAGER_ERROR,
} from "../constants/index.js";

export const getAuthServices = () => {
  const em = RequestContext.getEntityManager();

  if (!em) throw new Error(RETRIEVE_ENTITY_MANAGER_ERROR);

  const signup = async (userProperties: SignupParams): Promise<User> => {
    try {
      const user = em.create(User, {
        ...userProperties,
        createdAt: new Date(),
      });

      await em.persistAndFlush(user);

      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        const customError = error as typeof error & { detail: string };
        throw new BadInputError(customError.detail.slice(4));
      }

      throw error;
    }
  };

  const getUserByEmail = async (email: string): Promise<User> => {
    try {
      return await em.findOneOrFail(User, { email, activated: true });
    } catch (error) {
      throw new BadInputError(CREDENTIAL_ERROR_MESSAGE);
    }
  };

  const resetPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    const user = await em.findOneOrFail(User, { email });

    user.password = password;

    await em.flush();
  };

  const activateEmail = async (email: string): Promise<void> => {
    const user = await em.findOneOrFail(User, { email });

    user.activated = true;

    await em.flush();
  };

  const validateCredentials = async (
    email: string,
    password: string
  ): Promise<User> => {
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
