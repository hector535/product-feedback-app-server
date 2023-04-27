import { z } from "zod";
import { feedbackSchema } from "../schemas/index.js";
export type GetAllParams = z.infer<typeof feedbackSchema.getAll.shape.query> & {
    uid: number;
};
export type AddParams = z.infer<typeof feedbackSchema.add.shape.body> & {
    author: {
        id: number;
    };
};
export type EditParams = z.infer<typeof feedbackSchema.edit.shape.body> & {
    id: number;
    author: {
        id: number;
    };
};
export type CountByStatusParams = z.infer<typeof feedbackSchema.countByStatus>;
export type GetByIdForPreviewReturn = {
    id: number;
    title: string;
    content: string;
    enabled: boolean;
    category: {
        id: number;
        name: string;
    };
    upvotes: number;
    commentCounter: number;
    canEdit: boolean;
    hasUpvoted: boolean;
};
export type GetCommentsReturn = {
    id: number;
    user: {
        name: string;
        username: string;
        img: string;
    };
    content: string;
    comments: GetCommentsReturn[] | null;
};
