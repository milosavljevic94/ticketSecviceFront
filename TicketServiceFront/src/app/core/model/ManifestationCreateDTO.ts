import {ManifestationDays} from "./ManifestationDays";

export class ManifestationCreateDTO {
    id : number;
    name : string = "";
    description : string = "";
    startTime : string;
    endTime : string;
    manifestationCategory : string;
    manDaysDto : ManifestationDays[] = [];
    locationId : number;
}