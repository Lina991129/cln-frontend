/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string; //?代表可选，可填可不填
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    createTime: Date;
    userRole: number;
    planetCode: string;
    tags: string[];
};
