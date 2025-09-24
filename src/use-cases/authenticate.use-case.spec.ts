import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "abcd",
      email: "abcd@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "abcd@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const result = authenticateUseCase.execute({
      email: "abcd@gmail.com",
      password: "123456",
    });

    await expect(result).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "abcd",
      email: "abcd@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const result = authenticateUseCase.execute({
      email: "abcd@gmail.com",
      password: "wrong_password",
    });

    await expect(result).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
