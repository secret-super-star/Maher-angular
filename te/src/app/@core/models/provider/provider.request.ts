import { Category } from "../category/category";

export class ProviderRequest {    
    is_verified: number;
    primary_category_id: string;
    image: string;
    document: string;
    about: string;
    price: number;
    price_type: string;
    address: string;
    latitude: number;
    longitude: number;
    sub_categories: Array<Category>;
    plan_id: string;
}