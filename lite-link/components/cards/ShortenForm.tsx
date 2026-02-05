"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Pointer } from "lucide-react"

type Props = { compact?: boolean }

export default function ShortenForm({ compact = false }: Props) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setError(null)
    setResult(null)
    if (!input) return setError("Please enter a URL")

    try {
      setLoading(true)
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
    <div style={compact ? {} : { padding: "48px 0", width: "100%" }} className="w-full mx-auto">
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 640, margin: compact ? undefined : "0 auto" }}
        className="w-full mx-auto"
      >
        <div
          style={{
            display: "flex",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: 8,
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            gap: 8,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your long link here..."
            // className="w-full outline-none"
            className="flex-1 bg-transparent outline-none px-4 py-2 text-lg text-[#94A3B8] placeholder:text-[#94A3B8]"
            style={{ padding: "0 16px", fontSize: 18, border: "none" }}
          />

          <Button type="submit" disabled={loading} style={{ height: 48 }}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-4" /> Processing
              </span>
            ) : (
              "Shorten URL"
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
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            maxWidth: 600,
            margin: "24px auto 0",
            textAlign: "left",
          }}
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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--muted)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, marginBottom: 20 }}>
            <span style={{ fontFamily: "monospace", fontSize: 18, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{result}</span>
            <div style={{ marginLeft: 12 }}>
              <Button style={{cursor: "pointer"}} variant="default" size="sm" onClick={() => handleCopy(result)}>
                {/* @ts-ignore */}
                {/* <iconify-icon icon="lucide:copy" style={{ marginRight: 8, fontSize: 16 }}></iconify-icon> */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.66659 5.33331H13.3333C14.0691 5.33331 14.6666 5.93076 14.6666 6.66665V13.3333C14.6666 14.0692 14.0691 14.6666 13.3333 14.6666H6.66659C5.9307 14.6666 5.33325 14.0692 5.33325 13.3333V6.66665C5.33325 5.93076 5.9307 5.33331 6.66659 5.33331V5.33331" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66659 10.6666C1.93325 10.6666 1.33325 10.0666 1.33325 9.33331V2.66665C1.33325 1.93331 1.93325 1.33331 2.66659 1.33331H9.33325C10.0666 1.33331 10.6666 1.93331 10.6666 2.66665" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Copy
              </Button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Button variant="outline" onClick={() => alert("Customize - API not configured yet")}> 
              {/* @ts-ignore */}
              <iconify-icon icon="lucide:wand-2" style={{ fontSize: 16, color: "var(--muted-foreground)" }}></iconify-icon>
              Customize
            </Button>
            <Button variant="outline" onClick={() => alert("Generate QR - API not configured yet")}> 
              {/* @ts-ignore */}
              <iconify-icon icon="lucide:qr-code" style={{ fontSize: 16, color: "var(--muted-foreground)" }}></iconify-icon>
              QR Code
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
