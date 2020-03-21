import { Reservation } from "./Reservation";

export class Ticket {
    id : number;
    rowNum : number;
    seatNum : number;
    purchaseConfirmed : Boolean;
    purchaseTime : Date;
    reservation : Reservation;
}

