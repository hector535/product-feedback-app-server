import { getAuthServices, emailService } from "../services/index.js";
import { authSchema } from "../schemas/index.js";
import { zParser } from "../validators/index.js";
import {
  hashValue,
  createJWT,
  tryCatch,
  createEmailToken,
  getEmailFromToken,
  pickRandomPhoto,
} from "../utils/index.js";
import { ACCESS_TOKEN_NAME, COOKIE_OPTIONS } from "../constants/index.js";
import { HttpStatusCode } from "../types/index.js";

export const signup = tryCatch(async (req, res) => {
  const {
    body: { name, username, email, password },
  } = await zParser(authSchema.signup, req);

  const hashedPassword = await hashValue(password);

  const authService = getAuthServices();

  const user = await authService.signup({
    img: pickRandomPhoto(),
    name,
    username,
    email,
    password: hashedPassword,
    activated: false,
  });

  const token = await createEmailToken({ email });

  await emailService.sendActivationEmail(token, user);

  res.status(HttpStatusCode.NO_CONTENT).json();
});

export const signin = tryCatch(async (req, res) => {
  const {
    body: { email, password },
  } = await zParser(authSchema.signin, req);

  const authService = getAuthServices();

  const user = await authService.validateCredentials(email, password);

  const token = await createJWT({ uid: user.id });

  res
    .cookie(ACCESS_TOKEN_NAME, token, COOKIE_OPTIONS)
    .json({ id: user.id, name: user.name, username: user.username, email });
});

export const forgot = tryCatch(async (req, res) => {
  const {
    body: { email },
  } = await zParser(authSchema.forgot, req);

  const authService = getAuthServices();

  const user = await authService.getUserByEmail(email);

  const token = await createEmailToken({ email });

  await emailService.sendResetPasswordEmail(token, user);

  res.status(HttpStatusCode.NO_CONTENT).json();
});

export const reset = tryCatch(async (req, res) => {
  const {
    body: { token, password },
  } = await zParser(authSchema.reset, req);

  const { email } = await getEmailFromToken(token as string);
  const hashedPassword = await hashValue(password);

  const authService = getAuthServices();

  await authService.resetPassword(email, hashedPassword);

  res.status(HttpStatusCode.NO_CONTENT).json();
});

export const activate = tryCatch(async (req, res) => {
  const {
    body: { token },
  } = await zParser(authSchema.activate, req);

  const { email } = await getEmailFromToken(token as string);

  const authService = getAuthServices();

  await authService.activateEmail(email);

  res.status(HttpStatusCode.NO_CONTENT).json();
});
