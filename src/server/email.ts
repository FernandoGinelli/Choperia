// src/server/email.ts

import express, { Router } from "express"


import nodemailer from "nodemailer";


export const email = Router()

email.use(express.json())


email.post("/api/email", async (req, res) => {


   var  { to, subject, text, html } = req.body;

  // to =req.query.to
  // subject =req.query.subject
  // text =req.query.text
  // html =req.query.html





  var transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "fernando.les.teste@outlook.com",
      pass: "testando123"
    }
  });

  var message = {
    from: 'fernando.les.teste@outlook.com',
    to: to,
    subject: subject,
    text: text,
    html: html
  };

  transport.sendMail(message, function (err) {
    if (err) {
      return res.status(400).json({
        erro: true,
        mensagem: "Falhou ao enviar o email",
        to,

      });
    }
    return res.json({
      erro: false,
      mensagem: "Email enviado com sucesso",
      message
    });
  });
});
