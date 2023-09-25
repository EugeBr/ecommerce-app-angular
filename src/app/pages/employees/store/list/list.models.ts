import { User as DBUser, Employee } from "src/app/models/backend";

export interface User extends DBUser {
    role: Employee;
}