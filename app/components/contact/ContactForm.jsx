"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        phone: "",
        message: "",
      });
      // Reset status back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen md:mt-20">
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column — Text & Meta Details */}
      <div className="flex flex-col justify-between pt-32 md:pt-16 py-16 lg:py-32 bg-white">
        <div className=" space-y-12">
          {/* Header Description */}
          <div className="space-y-6">
            <h1 className="text-zinc-900 text-4xl md:text-[50px] font-normal leading-[1.1] tracking-tight">
              Get in touch
            </h1>
            <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed">
              Don’t hesitate to get in touch with Avenore if you want to find out
              about design services that incorporate luxurious living and
              timeless interiors.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-10 pt-6">
            {/* Get In Touch links */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
                GET IN TOUCH
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:hello@avenore.com"
                  className="text-zinc-950 font-normal text-sm md:text-base border-b border-zinc-950 w-fit pb-0.5 hover:opacity-80 transition-opacity"
                >
                  hello@avenore.com
                </a>
                <a
                  href="tel:+12030405010"
                  className="text-zinc-950 font-normal text-sm md:text-base hover:opacity-80 transition-opacity w-fit"
                >
                  +1 2030 4050 10
                </a>
              </div>
            </div>

            {/* Scope Of Work address details */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
                SCOPE OF WORK
              </span>
              <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
                New York, Seventh Ave, 20th Floor,<br />
                Floor, NY 10018
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column — Fluted Wood Panel Background & Olive-Bronze Form Card */}
      <div className="relative min-h-[600px] py-5 lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Core Wood Panel Image Backdrop */}
        <Image
          src="https://plus.unsplash.com/premium_photo-1677620678562-5876edb7c126?q=80&w=987&auto=format&fit=crop"
          alt="Walnut wood panels"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Olive-Bronze Form Container Card */}
        <div className="relative z-10 w-[90%] md:w-[85%] bg-[#16161666] backdrop-blur-md px-8 py-10 md:px-10 md:py-12 shadow-2xl rounded-sm">
          {status === "success" ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mx-auto mb-6">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-white text-xl font-normal tracking-wide">
                Message Sent Successfully
              </h3>
              <p className="text-zinc-200 text-xs font-light leading-relaxed max-w-xs mx-auto">
                Thank you for reaching out to Avenore. Our design directors will contact you shortly to discuss your project.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Intro Label */}
              <p className="text-zinc-100 text-xs md:text-sm font-light leading-relaxed mb-8">
                If you have an interesting project or commission you want to
                discuss, please complete the form and we will contact you to
                discuss your project.
              </p>

              {/* Your name field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 focus:ring-zinc-300"
                />
              </div>

              {/* Email address field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@youremail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 focus:ring-zinc-300"
                />
              </div>

              {/* Service Select field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Service
                </label>
                <div className="relative w-full">
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-zinc-950 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 focus:ring-zinc-300 appearance-none cursor-pointer pr-10"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="construction">Construction</option>
                    <option value="interior-design">Interior design</option>
                    <option value="residential-architecture">Residential Architecture</option>
                    <option value="commercial-architecture">Commercial Architecture</option>
                  </select>
                  {/* Select custom arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Phone number field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +1 200 300 40"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 focus:ring-zinc-300"
                />
              </div>

              {/* Your message field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Your message
                </label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  placeholder="Add here"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none resize-none focus:outline-none focus:ring-1 focus:ring-zinc-300"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-24 py-2.5 bg-white text-zinc-950 font-normal text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {status === "sending" ? "..." : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
