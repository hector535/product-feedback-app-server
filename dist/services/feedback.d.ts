import { Feedback } from "../db/entities/index.js";
import { AddParams, CountByStatusParams, EditParams, GetAllParams, GetByIdForPreviewReturn, GetCommentsReturn } from "../types/index.js";
export declare const getFeedbackServices: () => {
    getAll: ({ uid, limit, status, offset, }: GetAllParams) => Promise<[Feedback[], number]>;
    getByIdForPreview: (id: number, uid: number) => Promise<GetByIdForPreviewReturn>;
    getComments: (feedbackId: number, commentId: number | null) => Promise<GetCommentsReturn>;
    getByIdForEdit: (id: number, uid: number) => Promise<Feedback>;
    getCountByStatus: () => Promise<CountByStatusParams>;
    add: ({ title, content, category, author, }: AddParams) => Promise<void>;
    edit: ({ id, title, content, author, category, status, }: EditParams) => Promise<void>;
    remove: (id: number, uid: number) => Promise<void>;
    upvote: (id: number, uid: number) => Promise<void>;
};
