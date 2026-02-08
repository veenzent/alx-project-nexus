"use client"

export const dynamic = "force-dynamic"

import { Suspense } from "react"
import React from "react"
import CustomizeLink from "@/components/cards/CustomizeLink"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function Page() {
  return (
    // <main className="min-h-screen flex items-center justify-center bg-gray-50">
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Navbar />
      <div className="grow">
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <CustomizeLink />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
