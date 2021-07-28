export interface User {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    name?: string;
    email?: string;
    isValidated?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
