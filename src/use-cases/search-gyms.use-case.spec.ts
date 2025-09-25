import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms.use-case";

let gymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Academia abc",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Academia def",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: "abc",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Academia abc",
      }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: "Academia",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Academia 21",
      }),
      expect.objectContaining({
        title: "Academia 22",
      }),
    ]);
  });
});
