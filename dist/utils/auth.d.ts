export type Payload = {
    uid: number;
};
export declare const hashValue: (value: string) => Promise<string>;
export declare const createJWT: (payload: Payload) => Promise<string>;
export declare const createEmailToken: (payload: {
    email: string;
}) => Promise<string>;
export declare const getEmailFromToken: (token: string) => Promise<{
    email: string;
}>;
export declare const getPayloadFromJWT: (token: string) => Promise<Payload>;
export declare const pickRandomPhoto: () => string;
