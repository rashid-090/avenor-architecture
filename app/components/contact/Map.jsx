"use client";

import React from "react";

export default function Map() {
  return (
    <section className="w-[95%] mx-auto my-10 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
      <div className="w-full relative h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41124.79178976498!2d55.28124719215913!3d25.196625980786322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sDubai%20Mall!5e0!3m2!1sen!2sin!4v1784701431174!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 duration-500 transition-all"
        ></iframe>
      </div>
    </section>
  );
}
