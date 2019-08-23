import { BaseListResponse } from "../base-list.response";
import { Review } from "./review";

export class ReviewListResponse extends BaseListResponse{
    data: Array<Review>;
}