import request from "supertest";
import mongoose from "mongoose";
import jsw from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type Request, type Response } from "express";
import User from "../../../database/models/User";
import { app } from "../../app";
import connectDataBase from "../../../database/connectDataBase";
import { type UserStructure } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

const mockUser: UserStructure = {
  username: "Didi",
  password: "12345678",
  email: "didi@didi.com",
  avatar: "hola.jpg",
};

describe("Given a POST '/users/create' endpoint", () => {
  describe("When it receies a request to create a new user with name 'Diana', password '12345678' and email 'didi@didi.com'", () => {
    test("Then it should return a status code 201", async () => {
      const createUrl = "/users/create";
      const expectedStatus = 201;

      const response = await request(app)
        .post(createUrl)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("username", mockUser.username);
    });
  });
});

describe("Given a POST '/users/login'", () => {
  beforeAll(async () => {
    await User.create(mockUser);
  });

  describe("When it receives a request with name 'Diana' and password '12345678'", () => {
    test("Then it should return a status code 200", async () => {
      const loginUrl = "/users/login";
      const expectedStatus = 200;
      const expectedToken = "something";

      jsw.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });
});
