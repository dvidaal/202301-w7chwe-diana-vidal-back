import getUsers from "./usersControllers";
import { type Request, type Response } from "express";
import User from "../../database/models/User";

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
