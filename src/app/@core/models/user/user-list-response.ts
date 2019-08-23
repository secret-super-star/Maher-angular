import { User } from "./user";
import { BaseListResponse } from "../base-list.response";

export class UserListResponse extends BaseListResponse{
    data: Array<User>;
}