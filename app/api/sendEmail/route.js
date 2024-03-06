import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `Uusi ilmoittautuminen pienryhmään - ${name}`,
            html: `
        <h3>Uusi saapunut ilmoittautuminen fysiosarianne.fi lomakkeen kautta</h3>
        <li> nimi: ${name}</li>
        <li> sähköposti: ${email}</li>
        <li> viesti: ${message}</li> 
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to Send Email", error: error.message }, { status: 500 })
    }
}