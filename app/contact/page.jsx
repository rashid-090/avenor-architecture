import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Map from "../components/contact/Map";

export const metadata = {
  title: "Contact Avenore Architecture | Book a Design Consultation",
  description: "Contact Avenore Architecture to discuss your next construction, interior design, or residential architecture project. Book a free consultation with our design directors.",
  alternates: {
    canonical: "https://avenore.com/contact",
  },
  openGraph: {
    title: "Contact Avenore Architecture | Book a Design Consultation",
    description: "Contact Avenore Architecture to discuss your next construction, interior design, or residential architecture project. Book a free consultation with our design directors.",
    url: "https://avenore.com/contact",
    type: "website",
  }
};

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen flex flex-col">
      <ContactForm />
      <Map />
    </main>
  );
}
