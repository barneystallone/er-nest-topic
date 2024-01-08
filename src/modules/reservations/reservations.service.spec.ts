import { mockEm, mockReservation, mockReservationList, mockReservationRepo } from '@/__mocks__';
import { Reservation } from '@/entities';
import { EntityManager } from '@mikro-orm/mysql';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';

describe('ReservationService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,

        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepo,
        },

        {
          provide: EntityManager,
          useValue: mockEm,
        },
      ],
    }).compile();

    service = moduleRef.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    expect(await service.create(mockReservation)).toEqual(mockReservation);
  });

  it('should getAllReservation', async () => {
    jest
      .spyOn(mockReservationRepo, 'findAll')
      .mockImplementation(() => Promise.resolve(mockReservationList));

    expect(await service.findAll()).toEqual(mockReservationList);
  });

  it('should getReservationById', async () => {
    expect(await service.findOne('id1')).toEqual(mockReservation);
  });

  it('should delete', async () => {
    const mockReservationListCopy = [...mockReservationList];

    mockEm.removeAndFlush = jest.fn().mockImplementation((data: Reservation) => {
      const deleteItemIndex = mockReservationList.findIndex(
        (reservation) => (reservation.id = data.id),
      );

      mockReservationListCopy.splice(deleteItemIndex, 1);

      return Promise.resolve();
    });

    const deleted = await service.findOneAndDelete('id1');

    expect(deleted).toEqual(mockReservation);
    expect(mockReservationListCopy.length).toEqual(1);
  });

  it('throw an error if no reservation found to delete', async () => {
    expect(service.findOneAndDelete('asdasd')).rejects.toThrow(NotFoundException);
  });
});
