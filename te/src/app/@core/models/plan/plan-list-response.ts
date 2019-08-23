import { Plan } from "./plan";
import { BaseListResponse } from "../base-list.response";

export class PlanListResponse extends BaseListResponse{
    data: Array<Plan>;
}