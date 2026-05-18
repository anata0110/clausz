import { useState } from "react";
import { ArrowLeft, Hash, User, Mail } from "lucide-react";

interface SellFormProps {
  bglQty: number;
  irengQty: number;
  bglSellPrice: number;
  irengSellPrice: number;
  onBack: () => void;
  onSuccess: (data: SellData) => void;
}

export interface SellData {
  noTujuan: string;
  namaPengirim: string;
  email: string;
}

const SellForm = ({ bglQty, irengQty, bglSellPrice, irengSellPrice, onBack, onSuccess }: SellFormProps) => {
  const [form, setForm] = useState<SellData>({ noTujuan: "", namaPengirim: "", email: "" });
  const [errors, setErrors] = useState<Partial<SellData>>({});

  const total = bglQty * bglSellPrice + irengQty * irengSellPrice;

  const validate = () => {
    const newErrors: Partial<SellData> = {};
    if (!form.noTujuan.trim()) newErrors.noTujuan = "No Tujuan wajib diisi";
    if (!form.namaPengirim.trim()) newErrors.namaPengirim = "Nama Pengirim wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSuccess(form);
  };

  return (
    <div className="animate-fade-in-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Kembali ke Toko</span>
      </button>

      <h2
        className="text-2xl font-bold mb-1 text-emerald-400"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        DATA PENJUALAN
      </h2>
      <p className="text-sm text-muted-foreground mb-6">Lengkapi data di bawah untuk proses jual item kamu</p>

      {/* Summary */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 mb-6">
        <p
          className="text-xs uppercase tracking-widest text-emerald-400/70 mb-3"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Ringkasan Item Dijual
        </p>
        <div className="space-y-2">
          {bglQty > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">BGL &times; {bglQty}</span>
              <span className="text-sm font-semibold text-emerald-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Rp {(bglQty * bglSellPrice).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          {irengQty > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">IRENG &times; {irengQty}</span>
              <span className="text-sm font-semibold text-teal-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Rp {(irengQty * irengSellPrice).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="border-t border-emerald-500/20 pt-2 flex justify-between items-center">
            <span className="font-semibold text-sm">Total Diterima</span>
            <span
              className="font-bold text-xl text-emerald-400"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* No Tujuan */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            No. Tujuan
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="No rekening / akun tujuan"
              value={form.noTujuan}
              onChange={(e) => setForm({ ...form, noTujuan: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all
                ${errors.noTujuan ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.noTujuan && <p className="text-xs text-red-400 mt-1">{errors.noTujuan}</p>}
        </div>

        {/* Nama Pengirim */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Nama Pengirim
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nama lengkap kamu"
              value={form.namaPengirim}
              onChange={(e) => setForm({ ...form, namaPengirim: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all
                ${errors.namaPengirim ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.namaPengirim && <p className="text-xs text-red-400 mt-1">{errors.namaPengirim}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="email@kamu.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all
                ${errors.email ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-base mt-6 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "0.08em",
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "white",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
          }}
        >
          JUAL SEKARANG &rarr; Rp {total.toLocaleString("id-ID")}
        </button>
      </form>
    </div>
  );
};

export default SellForm;
