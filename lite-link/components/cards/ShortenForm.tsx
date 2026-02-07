"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Pointer } from "lucide-react"
import Link from "next/link"

type Props = { compact?: boolean }

export default function ShortenForm({ compact = false }: Props) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()


  const handleCustomize = () => {
    if (result) {
      const slug = result?.split("/").slice(-1)[0] ?? null
      router.push(`/customize-url?url=${encodeURIComponent(slug)}`)
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setError(null)
    setResult(null)
    if (!input) return setError("Please enter a URL")

    try {
      setLoading(true)
      // if .onrender.com in input, url already shortened
      if (input.includes(".onrender.com")) {
        alert("This URL appears to be already shortened. No need to shorten again!")
        setResult(input)
        return
      }
      const API_BASE_URL = process.env.NEXT_PUBLIC_SHORTEN_API
      const res = await fetch(`${API_BASE_URL}/shorten-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ target_url: input }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }

      const json = await res.json()
      setResult(json.shortened_url || null)
    } catch (err: any) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string | null) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      alert("Copied to clipboard")
    } catch (_) {
      // ignore
    }
  }

  return (
    <div style={compact ? {} : { padding: "24px 0 md:48px 0", width: "100%" }} className="w-full mx-auto px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 640, margin: compact ? undefined : "0 auto" }}
        className="w-full mx-auto"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "6px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            gap: "6px",
          }}
          className="sm:gap-2 sm:p-2 md:gap-2 md:p-2 md:rounded-[24px]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your long link here..."
            className="flex-1 bg-transparent outline-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg text-[#94A3B8] placeholder:text-[#94A3B8] font-normal"
            style={{ border: "none" }}
          />

          <Button 
            type="submit" 
            disabled={loading} 
            className="h-9 sm:h-10 md:h-12 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-3 sm:size-4" /> <span className="hidden sm:inline">Processing</span><span className="sm:hidden">...</span>
              </span>
            ) : (
              <>
                <span className="hidden sm:inline">Shorten URL</span>
                <span className="sm:hidden">Shorten</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            maxWidth: 600,
            margin: "16px auto 0",
            textAlign: "left",
          }}
          className="sm:rounded-[24px] sm:p-6 md:p-6"
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--success)", fontWeight: 500 }}>
              {/* @ts-ignore */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33325 8.00001C1.33325 11.6794 4.32049 14.6667 7.99992 14.6667C11.6794 14.6667 14.6666 11.6794 14.6666 8.00001C14.6666 4.32058 11.6794 1.33334 7.99992 1.33334C4.32049 1.33334 1.33325 4.32058 1.33325 8.00001V8.00001" stroke="#ECFDF5" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 8.00002L7.33333 9.33335L10 6.66669" stroke="#ECFDF5" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Link created successfully!
            </div>
            <button
              onClick={() => setResult(null)}
              aria-label="Close"
              style={{ background: "none", border: "none", padding: 0, color: "var(--muted-foreground)", cursor: "pointer", display: "flex" }}
            >
              {/* @ts-ignore */}
              <iconify-icon icon="lucide:x" style={{ fontSize: 20 }}></iconify-icon>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, marginBottom: 20, gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "monospace", fontSize: "clamp(12px, 3vw, 18px)", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0 }}>{result}</span>
            <div style={{ marginLeft: 0 }}>
              <Button style={{cursor: "pointer"}} variant="default" size="sm" className="h-8 px-2 sm:px-3 text-xs sm:text-sm" onClick={() => handleCopy(result)}>
                {/* @ts-ignore */}
                {/* <iconify-icon icon="lucide:copy" style={{ marginRight: 8, fontSize: 16 }}></iconify-icon> */}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.66659 5.33331H13.3333C14.0691 5.33331 14.6666 5.93076 14.6666 6.66665V13.3333C14.6666 14.0692 14.0691 14.6666 13.3333 14.6666H6.66659C5.9307 14.6666 5.33325 14.0692 5.33325 13.3333V6.66665C5.33325 5.93076 5.9307 5.33331 6.66659 5.33331V5.33331" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66659 10.6666C1.93325 10.6666 1.33325 10.0666 1.33325 9.33331V2.66665C1.33325 1.93331 1.93325 1.33331 2.66659 1.33331H9.33325C10.0666 1.33331 10.6666 1.93331 10.6666 2.66665" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </Button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, rowGap: 8 }} className="sm:gap-3 md:gap-3">
            <Button asChild variant="outline" onClick={handleCustomize} className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"> 
              <Link href={`/customize-url?url=${encodeURIComponent(result ?? "")}`}>
                {/* @ts-ignore */}
                <iconify-icon icon="lucide:wand-2" style={{ fontSize: 16, color: "var(--muted-foreground)" }}></iconify-icon>
                <span className="hidden sm:inline">Customize</span>
              </Link>
            </Button>
            <Button variant="outline" onClick={() => alert("Generate QR - API not configured yet")} className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"> 
              {/* @ts-ignore */}
              <iconify-icon icon="lucide:qr-code" style={{ fontSize: 16, color: "var(--muted-foreground)" }}></iconify-icon>
              <span className="hidden sm:inline">QR Code</span>
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginTop: 12 }}>{error}</p>
      )}
    </div>
  )
}
