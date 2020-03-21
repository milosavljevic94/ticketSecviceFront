import { Ticket } from "./Ticket";
import { UserDTO } from "./UserDTO";
import { BuyTicketDTO } from "./BuyTicketDTO";

export class Reservation {
    id : number;
    expDays : number;
    active : Boolean;
    user : UserDTO = new UserDTO();
    ticket : BuyTicketDTO = new BuyTicketDTO();
    
}

