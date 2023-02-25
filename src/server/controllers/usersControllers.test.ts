import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { getUsers } from "./usersControllers";
import { type Request, type Response } from "express";
import User from "../../database/models/User";
import { app } from "../app";
import connectDataBase from "../../database/connectDataBase";
import { type UserStructure } from "../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

beforeAll(async () => {
  await User.create(mockUser);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

const mockUser: UserStructure = {
  username: "Diana",
  password: "12345678",
  email: "didi@didi.com",
  avatar: "hola.jpg",
};

describe("Given a getUsers controller", () => {
  describe("When it receives a response object", () => {
    test("Then it should call this status method with 200", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn(),
      } as Partial<Response>;
      const next = jest.fn();

      User.find = jest.fn().mockReturnValue({});
      const expectedStatusCode = 200;

      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});

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
