import {ManifestationDays} from "./ManifestationDays";

export class Manifestation {
    id : number;
    name : string;
    description : string;
    startTime : Date;
    endTime : Date;
    manifestationCategory : string;
    manDaysDto : ManifestationDays[] = [];
    locationId : number;
}