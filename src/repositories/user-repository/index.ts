import { prisma } from "@/config";
import { Prisma, User } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findById(userId: number): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  findById,
  create,
};

export default userRepository;
