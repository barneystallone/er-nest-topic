import { IsValidDateFormatAndAfter, IsValidDateFormatAndAfterNow } from '@/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsValidDateFormatAndAfterNow()
  @IsNotEmpty()
  start_date!: Date;

  @IsValidDateFormatAndAfter('start_date')
  @IsNotEmpty()
  end_date!: Date;

  @IsString()
  @IsNotEmpty()
  place_id!: string;

  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsString()
  @IsNotEmpty()
  invoice_id!: string;
}
