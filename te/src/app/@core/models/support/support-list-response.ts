import { Support } from "./support";
import { BaseListResponse } from "../base-list.response";

export class SupportListResponse extends BaseListResponse{
    data: Array<Support>;
}