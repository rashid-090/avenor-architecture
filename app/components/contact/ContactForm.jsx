"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";

const CustomFlag = ({ country, countryName }) => {
  const FlagIcon = flags[country];
  return (
    <div className="flex items-center gap-1.5 select-none">
      {FlagIcon ? (
        <FlagIcon title={countryName} className="w-[18px] h-[13px] object-contain" />
      ) : (
        <span className="w-[18px] h-[13px] bg-zinc-200 block" />
      )}
      {country && (
        <span className="text-zinc-500 text-sm font-light ml-1 whitespace-nowrap">
          +{getCountryCallingCode(country)}
        </span>
      )}
    </div>
  );
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    service: false,
    phone: false,
  });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    // Reset toast state after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      service: !formData.service,
      phone: !formData.phone || formData.phone.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.name) {
      showToast("Name is required.", "error");
      return;
    }
    if (newErrors.email) {
      if (!formData.email.trim()) {
        showToast("Email address is required.", "error");
      } else {
        showToast("Please enter a valid email address.", "error");
      }
      return;
    }
    if (newErrors.service) {
      showToast("Please select a service.", "error");
      return;
    }
    if (newErrors.phone) {
      showToast("Phone number is required.", "error");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      const whatsappMessage = `New Contact Form Submission:
*Name:* ${formData.name}
*Email:* ${formData.email}
*Service:* ${formData.service}
*Phone:* ${formData.phone}${formData.message?.trim() ? `\n*Message:* ${formData.message.trim()}` : ""}`;

      const whatsappUrl = `https://wa.me/971506911786?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");

      setStatus("success");
      showToast("Message sent successfully!", "success");
      setFormData({
        name: "",
        email: "",
        service: "",
        phone: "",
        message: "",
      });
      // Reset status back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 800);
  };

  const handlePhoneChange = (val) => {
    setFormData((prev) => ({ ...prev, phone: val || "" }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: false }));
    }
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
            <p className="text-zinc-500 text-sm md:text-[15px] font-light leading-relaxed xl:pr-10">
              Don’t hesitate to get in touch with Avenor if you want to find out
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
                  href="mailto:info@avenorarchitects.com"
                  target="_blank"
                  className="text-zinc-500 hover:text-main font-normal text-sm md:text-lg  w-fit pb-0.5 hover:opacity-80 transition-opacity"
                >
                  	info@avenorarchitects.com
                </a>
                <a
                  href="tel:+971506911786"
                  className="text-zinc-500 hover:text-main font-normal text-sm md:text-lg hover:opacity-80 transition-opacity w-fit"
                >
                  +971 50 6911786
                </a>
              </div>
            </div>

            {/* Scope Of Work address details */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-3">
            Contact
              </span>
              <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
                Dubai - United Arab Emirates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column — Fluted Wood Panel Background & Olive-Bronze Form Card */}
      <div className="relative min-h-[600px] py-5 lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Core Wood Panel Image Backdrop */}
        <Image
          src="/contactbg.webp"
          alt="Walnut wood panels"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          className="object-cover object-center scale-x-[-1] brightness-75"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Olive-Bronze Form Container Card */}
        <div className="relative z-10 w-[90%] md:w-[85%] bg-[#16161666] backdrop-blur-md p-5 md:px-10 md:py-12 shadow-2xl rounded-sm">
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
                Thank you for reaching out to Avenor. Our design directors will contact you shortly to discuss your project.
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
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 ${
                      errors.name 
                        ? "ring-1 ring-red-500 focus:ring-red-500" 
                        : "focus:ring-zinc-300"
                    }`}
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
                    placeholder="e.g. john@youremail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-zinc-950 placeholder-zinc-400 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 ${
                      errors.email 
                        ? "ring-1 ring-red-500 focus:ring-red-500" 
                        : "focus:ring-zinc-300"
                    }`}
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
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-zinc-950 text-sm font-light border-none rounded-none focus:outline-none focus:ring-1 appearance-none cursor-pointer pr-10 ${
                      errors.service 
                        ? "ring-1 ring-red-500 focus:ring-red-500" 
                        : "focus:ring-zinc-300"
                    }`}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Architecture">Architecture</option>
                    <option value="interior-design">Interior design</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="Site Supervision">Site Supervision</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Technical Drawing">Technical Drawing</option>
                    <option value="Scale Model">Scale Model</option>
                    <option value="Interior Fit-Out">Interior Fit-Out</option>
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
                <div className="custom-phone-input-wrapper relative">
                  <PhoneInput
                    placeholder="e.g. +1 200 300 40"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    defaultCountry="AE"
                    flagComponent={CustomFlag}
                    className={`w-full bg-white text-zinc-950 text-sm font-light focus-within:ring-1 custom-phone-input ${
                      errors.phone
                        ? "ring-1 ring-red-500 focus-within:ring-red-500"
                        : "focus-within:ring-zinc-300"
                    }`}
                  />
                </div>
                <style>{`
                  .custom-phone-input {
                    display: flex !important;
                    align-items: center;
                    width: 100%;
                    background-color: white !important;
                    padding: 0.75rem 1rem !important;
                    height: 44px;
                    border-radius: 0px !important;
                  }
                  .custom-phone-input .PhoneInputCountry {
                    margin-right: 0.75rem;
                    display: flex !important;
                    align-items: center !important;
                    width: auto !important;
                    position: relative;
                  }
                  .custom-phone-input .PhoneInputCountryIcon {
                    width: auto !important;
                    height: auto !important;
                    display: flex !important;
                    align-items: center !important;
                    background: transparent !important;
                    box-shadow: none !important;
                    border: none !important;
                  }
                  .custom-phone-input .PhoneInputCountryIconImg {
                    display: none !important;
                  }
                  .custom-phone-input .PhoneInputInput {
                    border: none !important;
                    outline: none !important;
                    background: transparent !important;
                    font-size: 0.875rem !important;
                    font-weight: 300 !important;
                    color: #09090b !important;
                    width: 100%;
                  }
                  .custom-phone-input .PhoneInputCountrySelect {
                    cursor: pointer;
                  }
                `}</style>
              </div>

              {/* Your message field */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-200 uppercase tracking-widest block font-medium">
                  Your message
                </label>
                <textarea
                  name="message"
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
                className="w-full md:w-40 py-3 bg-white text-zinc-950  text-sm  capitalize tracking-widest hover:bg-main hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {status === "sending" ? "sending" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-5 right-8 z-50 flex items-center gap-3 px-5 py-4 border text-sm font-light shadow-2xl transition-all duration-300 transform translate-y-0 animate-fade-in ${
          toast.type === "success"
            ? "bg-zinc-900/95 border-zinc-700 text-white"
            : "bg-red-950/95 border-red-800 text-red-100"
        }`}>
          {/* Toast Icon */}
          {toast.type === "success" ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-emerald-400 shrink-0">
              <path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-red-400 shrink-0">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 6V10M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-up-fade {
          0% {
            transform: translateY(1rem);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: slide-up-fade 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
