import { Request, Response } from "express";
import { CreateUsersService } from "../../services/admin/CreateUsersService";
// import nodemailer from "nodemailer";

class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const service = new CreateUsersService();

    await service.execute({ name, email, admin, password });

    //   let transporter = nodemailer.createTransport({
    //     host: "smart.iagentesmtp.com.br",
    //     port: 587,
    //     auth: {
    //       user: "kennedy@maiscode.com.br",
    //       pass: "d3223633",
    //     },
    //   })

    //   const mailOptions = {
    //     from: "api.trackland@gmail.com",
    //     to: email,
    //     subject: "Recuperação de Senha - Trackland",
    //     html: `
    //     <!DOCTYPE html>
    //     <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

    //     <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width,initial-scale=1">
    //       <meta name="x-apple-disable-message-reformatting">
    //       <link rel="preconnect" href="https://fonts.googleapis.com">
    //       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    //       <title></title>
    //       <style>
    //         table,
    //         td,
    //         div,
    //         h1,
    //         p {
    //           font-family: Roboto;
    //         }
    //       </style>
    //     </head>

    //     <body style="margin:0;padding:0;">
    //       <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    //         <tr>
    //           <td align="center" style="padding:0;">
    //             <table role="presentation"
    //               style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;background-color: #fff;">
    //               <tr>
    //                 <td align="center" style="padding:15px 0;background:#D2E8F7;">
    //                   <img src="https://trackland-crm.herokuapp.com/img/logo_menor.png"
    //                     style="height:auto;display:block;width:auto" />
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td style="padding:55px 92px 40px 92px;text-align:center;">

    //                   <h1 style="color: #0059A9;font-weight:600;font-size:20px;line-height:23px;margin-bottom:55px;">
    //                     CADASTRO REALIZADO COM SUCESSO</h1>


    //                   <div style="text-align: left; display: block;">
    //                     <span style="font-size:16px;line-height:16px;color:#000;">
    //                       Informações para acesso a nossa plataforma
    //                     </span>

    //                     <span style="display: block; font-size: 16px;">
    //                       <b>Usuário:</b>&nbsp &nbsp ${name}
    //                     </span>

    //                     <span style="display: block; font-size: 16px; margin-bottom: 16px;">
    //                       <b>Senha:</b>&nbsp &nbsp &nbsp ${password}
    //                     </span>

    //                     <span style="display: block;font-size: 12px; text-align: center; color: #000">
    //                       Esta senha é padrão, podendo ser alterada pelo usuário a qualquer momento em nossa plataforma.
    //                     </span>
    //                   </div>

    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td style="padding:30px;background:#6CB5E4;height:60px">
    //                 </td>
    //               </tr>
    //             </table>
    //           </td>
    //         </tr>
    //       </table>
    //     </body>

    //     </html>
    //     `
    //   }

    //   transporter.sendMail(mailOptions, (err) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       return response.json({ message: "Usuário criado com sucesso!" });
    //     }
    //   });

  }
}

export { CreateUsersController }