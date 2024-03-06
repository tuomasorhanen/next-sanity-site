"use client";
import { useState } from 'react';
import { track } from "@vercel/analytics";


export default function ContactForm({ description, title, thankYouMessage }) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (response.ok) {
      setIsSubmitted(true);
    }
  }

  function handleClose() {
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-app p-4 text-center">
        <div className="">{thankYouMessage}</div>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <p className='mx-auto max-w-xl text-center'>{description}</p>
      <form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
        <div className="my-4 flex w-full flex-col">
          <label className="font-bold text-gray-800" htmlFor="name"></label>
          <input
            type="text"
            placeholder="Nimi"
            minLength={3}
            maxLength={150}
            required
            className=" rounded-app border border-accent bg-white p-4 "
            autoComplete="off"
            id="name"
          />
        </div>
        <div className="my-4 flex w-full flex-col">
          <label className="font-bold text-gray-800" htmlFor="email"></label>
          <input
            type="email"
            placeholder="sähköposti"
            minLength={5}
            maxLength={150}
            required
            className=" rounded-app border border-accent bg-white p-4 "
            autoComplete="off"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="message"></label>
          <textarea
            rows={4}
            required
            placeholder="Viesti"
            minLength={10}
            maxLength={500}
            name="message"
            className="w-full rounded-app border border-accent bg-white p-4 "
          />
        </div>
        <button type="submit" disabled={loading} className="button mt-2 transition-scale" onClick={() => {
                  track('Lomake lähetetty');
                }}>
          Lähetä
        </button>
      </form>
    </>
  );
}
