import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym.user-case";

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Titulo academia",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
