"use client"

import React, { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function CustomizeLink() {
    const searchParams = useSearchParams()
    const shortenedUrl = searchParams.get("url")
    const key = shortenedUrl?.split("/").slice(-1)[0] ?? null

    const [slug, setSlug] = useState("")
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle")
    const [isCustomized, setIsCustomized] = useState(false)
    
    useEffect(() => {
        if (key) {
            setSlug(key)
        }
    }, [key])

    const API_BASE_URL = process.env.NEXT_PUBLIC_SHORTEN_API
    const domain = `${API_BASE_URL}/`



  const handleUpdate = async () => {
    if (!slug) return alert("Slug cannot be empty")
    if (!/^[a-zA-Z0-9-]+$/.test(slug)) return alert("Slug can only contain letters, numbers, and dashes")
    if (slug === key) return alert("New slug is the same as the current one")

    try {
      setStatus("saving")
      const response = await fetch(
        `${API_BASE_URL}/${key}?url=${key}&new_address=${slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
    //   if 404 response, show "Original link not found"
      if (response.status === 404) {
        throw new Error("Shortened link not found or already customized")
      }
      if (!response.ok) {
        throw new Error("Failed to update link")
      }
      const data = await response.json()
      const newKey = data.shortened_url.split("/").slice(-1)[0]
      setSlug(newKey)
      setStatus("saved")
      setTimeout(() => setStatus("idle"), 1400)
      setIsCustomized(true)
      alert("Your link has been successfully customized")
    } catch (err: Error | any) {
      setStatus("idle")
      alert(err instanceof Error ? err.message : "An error occurred while updating the link")
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${domain}${slug}`)
      alert("Copied to clipboard")
    } catch (err: Error | any) {
      alert("Unable to copy")
    }
  }

  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <div className="w-full px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md md:max-w-lg bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700">Customize link (optional)</h3>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="px-4 py-6">
            <div className="flex flex-col">
              <div className="flex items-stretch w-full border border-gray-200 rounded-md overflow-hidden bg-white">
                <span className="hidden sm:inline-flex items-center bg-gray-50 text-gray-500 text-sm px-3 py-2 whitespace-nowrap">{domain}</span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
                  placeholder="your-custom-slug"
                  aria-label="Custom slug"
                />
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 border-l border-gray-200"
                  aria-label="Copy full url"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="9" y="9" width="10" height="10" rx="2" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                  </svg>
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">Create a memorable name for your link. Letters, numbers, and dashes only.</p>

              <div className="mt-4">
                <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3">
                  <button
                    onClick={() => alert("Cancel - no changes saved")}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdate}
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md ${
                      status === "saving" || isCustomized ? "bg-teal-400 hover:bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
                    } ${isCustomized ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {status === "saving" ? (
                      <svg className="w-4 h-4 animate-spin mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth={4} />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="white" strokeWidth={4} strokeLinecap="round" />
                      </svg>
                    ) : null}
                    <span>{status === "saved" ? "Updated" : status === "saving" ? "Updating..." : "Update Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
