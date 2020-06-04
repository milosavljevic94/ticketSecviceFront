import { SeatWithPriceDTO } from './SeatWithPriceDTO';
import { SeatInfoDto } from './SeatInfoDto';

export class VerifySeatDto {

    rowNum : number = 0;
    columnNum : number = 0;
    takenSeats : SeatInfoDto[] = [];
}
