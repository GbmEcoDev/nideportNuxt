import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ce121a7de0306b",
    pass: "********7f3b"
  }
});

export const send = (options) => {
  return new Promise((resolve, reject) => {
    transport.sendMail(options, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        reject(error);
      } else {
        console.log('Email enviado:', info.messageId);
        resolve(info);
      }
    });
  });
};