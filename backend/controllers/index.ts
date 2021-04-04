import { Request, Response } from "express";

export default (req: Request, res: Response) =>
  res.send("Hi, use the '/exchange' route pls :)");
