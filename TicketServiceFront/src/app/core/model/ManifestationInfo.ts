import {ManifestationDays} from "./ManifestationDays";
import { ManifestationSectorPriceDto } from "./ManifestationSectorPriceDto";

export class ManifestationInfo {
    id : number;
    description : string;
    days : ManifestationDays[] = [];
    sectorPrices : ManifestationSectorPriceDto[] = [];
}