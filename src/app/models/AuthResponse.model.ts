import { User } from './User.model';

export interface AuthResponse {
    user: User;
    token: string;
}