"use client";

import React from "react";

export default function Map() {
  return (
    <section className="w-[95%] mx-auto mt-10 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
      <div className="w-full relative h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175397441865!2d-73.9901506!3d40.7513364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259aa597a783f%3A0xe54e3d30b20cb79d!2s7th%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2s!4v1716389201923!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.95)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </section>
  );
}
