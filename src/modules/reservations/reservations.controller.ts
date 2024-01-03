import { OK } from '@/common';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';
import { ListReservationResponse, ReservationResponse } from './response.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto): Promise<ReservationResponse> {
    const newReservation = await this.reservationsService.create(createReservationDto);
    return new OK(newReservation);
  }

  @Get()
  async findAll(): Promise<ListReservationResponse> {
    const listReservations = await this.reservationsService.findAll();
    return new OK(listReservations);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundReservation = await this.reservationsService.findOne(id);
    return new OK(foundReservation);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    const updatedReservation = await this.reservationsService.findOneAndUpdate(
      id,
      updateReservationDto,
    );
    return new OK(updatedReservation);
  }

  @Delete(':id')
  async findOneAndDelete(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedReservation = await this.reservationsService.findOneAndDelete(id);
    return new OK(deletedReservation);
  }
}
