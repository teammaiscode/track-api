import { Request, Response } from "express";
import { SendTokenEmailService } from "../../services/app/SendTokenEmailService";
import { LocalStorage } from "node-localstorage";
import nodemailer from "nodemailer";

class SendTokenEmailController {
  async handle(request: Request, response: Response) {

    const { email } = request.body;

    const service = new SendTokenEmailService();

    const token = await service.execute(email);

    var localStorage = new LocalStorage('./scratch');

    localStorage.setItem("codeEmail", token.toString());
    localStorage.setItem("emailRecuperar", email);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "devtrackland@gmail.com",
        pass: "Track@123*+"
      }
    })

    const mailOptions = {
      from: "api.trackland@gmail.com",
      to: email,
      subject: "Recuperação de Senha - Trackland",
      html: `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <title></title>
        <style>
          table,
          td,
          div,
          h1,
          p {
            font-family: Roboto;
          }
        </style>
      </head>
      
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation"
                style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;background-color: #fff;">
                <tr>
                  <td align="center" style="padding:15px 0;background:#D2E8F7;">
                    <img src="https://trackland-crm.herokuapp.com/img/logo_menor.png"
                      style="height:auto;display:block;width:auto" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:55px 92px 40px 92px;text-align:center;">
                    <img src="https://trackland-crm.herokuapp.com/img/password.png" style="margin-bottom:45px;" />
      
                    <h1 style="color: black;font-weight:600;font-size:20px;line-height:23px;margin-bottom:55px;">RECUPERAR
                      SENHA DE ACESSO</h1>
      
                    <span
                      style="display: block;color:#0059A9;font-weight:600;font-size:30px;line-height:35px;margin-bottom:48px;">
                      ${token}
                    </span>
      
                    <span style="display: block;font-size:14px;line-height:16px;color:#000;">
                      Foi solicitado a recuperação de acesso ao sistema de identificação.
                      Casso não tenha sido você que fes esta requisição, apenas ignore
                      este e-mail.
                    </span>
      
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background:#6CB5E4;height:60px">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      
      </html>
      `
    }

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err)
      } else {
        return response.json({ message: "Email enviado com sucesso!" });
      }
    });
  }
}

export { SendTokenEmailController }