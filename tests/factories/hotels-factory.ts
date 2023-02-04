import faker from "@faker-js/faker";
import { prisma } from "@/config";
//import { Room, TicketStatus, User } from '@prisma/client';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    },
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.random.locale(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
}

export async function createBooking( userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
