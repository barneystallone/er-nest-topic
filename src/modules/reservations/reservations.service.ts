import { Reservation } from '@/entities';
import { wrap } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from './dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepo: EntityRepository<Reservation>,
    private readonly em: EntityManager,
  ) {}

  create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const newReservation = this.reservationRepo.create(createReservationDto);

    return this.em.persistAndFlush(newReservation).then(() => newReservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepo.findAll();
  }

  findOne(id: string): Promise<Reservation> {
    return this.reservationRepo.findOne({ id });
  }

  async findOneAndUpdate(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const foundReservation = await this.reservationRepo.findOne({ id });

    if (!foundReservation) throw new NotFoundException();
    wrap(foundReservation).assign(updateReservationDto);

    return this.em.flush().then(() => foundReservation);
  }

  /**
   * @todo softDelete
   */
  async findOneAndDelete(id: string): Promise<Reservation> {
    const foundReservation = await this.reservationRepo.findOne({ id });

    if (!foundReservation) throw new NotFoundException();
    await this.em.removeAndFlush(foundReservation);

    return foundReservation;
  }
}
