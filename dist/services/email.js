import { SMTPClient } from "emailjs";
import { fillResetPasswordTemplate } from "../templates/reset-password.js";
import { fillActivateTemplate } from "../templates/activate-email.js";
import { APP_NAME, APP_URL } from "../constants/app.js";
import { env } from "../config/index.js";
const { origin, email } = env;
const { user, password, host } = email;
const client = new SMTPClient({
    user,
    password,
    host,
    ssl: true,
});
export const sendActivationEmail = async (token, user) => {
    const filledTemplate = fillActivateTemplate({
        appName: APP_NAME,
        appUrl: APP_URL,
        activateUrl: `${origin}/auth/email-activation?t=${token}`,
    });
    await sendEmail(user, "Activate your email", filledTemplate);
};
export const sendResetPasswordEmail = async (token, user) => {
    const filledTemplate = fillResetPasswordTemplate({
        appName: APP_NAME,
        appUrl: APP_URL,
        resetUrl: `${origin}/auth/reset-password?t=${token}`,
        to: user.name,
    });
    await sendEmail(user, "Reset your password", filledTemplate);
};
const sendEmail = async (user, subject, template) => {
    await client.sendAsync({
        from: "Product-Feedback-App <no-reply@gmail.com>",
        to: `${user.name} <${user.email}>`,
        subject,
        cc: "",
        text: ``,
        attachment: [
            {
                data: template,
                alternative: true,
            },
        ],
    });
};
