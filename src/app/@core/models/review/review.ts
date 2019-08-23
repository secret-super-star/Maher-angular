import { User } from "../user/user";
import { Provider } from "../provider/provider";

export class Review {
    id: string;    
    rating: number;
    user_id: string;
    provider_id: string;    
    review: string;
    created_at: string;
    user: User;
    provider: Provider;
    active: number;
}