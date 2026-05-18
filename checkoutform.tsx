
import { useState } from "react";
import { ArrowLeft, Globe, User, Phone, Mail, CreditCard, ChevronDown } from "lucide-react";

interface CheckoutFormProps {
  bglQty: number;
  irengQty: number;
  bglPrice: number;
  irengPrice: number;
  onBack: () => void;
  onSuccess: (data: FormData) => void;
}

export interface FormData {
  ownerWorld: string;
  world: string;
  whatsapp: string;
  email: string;
  payment: string;
}

const PAYMENT_METHODS = [
  { id: "dana", label: "DANA", icon: "💳" },
  { id: "ovo", label: "OVO", icon: "💜" },
  { id: "gopay", label: "GoPay", icon: "💚" },
  { id: "bca", label: "Transfer BCA", icon: "🏦" },
  { id: "bri", label: "Transfer BRI", icon: "🏦" },
  { id: "mandiri", label: "Transfer Mandiri", icon: "🏦" },
];

const CheckoutForm = ({ bglQty, irengQty, bglPrice, irengPrice, onBack, onSuccess }: CheckoutFormProps) => {
  const [form, setForm] = useState<FormData>({
    ownerWorld: "",
    world: "",
    whatsapp: "",
    email: "",
    payment: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [paymentOpen, setPaymentOpen] = useState(false);

  const total = bglQty * bglPrice + irengQty * irengPrice;

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.ownerWorld.trim()) newErrors.ownerWorld = "Owner World wajib diisi";
    if (!form.world.trim()) newErrors.world = "World wajib diisi";
    if (!form.whatsapp.trim()) newErrors.whatsapp = "No. WhatsApp wajib diisi";
    else if (!/^[0-9+]{9,15}$/.test(form.whatsapp.replace(/\s/g, "")))
      newErrors.whatsapp = "Format nomor tidak valid";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
    if (!form.payment) newErrors.payment = "Pilih metode pembayaran";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSuccess(form);
  };

  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === form.payment);

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Kembali ke Toko</span>
      </button>

      <h2
        className="text-2xl font-bold mb-1 gold-text"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        DATA PEMESANAN
      </h2>
      <p className="text-sm text-muted-foreground mb-6">Lengkapi data di bawah untuk melanjutkan pembayaran</p>

      {/* Order Summary */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 mb-6">
        <p
          className="text-xs uppercase tracking-widest text-amber-400/70 mb-3"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Ringkasan Pesanan
        </p>
        <div className="space-y-2">
          {bglQty > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">BGL × {bglQty}</span>
              <span className="text-sm font-semibold text-amber-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Rp {(bglQty * bglPrice).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          {irengQty > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">IRENG × {irengQty}</span>
              <span className="text-sm font-semibold text-slate-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Rp {(irengQty * irengPrice).toLocaleString("id-ID")}
              </span>
            </div>
          )}
          <div className="border-t border-amber-500/20 pt-2 flex justify-between items-center">
            <span className="font-semibold text-sm">Total</span>
            <span
              className="font-bold text-xl gold-text"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Owner World */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Owner World
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nama owner world kamu"
              value={form.ownerWorld}
              onChange={(e) => setForm({ ...form, ownerWorld: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all
                ${errors.ownerWorld ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.ownerWorld && <p className="text-xs text-red-400 mt-1">{errors.ownerWorld}</p>}
        </div>

        {/* World */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            World
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nama world GrowTopia"
              value={form.world}
              onChange={(e) => setForm({ ...form, world: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all
                ${errors.world ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.world && <p className="text-xs text-red-400 mt-1">{errors.world}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            No. WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all
                ${errors.whatsapp ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp}</p>}
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
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all
                ${errors.email ? "border-red-500/50" : "border-border"}`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>

        {/* Payment Method */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Metode Pembayaran
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPaymentOpen(!paymentOpen)}
              className={`w-full flex items-center justify-between pl-4 pr-4 py-3 rounded-xl border bg-secondary/40 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all
                ${errors.payment ? "border-red-500/50" : "border-border"}`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                {selectedPayment ? (
                  <span className="text-foreground">{selectedPayment.label}</span>
                ) : (
                  <span className="text-muted-foreground">Pilih metode pembayaran</span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${paymentOpen ? "rotate-180" : ""}`} />
            </button>

            {paymentOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, payment: method.id });
                      setPaymentOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-amber-500/10
                      ${form.payment === method.id ? "bg-amber-500/10 text-amber-400" : "text-foreground"}`}
                  >
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.payment && <p className="text-xs text-red-400 mt-1">{errors.payment}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl btn-gold text-base mt-6 flex items-center justify-center gap-2"
          style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em" }}
        >
          LANJUT BAYAR &rarr; Rp {total.toLocaleString("id-ID")}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
