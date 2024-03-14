import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = Object.entries(formData).map(([key, value]) =>
      `<li>${key}: ${value}</li>`).join('');
  
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: formData.subject || "New Form Submission",
      html: `<ul>${emailContent}</ul>`
    }

    await transporter.sendMail(mailOption);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to Send Email", error: error.message }, { status: 500 });
  }
}
