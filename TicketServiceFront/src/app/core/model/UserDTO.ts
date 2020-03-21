import { Role } from "./Role";
import { Reservation } from "./Reservation";

export class UserDTO {
    id : number;
    email : string;
    userName : string;
    firstName : string;
    lastName : string;
    password : string;
    matchingPassword : string;
    active : Boolean;
    role : Role;
    reservation : Reservation[];
    
}

