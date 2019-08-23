import { Category } from "./category";
import { BaseListResponse } from "../base-list.response";

export class CategoryListResponse extends BaseListResponse{
    data: Array<Category>;
}