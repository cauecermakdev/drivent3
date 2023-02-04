import { PrismaClient,TicketStatus } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();


async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let enrollment = await prisma.enrollment.findFirst();
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        userId: 1,
        cpf: "44197646860",
        name: "enrollment1",
        phone: "35991842343",
        birthday: "2023-02-02T18:25:00.890Z"
      },
    });
  }


  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        includesHotel: true,
        isRemote: false,
        name: "VIP",
        price: 100,
      },
    });
  }

  let ticket = await prisma.ticket.findFirst();
  if (!ticket) {
    ticket = await prisma.ticket.create({
      data: {
        status: TicketStatus.PAID , 
        createdAt:"2023-02-02T18:25:00.890Z",
        updatedAt:"2023-02-02T18:25:00.890Z",  
        ticketTypeId: 1,
        enrollmentId:1,
      },
    });
  }


  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
