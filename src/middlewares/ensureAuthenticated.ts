import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, "fe48a24cc0d472dffa04dab0feec9b49") as IPayload
    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).json({ error: "Log In necessary!" });
  }
}