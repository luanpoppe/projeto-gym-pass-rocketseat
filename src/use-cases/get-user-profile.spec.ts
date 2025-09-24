import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const { id } = await usersRepository.create({
      name: "abcd",
      email: "abcd@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await getUserProfileUseCase.execute({ userId: id });

    expect(user.name).toEqual("abcd");
  });

  it("should not be able to get user profile with wrong id", async () => {
    const result = getUserProfileUseCase.execute({
      userId: "non-existing-id",
    });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
