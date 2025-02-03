import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
 
async function createNewUser(to) {
  try {
    const config = await mailConfig();
 
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'patrulhanimal@email.com',
      to,
      subject: 'Conta criada na Patrulha Animal',
      text: `Excelente! Seu cadastro como nosso usuário foi concluído com sucesso.\n\nAcesse o nosso site para adotar ou doar pets.`,
      html: `<h1>Excelente! Seu cadastro como nosso usuário foi concluído com sucesso.</h1><p>Acesse o nosso site para adotar ou doar pets.</p>`,
    });
 
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function createNewPet(to) {
  try {
    const config = await mailConfig();
 
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Pet adiciondo a Patrulha Animal',
      text: `Pet adiciondo com sucesso.\n\nAcesse o aplicativo para ver seus pets`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para ver seus pets.</p>`,
    });
 
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}



 
export default { createNewUser,  createNewPet };
 