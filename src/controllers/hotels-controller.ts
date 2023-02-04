import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
//import { rmSync } from "fs";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req; //id do usuario que está fazendo a requisição
  try {
    await hotelsService.confirmedStay(userId);
  } catch (err) {
    console.log(err);
    if (err.name == "NotFoundError") {
      res.status(httpStatus.NOT_FOUND).send({});
    }
    res.status(402).send({});
  }

  // if (errorConfirmed !== null) {
  //   res.status(httpStatus.NOT_FOUND).send(errorConfirmed);
  // }

  try {
    const listHotels = await hotelsService.getHotelsServ();
    return res.status(httpStatus.OK).send(listHotels);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.id);
  const { userId } = req; //id do usuario que está fazendo a requisição
  try {
    await hotelsService.confirmedStay(userId);
  } catch (err) {
    if (err.name == "NotFoundError") {
      res.status(httpStatus.NOT_FOUND).send({});
    }
    res.status(httpStatus.PAYMENT_REQUIRED).send({});
  }

  //2. Ticket não foi pago, é remoto ou não inclui hotel: 402 (payment required)
  try {
    const hotel = await hotelsService.getHotelByIdServ(id);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) { 
    //3. Outros erros: 400 (bad request)
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

// export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
//   try {
//     const ticketId = Number(req.query.ticketId);
//     const { userId } = req;

//     if (!ticketId) {
//       return res.sendStatus(httpStatus.BAD_REQUEST);
//     }
//     const payment = await paymentService.getPaymentByTicketId(userId, ticketId);

//     if (!payment) {
//       return res.sendStatus(httpStatus.NOT_FOUND);
//     }
//     return res.status(httpStatus.OK).send(payment);
//   } catch (error) {
//     if (error.name === "UnauthorizedError") {
//       return res.sendStatus(httpStatus.UNAUTHORIZED);
//     }
//     return res.sendStatus(httpStatus.NOT_FOUND);
//   }
// }
