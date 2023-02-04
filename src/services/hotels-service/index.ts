import { notFoundError, erro402 } from "@/errors";
import { ApplicationError } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
//import { exclude } from '@/utils/prisma-utils';
import { Hotel, TicketStatus } from "@prisma/client";
//import { string } from "joi";
//import enrollmentsService from "../enrollments-service";
//import dayjs from 'dayjs';

async function confirmedStay(userId: number): Promise<ApplicationError | boolean> {
  //error incricao
  const isThereEnrollment = await enrollmentRepository.findByUserId(userId);
  if (!isThereEnrollment) throw notFoundError();

  //error ticket
  const isThereTicket = await ticketRepository.findTicketByEnrollmentId(isThereEnrollment.id);
  if (!isThereTicket) throw notFoundError();

  if(isThereTicket.status !== TicketStatus.PAID) throw { name: "status isnt paid" };
  if(isThereTicket.TicketType.isRemote === true) throw { name: "ticket type is remote" };
  if(isThereTicket.TicketType.includesHotel === false) throw { name: "not include hotel" };

  return null;
}

async function getHotelsServ(): Promise<Hotel[]> {
  const hotels = await hotelRepository.findHotelsList();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelByIdServ(idSearch: number): Promise<Hotel> {
  const hotel = await hotelRepository.findHotelById(idSearch);
  if (!hotel) throw notFoundError();

  // return exclude(hotels, "createdAt", "updatedAt");
  return hotel;
}

const hotelsService = {
  getHotelsServ,
  getHotelByIdServ,
  confirmedStay,
};

export default hotelsService;
