import { Country } from "./country";
import { BaseListResponse } from "../base-list.response";

export class CountryListResponse extends BaseListResponse{
    data: Array<Country>;
}