import { User } from "../user/user";
import { Provider } from "../provider/provider";
import { Address } from "./address";
import { Log } from "./log";

export class Appointment {
    id: string;    
    user_id: string;
    address_id: string;
    provider_id: string;    
    date: string;
    time_from: string;
    time_to: string;    
    status: string;
    user: User;
    provider: Provider;
    address: Address;
    logs: Array<Log>;
}