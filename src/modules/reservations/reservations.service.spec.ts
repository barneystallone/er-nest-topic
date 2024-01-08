// import { mockReservation } from '@/__mocks__';
import { Reservation } from '@/entities';
import { RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';

describe('ReservationService', () => {
  let service: ReservationsService;
  const mockReservationRepo = {
    create: (data: RequiredEntityData<Reservation>) => data,
    findAll: () => Promise.resolve([]),
    findOne: ({ id }: { id: string }) => mockReservationList.filter((list) => list.id === id)[0],
  };

  const mockEm = {
    persistAndFlush: () => Promise.resolve(),
    removeAndFlush: () => Promise.resolve(),
  };
  const createMockReservations = (count: number = 2) => {
    count = Math.max(count, 1);
    let mockReservationList = [];
    for (let i = 1; i <= count; i++) {
      mockReservationList = [
        ...mockReservationList,
        {
          id: `id${i}`,
          end_date: new Date('10/12/2023'),
          invoice_id: `invoice_id${i}`,
          place_id: `place_id${i}`,
          start_date: new Date('9/12/2023'),
          user_id: `userid${i}`,
          created_at: new Date('9/11/2023'),
        },
      ];
    }

    return mockReservationList;
  };

  const mockReservationList = createMockReservations(2);

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
    expect(await service.create(mockReservationList[0])).toEqual(mockReservationList[0]);
  });

  it('should getAllReservation', async () => {
    jest
      .spyOn(mockReservationRepo, 'findAll')
      .mockImplementation(() => Promise.resolve(mockReservationList));

    expect(await service.findAll()).toEqual(mockReservationList);
  });

  it('should getReservationById', async () => {
    expect(await service.findOne('id1')).toEqual(mockReservationList[0]);
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

    expect(deleted).toEqual(mockReservationList[0]);
    expect(mockReservationListCopy.length).toEqual(1);
  });

  it('throw an error if no reservation found to delete', async () => {
    expect(service.findOneAndDelete('asdasd')).rejects.toThrow(NotFoundException);
  });
});
