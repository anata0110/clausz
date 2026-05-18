import { CheckCircle2, MessageCircle, RefreshCw } from "lucide-react";
import type { SellData } from "./SellForm";

interface SellSuccessPageProps {
  sellData: SellData;
  bglQty: number;
  irengQty: number;
  bglSellPrice: number;
  irengSellPrice: number;
  waNumber: string;
  onReset: () => void;
}

const SellSuccessPage = ({ sellData, bglQty, irengQty, bglSellPrice, irengSellPrice, waNumber, onReset }: SellSuccessPageProps) => {
  const total = bglQty * bglSellPrice + irengQty * irengSellPrice;
  const orderId = "SELL-" + Date.now().toString().slice(-6);

  const lines = [
    "Halo MAXX STORE! Saya ingin jual item:",
    "",
    "Order ID: " + orderId,
    "Nama Pengirim: " + sellData.namaPengirim,
    "No. Tujuan: " + sellData.noTujuan,
    "Email: " + sellData.email,
    bglQty > 0 ? "BGL: " + bglQty + "x" : "",
    irengQty > 0 ? "IRENG: " + irengQty + "x" : "",
    "Total Diterima: Rp " + total.toLocaleString("id-ID"),
    "",
    "Mohon konfirmasi, terima kasih!",
  ].filter((l) => l !== undefined);

  const waMessage = encodeURIComponent(lines.join("\n"));
  const cleanNumber = waNumber.replace(/[^0-9]/g, "");
  const waLink = "https://wa.me/" + cleanNumber + "?text=" + waMessage;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Dots decoration */}
        <div className="relative mb-8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#F59E0B" : "#14B8A6",
                top: (Math.sin((i * 30 * Math.PI) / 180) * 60 + 50).toString() + "%",
                left: (Math.cos((i * 30 * Math.PI) / 180) * 60 + 50).toString() + "%",
                animation: "glow-pulse " + (1 + i * 0.2).toString() + "s ease-in-out infinite",
                opacity: 0.7,
              }}
            />
          ))}
          <div className="relative z-10 flex justify-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center animate-success-pop"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                boxShadow: "0 0 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(16, 185, 129, 0.2)",
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            <span className="text-emerald-400">PESANAN JUAL</span>{" "}
            <span className="gold-text">DITERIMA!</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            Permintaan jual kamu sudah kami terima. Tim kami akan segera menghubungi kamu.
          </p>
        </div>

        {/* Order Card */}
        <div
          className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 text-left mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Detail Penjualan
            </p>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
              {orderId}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nama Pengirim</span>
              <span className="font-medium">{sellData.namaPengirim}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">No. Tujuan</span>
              <span className="font-medium">{sellData.noTujuan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{sellData.email}</span>
            </div>
            {bglQty > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">BGL</span>
                <span className="font-medium text-emerald-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {bglQty}x &middot; Rp {(bglQty * bglSellPrice).toLocaleString("id-ID")}
                </span>
              </div>
            )}
            {irengQty > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">IRENG</span>
                <span className="font-medium text-teal-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {irengQty}x &middot; Rp {(irengQty * irengSellPrice).toLocaleString("id-ID")}
                </span>
              </div>
            )}
            <div className="border-t border-emerald-500/20 pt-2 flex justify-between items-center">
              <span className="font-semibold">Total Diterima</span>
              <span
                className="font-bold text-xl text-emerald-400"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "white",
              boxShadow: "0 0 20px rgba(37, 211, 102, 0.3)",
              display: "flex",
            }}
          >
            <MessageCircle className="w-5 h-5" />
            KONFIRMASI VIA WHATSAPP
          </a>

          <button
            onClick={onReset}
            className="w-full py-3 rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}
          >
            <RefreshCw className="w-4 h-4" />
            KEMBALI KE TOKO
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellSuccessPage;
