import React from "react"

const features = [
  {
    title: "Lightning Fast",
    description:
      "Paste, click, copy. Our infrastructure ensures your links are created instantly and load immediately.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14C3.61375 14.0013 3.26128 13.7801 3.09455 13.4317C2.92783 13.0832 2.97666 12.67 3.22 12.37L13.12 2.17C13.273 1.99346 13.5278 1.94634 13.7337 2.05651C13.9397 2.16668 14.042 2.40478 13.98 2.63L12.06 8.65C11.9451 8.95758 11.9885 9.30197 12.1761 9.57143C12.3637 9.84089 12.6717 10.0011 13 10H20C20.3863 9.99869 20.7387 10.2199 20.9055 10.5683C21.0722 10.9168 21.0233 11.33 20.78 11.63L10.88 21.83C10.7271 22.0066 10.4722 22.0537 10.2663 21.9435C10.0603 21.8333 9.95805 21.5952 10.02 21.37L11.94 15.35C12.0549 15.0424 12.0115 14.698 11.8239 14.4286C11.6363 14.1591 11.3283 13.9989 11 14H4" stroke="#0EA5A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
,
  },
  {
    title: "Secure by Design",
    description:
      "Every link is encrypted with HTTPS. We monitor for spam and malicious content 24/7.",
    // icon: "🔒",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0203 11.67 21.94C7.5 20.5 4 18 4 13V6.00002C4 5.44811 4.44808 5.00002 5 5.00002C7 5.00002 9.5 3.80002 11.24 2.28002C11.6777 1.90609 12.3223 1.90609 12.76 2.28002C14.51 3.81002 17 5.00002 19 5.00002C19.5523 5.00002 20 5.44774 20 6.00002V13" stroke="#0EA5A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="#0EA5A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
,
  },
  {
    title: "Simple Analytics",
    description:
      "See how many people clicked your link. No complex dashboards, just the numbers you need.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21V15M12 21V3M19 21V9" stroke="#0EA5A4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>,
    // icon: "📊",
  },
]

export default function Features() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="card p-6 bg-muted rounded-lg text-[#0F1724]">
              <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mb-4 text-primary text-xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-[#94A3B8]">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
