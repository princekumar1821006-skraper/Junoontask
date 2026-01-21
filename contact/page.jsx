import fetchData from "@/lib/sanity/fetchData";
import ContactMenu from "@/components/ContactMenu";

export default async function Contact() {
  const contact = await fetchData("contact", {}, "[0]");
  const socialLinks = await fetchData("socialLink");

  return (
    <main className="min-h-screen bg-darker pt-32 pb-20 text-white relative overflow-x-hidden">
      {/* Glow Background */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-neon-green/5 blur-[120px] md:h-[600px] md:w-[600px]" />

      <div className="mx-auto w-11/12 max-w-6xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          
          {/* LEFT SIDE — TEXT + FORM */}
          <div className="flex flex-col gap-10">
            <div className="mt-4 md:mt-10">
              <h1 className="mb-6 text-5xl font-bold leading-[0.9] tracking-tighter text-white break-words md:text-7xl lg:text-8xl">
                {contact?.heading || "Let's Create Together."}
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-gray-400 md:text-xl">
                {contact?.subheading || "Have an idea? We'd love to hear from you."}
              </p>
            </div>

            {/* CONTACT FORM */}
            <ContactForm />
          </div>

          {/* RIGHT SIDE — SOCIALS */}
          <div className="flex flex-col justify-end">
            <div className="mb-6 md:mb-8 text-right">
              <span className="text-xs font-bold uppercase text-neon-green tracking-widest">
                Socials
              </span>
            </div>
            {socialLinks && <ContactMenu links={socialLinks} />}
          </div>

        </div>
      </div>
    </main>
  );
}

/* ------------------------------------ */
/* CONTACT FORM COMPONENT */
/* ------------------------------------ */

"use client";
import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // For now we just log it
    console.log("Form submitted:", form);

    alert("Message sent! (Demo)");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-neon-green"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-neon-green"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-neon-green"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-neon-green resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-neon-green text-black font-bold py-3 transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
