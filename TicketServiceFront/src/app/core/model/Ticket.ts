import { Reservation } from "./Reservation";

export class Ticket {
    id : number;
    rowNum : number = 1;
    seatNum : number = 1;
    purchaseConfirmed : Boolean;
    purchaseTime : Date;
    reservation : Reservation;
}

