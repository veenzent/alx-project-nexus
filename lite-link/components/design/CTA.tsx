import React from "react"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="w-full py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#0F1724] text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-[#9CA3AF] mb-8">Join 200,000+ users shortening links every day.</p>
          <Button className="bg-white text-[#0F1724]" size="lg">Create a Free Account</Button>
        </div>
      </div>
    </section>
  )
}
