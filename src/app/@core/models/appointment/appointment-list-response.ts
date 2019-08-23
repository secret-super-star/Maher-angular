import { BaseListResponse } from "../base-list.response";
import { Appointment } from "./appointment";

export class AppointmentListResponse extends BaseListResponse{
    data: Array<Appointment>;
}