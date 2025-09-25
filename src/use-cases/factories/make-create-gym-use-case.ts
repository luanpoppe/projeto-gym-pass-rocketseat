import { CreateGymUseCase } from "../create-gym.user-case";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
