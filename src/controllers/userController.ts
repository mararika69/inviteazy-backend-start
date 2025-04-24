import { NextFunction, Request, Response } from "express";
import { IUser, IUserService } from "../interfaces/userInterface";
import redisCache from "../services/cacheService";
import bcrypt from "bcrypt";
import fs from "fs";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAllUsers();
      res.json({ message: "Get all users.", data: result });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        full_name,
        email,
        password,
        phone_number,
        profile_picture,
        address
      }: Omit<IUser, "id"> = req.body;

      // 🔐 Hash the password and log it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const logMessage = `Hashed password for ${email}: ${hashedPassword}\n`;
      fs.appendFile("combine.log", logMessage, (err) => {
        if (err) {
          console.error("Error writing hashed password to combine.log:", err);
        } else {
          console.log("Hashed password logged to combine.log");
        }
      });

      const newUser = await this.userService.createUser({
        full_name,
        email,
        password: hashedPassword,
        phone_number,
        profile_picture,
        address,
      });

      res.status(201).json({
        message: "A new user was created.",
        data: newUser
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
