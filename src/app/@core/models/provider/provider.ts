import { Category } from "../category/category";
import { User } from "../user/user";

export class Provider {
    id: string;
    is_verified: number;
    primary_category_id: string;
    image_url: string;
    document_url: string;
    about: string;
    price: number;
    price_type: string;
    address: string;
    latitude: number;
    longitude: number;
    subcategories: Array<Category>;
    user: User;
    primary_category: Category;
    plan: string;
    active: number;
}