import { Request, Response } from "express";
import { SendCodeService } from "../../services/app/SendCodeService";

class SendCodeController {
  async handle(request: Request, response: Response) {

    const { code } = request.body;

    const sendCodeService = new SendCodeService()

    const result = await sendCodeService.execute(code);

    return response.json({ message: result });

  }
}

export { SendCodeController }