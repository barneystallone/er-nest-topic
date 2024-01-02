import { SuccessResponse } from '@/common';
import { Reservation } from '@/entities';

export interface ReservationResponse extends SuccessResponse<Reservation> {}

/**
 * @todo pagination, link 
 * @example 
  data  {
    items : Record<string,any>[],
    pagination: Record<string,any>,
    link: Record<string,any>
  }
 */
export interface ListReservationResponse extends SuccessResponse<Reservation[]> {}
