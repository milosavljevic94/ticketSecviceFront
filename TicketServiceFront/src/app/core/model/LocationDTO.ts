import {Manifestation} from "./Manifestation";
import {Address} from "./Address";
import {Sector} from "./Sector";

export class LocationDTO {
    id : number;
    locationName : string = "";
    address : Address = new Address();
    sectors : Sector[] = [];
    manifestations : Manifestation[] = [];
    
}