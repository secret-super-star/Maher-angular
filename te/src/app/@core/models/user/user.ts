import { Role } from "./role";

export class User {
    id: string;
    name: string;
    email: string;
    image_url: string;
    mobile_number: string;
    roles: Array<Role>;
    active: number;
}