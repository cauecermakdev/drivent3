import { prisma } from "@/config";
import { Enrollment, Hotel } from "@prisma/client";

async function findHotelsList(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelById(holteId: number): Promise<Hotel> {
  return prisma.hotel.findFirst({
    where: {
      id: holteId,
    },
    include: {
      Rooms: true,
    },
  });
} 

const hotelRepository = {
  findHotelsList,
  findHotelById,
};

export default hotelRepository;
