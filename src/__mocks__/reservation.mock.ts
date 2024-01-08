import { Reservation } from '@/entities';
import { RequiredEntityData } from '@mikro-orm/core';

export const mockReservationRepo = {
  create: (data: RequiredEntityData<Reservation>) => {
    return data;
  },

  findAll: () => {
    return Promise.resolve([]);
  },

  findOne: ({ id }: { id: string }) => {
    return mockReservationList.filter((list) => list.id === id)[0];
  },
};
export const mockEm = {
  persistAndFlush: () => Promise.resolve(),
  removeAndFlush: () => Promise.resolve(),
};

export const mockReservation = {
  id: 'id1',
  end_date: new Date('10/12/2023'),
  invoice_id: 'invoice_id',
  place_id: 'place_id',
  start_date: new Date('9/12/2023'),
  user_id: 'userid',
  created_at: new Date('9/11/2023'),
};

export const mockReservation2 = {
  id: 'id2',
  end_date: new Date('10/13/2023'),
  invoice_id: 'invoice_id2',
  place_id: 'place_id2',
  start_date: new Date('9/15/2023'),
  user_id: 'userid2',
  created_at: new Date('9/12/2023'),
};

export const mockReservationList = [mockReservation, mockReservation2];
