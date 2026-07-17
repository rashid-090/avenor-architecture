import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Map from "../components/contact/Map";

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen flex flex-col">
      <ContactForm />
      <Map />
    </main>
  );
}
