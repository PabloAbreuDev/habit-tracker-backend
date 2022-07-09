export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    password: string;
    verifyToken?: string;
    verified?: boolean
    habits?: string[]
}