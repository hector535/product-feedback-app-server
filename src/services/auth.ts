import bcrypt from "bcryptjs";
import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { User } from "../db/entities/index.js";
import { SignupParams } from "../types/index.js";
import { BadInputError } from "../errors/custom-errors.js";
import { CREDENTIAL_ERROR_MESSAGE } from "../constants/index.js";
import { orm } from "../config/mikro-orm.config.js";

export const getAuthServices = () => {
  const signup = async (userProperties: SignupParams): Promise<User> => {
    try {
      const user = orm.em.create(User, {
        ...userProperties,
        createdAt: new Date(),
      });

      await orm.em.persistAndFlush(user);

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
      return await orm.em.findOneOrFail(User, { email, activated: true });
    } catch (error) {
      throw new BadInputError(CREDENTIAL_ERROR_MESSAGE);
    }
  };

  const resetPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    await orm.em.transactional(async (inner) => {
      const user = await inner.findOneOrFail(User, { email });

      user.password = password;

      await inner.flush();
    });
  };

  const activateEmail = async (email: string): Promise<void> => {
    await orm.em.transactional(async (inner) => {
      const user = await inner.findOneOrFail(User, { email });

      user.activated = true;

      await inner.flush();
    });
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
