import { Provider } from "./provider";
import { BaseListResponse } from "../base-list.response";

export class ProviderListResponse extends BaseListResponse{
    data: Array<Provider>;
}