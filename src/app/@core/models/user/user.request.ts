import { Role } from "./role";

export class UserRequest {
    name: string;
    email: string;
    image: File;
    mobile_number: string;
    password: string;
    role: string;
    active: number;
}