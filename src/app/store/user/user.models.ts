import { User } from 'src/app/models/backend';
export {User, Recruiter, Employee} from '@app/models/backend/user';

export interface EmailPasswordCredentials {
    email: string;
    password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>;