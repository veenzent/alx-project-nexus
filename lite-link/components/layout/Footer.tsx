export default function Footer() {
    return (
        <footer
            style={{
                padding: "64px 0 32px",
                borderTop: "1px solid var(--border)",
            }}
        >
            <div className="container">
                <div className="flex flex-col items-center">
                    <div
                        className="flex items-center gap-2"
                        style={{ marginBottom: 24, opacity: 0.5 }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 24,
                                background: "var(--foreground)",
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* @ts-ignore */}
                            {/* <iconify-icon
                                icon="lucide:link-2"
                                style={{ color: "white", fontSize: 14 }}
                            ></iconify-icon> */}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.25002 9.91671H4.08335C2.4736 9.91671 1.16669 8.60979 1.16669 7.00004C1.16669 5.39029 2.4736 4.08337 4.08335 4.08337H5.25002M8.75002 4.08337H9.91669C11.5264 4.08337 12.8334 5.39029 12.8334 7.00004C12.8334 8.60979 11.5264 9.91671 9.91669 9.91671H8.75002M4.66669 7.00004H9.33335" stroke="white" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </div>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>
                            LiteLink
                        </span>
                    </div>

                    <div className="flex gap-8" style={{ marginBottom: 48 }}>
                        <a
                            href="#"
                            style={{
                                color: "var(--muted-foreground)",
                                fontSize: 14,
                            }}
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            style={{
                                color: "var(--muted-foreground)",
                                fontSize: 14,
                            }}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            style={{
                                color: "var(--muted-foreground)",
                                fontSize: 14,
                            }}
                        >
                            Report Abuse
                        </a>
                        <a
                            href="#"
                            style={{
                                color: "var(--muted-foreground)",
                                fontSize: 14,
                            }}
                        >
                            Contact Us
                        </a>
                    </div>

                    <p style={{ color: "#9ca3af", fontSize: 13 }}>
                        © 2024 LiteLink Inc. Simple URLs for everyone.
                    </p>
                </div>
            </div>
        </footer>
    );
}
