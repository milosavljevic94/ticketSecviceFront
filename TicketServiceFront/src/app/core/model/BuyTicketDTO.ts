import { SeatWithPriceDTO } from "./SeatWithPriceDTO";

export class BuyTicketDTO {
    dayId : number;
    ticketId : number;
    wantedSeat : SeatWithPriceDTO = new SeatWithPriceDTO();    
    purchaseConfirmed : Boolean;
    purchaseTime : Date;
}