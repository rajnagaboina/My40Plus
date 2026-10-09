"use client";

import QRCode from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";

export function GuestQrCode({ value, label }: { value: string; label: string }) {
  const [source, setSource] = useState("");
  useEffect(() => { QRCode.toDataURL(value, { width: 320, margin: 2, color: { dark: "#24112FFF", light: "#FFFFFFFF" } }).then(setSource); }, [value]);
  return source ? <Image unoptimized className="mx-auto w-56 rounded-2xl bg-white p-3" src={source} alt={label} width={224} height={224} /> : <div className="mx-auto h-56 w-56 animate-pulse rounded-2xl bg-white/70" aria-label="Generating QR code" />;
}
