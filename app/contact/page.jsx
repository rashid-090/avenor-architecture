import React from "react";
import ContactForm from "../components/contact/ContactForm";
import Map from "../components/contact/Map";

export const metadata = {
  title: "Contact Avenor Architects | Book a Design Consultation",
  description: "Contact Avenor Architects to discuss your next construction, interior design, or residential architecture project. Book a free consultation with our design directors.",
  alternates: {
    canonical: "https://avenorarchitects.com/contact",
  },
  openGraph: {
    title: "Contact Avenor Architects | Book a Design Consultation",
    description: "Contact Avenor Architects to discuss your next construction, interior design, or residential architecture project. Book a free consultation with our design directors.",
    url: "https://avenorarchitects.com/contact",
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
