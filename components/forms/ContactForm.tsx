"use client";
import { useState } from 'react';
import { track } from "@vercel/analytics";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-center px-4 py-24 rounded-lg shadow-lg relative max-w-md w-full mx-2">
        {children}
        <button className="absolute top-0 right-0 m-4 text-2xl font-bold" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};


export default function ContactForm({ description, title, thankYouMessage }) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Added state for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
        })
      });
      const responseData = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        setShowModal(true); // Show thank you modal
        setName(''); 
        setEmail('');
        setMessage('');
        track('Form Submitted');
      } else {
        throw new Error(responseData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setIsSubmitted(false); // Optionally reset isSubmitted if you want to keep the form state
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
          <p >{thankYouMessage}</p>
      </Modal>
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <p className='mx-auto max-w-xl text-center'>{description}</p>
      <form onSubmit={sendMail} className='max-w-xl mx-auto'>
        <div className="my-4 flex w-full flex-col">
          <input
            type="text"
            placeholder="Nimi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            maxLength={150}
            required
            className="rounded-app border border-accent bg-white p-4"
            autoComplete="off"
            id="name"
          />
        </div>
        <div className="my-4 flex w-full flex-col">
          <input
            type="email"
            placeholder="sähköposti"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={5}
            maxLength={150}
            required
            className="rounded-app border border-accent bg-white p-4"
            autoComplete="off"
            id="email"
          />
        </div>
        <div>
          <textarea
            rows={4}
            required
            placeholder="Viesti"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minLength={10}
            maxLength={500}
            name="message"
            id="message"
            className="w-full rounded-app border border-accent bg-white p-4"
          />
        </div>
        <button type="submit" disabled={loading} className="button mt-2 transition-scale">
          Lähetä
        </button>
      </form>
    </>
  );
}
