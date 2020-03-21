import {ManifestationSectorPriceDto} from "./ManifestationSectorPriceDto";

export class ManifestationDays {
    id : number;
    name : string;
    description : string;
    startTime : Date;
    manifestationId : number;
    sectorPricesDtos : ManifestationSectorPriceDto[] = [];
}