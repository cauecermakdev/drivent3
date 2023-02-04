import app, { init } from '@/app';
import { prisma } from '@/config';
import {
  createEnrollmentWithAddress,
  createHotel,
  createRoom,
  createSession,
  createSessionWithUser,
  createTicketType,
  createUser,
} from "../factories";
import httpStatus from 'http-status';
import supertest from 'supertest';
import { generateValidToken } from '../helpers';
import { createEnrollmentSchema } from '@/schemas';
//import { createTicket } from '@/controllers';
import { create } from 'domain';
import ticketService from '@/services/tickets-service';
import { Ticket, TicketStatus } from '@prisma/client';
import { createTicket } from '../factories';
import userRepository from '@/repositories/user-repository';

beforeAll(async () => {
  await init();
  console.log("before all");
//   await prisma.user.deleteMany();
//   await prisma.session.deleteMany();
//   await prisma.ticket.deleteMany();
//   await prisma.ticketType.deleteMany();
//   await prisma.enrollment.deleteMany();
});

// - Não existe (inscrição, ticket ou hotel): 404 (not found)
// - Ticket não foi pago, é remoto ou não inclui hotel: 402 (payment required)
// - ~~Outros erros: 400 (bad request)~~

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 200 with OK! text', async () => {
    const user = await createUser();
    // console.log("create USER");
    // console.log( user);
    const token = await generateValidToken(user);
    const session = await createSessionWithUser(token, user);
    const hotel = await createHotel();
    const rooms = await createRoom(hotel.id);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();

    const ticket = (await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID)) as Ticket;
    //console.log(ticket);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    );
  });
  //   it('Se o Token é inválido', async () => {
  //     console.log('inside token valido');
  //     const response = await server.get('/hotels');

  //     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  //   });
});

//quando tem hotels
//quando nao tem hotels
//quando tem inscricao/ticket/hotel
//quando nao tem inscricao/ticket/hotel
//Ticket não foi pago
//é remoto
//não inclui hotel: 402 (payment required)
