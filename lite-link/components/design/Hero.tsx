"use client"

import React from "react"
import ShortenForm from "@/components/cards/ShortenForm"

export default function Hero() {
  return (
    <section className="w-full items-center py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl text-[#0F1724] font-extrabold leading-tight mb-6">
          Make your links
          <br />
          <span className="text-[#0EA5A4]">short & simple.</span>
        </h1>
        <p className="text-lg text-[#94A3B8] max-w-lg mx-auto">
          The easiest way to shorten URLs, track clicks, and share content
          securely.
        </p>

        <div className="mt-8">
          <ShortenForm compact />
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#0EA5A4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Free forever
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#0EA5A4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            No credit card
          </div>
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#0EA5A4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Secure & private
          </div>
        </div>
      </div>
    </section>
  )
}
