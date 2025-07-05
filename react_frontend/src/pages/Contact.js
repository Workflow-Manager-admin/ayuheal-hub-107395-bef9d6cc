import React, { useState } from "react";
import Button from "../components/Button";

// PUBLIC_INTERFACE
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Wire to backend (Firebase or email API)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ayu-contact-page">
        <h1>Contact AyuCare</h1>
        <div className="ayu-contact-success">
          <p>Thank you for reaching out. We'll get back to you soon!</p>
          <Button to="/">Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ayu-contact-page">
      <h1>Contact AyuCare</h1>
      <form className="ayu-contact-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help?" rows={4} required />
        <Button type="submit">Send Message</Button>
      </form>
      <hr className="ayu-divider" />
      <section className="ayu-contact-whatsapp">
        <p>Or start a WhatsApp consultation:</p>
        <Button as="a" href="https://wa.me/" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</Button>
      </section>
    </div>
  );
}

export default Contact;
