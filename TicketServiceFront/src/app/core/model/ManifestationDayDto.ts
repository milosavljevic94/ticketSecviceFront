import { Manifestation } from "./Manifestation";

export class ManifestationDayDto {
    id : number;
    name : string;
    startTime : Date;
    manifestation : Manifestation = new Manifestation();
    
}