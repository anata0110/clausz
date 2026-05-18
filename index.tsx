import { useState } from "react";
import {
  ShoppingCart,
  Phone,
  Shield,
  Zap,
  Star,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import PriceCard from "@/components/PriceCard";
import QuantitySelector from "@/components/QuantitySelector";
import CheckoutForm, { type FormData } from "@/components/CheckoutForm";
import SuccessPage from "@/components/SuccessPage";
import SellForm, { type SellData } from "@/components/SellForm";
import SellSuccessPage from "@/components/SellSuccessPage";

const BGL_BUY_PRICE = 180000;
const IRENG_BUY_PRICE = 95000;
const BGL_SELL_PRICE = 165000; // harga toko beli dari seller
const IRENG_SELL_PRICE = 85000;
const WA_NUMBER = "6281234567890";
// ============================================

type Step =
  | "shop"
  | "buy-checkout"
  | "buy-success"
  | "sell-checkout"
  | "sell-success";

function SectionLabel({
  mode, label, sub,
}: {
  mode: "buy" | "sell";
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest border
        ${mode === "buy"
            ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
            : "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"}`}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {mode === "buy" ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <TrendingUp className="w-4 h-4" />
        )}
        {label}
      </div>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

const Index = () => {
  const [step, setStep] = useState<Step>("shop");

  // BUY state
  const [bglBuyQty, setBglBuyQty] = useState(0);
  const [irengBuyQty, setIrengBuyQty] = useState(0);
  const [buyOrderData, setBuyOrderData] = useState<FormData | null>(null);

  // SELL state
  const [bglSellQty, setBglSellQty] = useState(0);
  const [irengSellQty, setIrengSellQty] = useState(0);
  const [sellData, setSellData] = useState<SellData | null>(null);

  const buyTotal = bglBuyQty * BGL_BUY_PRICE + irengBuyQty * IRENG_BUY_PRICE;
  const sellTotal =
    bglSellQty * BGL_SELL_PRICE + irengSellQty * IRENG_SELL_PRICE;
  const hasBuyItems = bglBuyQty > 0 || irengBuyQty > 0;
  const hasSellItems = bglSellQty > 0 || irengSellQty > 0;

  const handleBuySuccess = (data: FormData) => {
    setBuyOrderData(data);
    setStep("buy-success");
  };

  const handleSellSuccess = (data: SellData) => {
    setSellData(data);
    setStep("sell-success");
  };

  const handleReset = () => {
    setBglBuyQty(0);
    setIrengBuyQty(0);
    setBuyOrderData(null);
    setBglSellQty(0);
    setIrengSellQty(0);
    setSellData(null);
    setStep("shop");
  };

  // --- Full-page steps ---
  if (step === "buy-success" && buyOrderData) {
    return (
      <SuccessPage
        orderData={buyOrderData}
        bglQty={bglBuyQty}
        irengQty={irengBuyQty}
        bglPrice={BGL_BUY_PRICE}
        irengPrice={IRENG_BUY_PRICE}
        waNumber={WA_NUMBER}
        onReset={handleReset}
      />
    );
  }

  if (step === "sell-success" && sellData) {
    return (
      <SellSuccessPage
        sellData={sellData}
        bglQty={bglSellQty}
        irengQty={irengSellQty}
        bglSellPrice={BGL_SELL_PRICE}
        irengSellPrice={IRENG_SELL_PRICE}
        waNumber={WA_NUMBER}
        onReset={handleReset}
      />
    );
  }

  if (step === "buy-checkout") {
    return (
      <div className="min-h-screen grid-pattern">
        <div className="max-w-lg mx-auto px-4 py-8">
          <CheckoutForm
            bglQty={bglBuyQty}
            irengQty={irengBuyQty}
            bglPrice={BGL_BUY_PRICE}
            irengPrice={IRENG_BUY_PRICE}
            onBack={() => setStep("shop")}
            onSuccess={handleBuySuccess}
          />
        </div>
      </div>
    );
  }

  if (step === "sell-checkout") {
    return (
      <div className="min-h-screen grid-pattern">
        <div className="max-w-lg mx-auto px-4 py-8">
          <SellForm
            bglQty={bglSellQty}
            irengQty={irengSellQty}
            bglSellPrice={BGL_SELL_PRICE}
            irengSellPrice={IRENG_SELL_PRICE}
            onBack={() => setStep("shop")}
            onSuccess={handleSellSuccess}
          />
        </div>
      </div>
    );
  }

  // --- SHOP PAGE ---
  return (
    <div className="min-h-screen grid-pattern">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-gold"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #FCD34D)",
              }}
            >
              <Star className="w-5 h-5 text-black" fill="black" />
            </div>
            <div>
              <h1
                className="text-xl font-bold gold-shimmer leading-none"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                MAXX STORE
              </h1>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                GROWTOPIA ITEM STORE
              </p>
            </div>
          </div>
          <a
            href={"https://wa.me/" + WA_NUMBER.replace(/[^0-9]/g, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CS WA</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4">
            <Zap className="w-3 h-3" />
            PROSES CEPAT &amp; TERPERCAYA
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Jual &amp; Beli <span className="gold-text">BGL</span> &amp;{" "}
            <span className="text-slate-300">IRENG</span>
            <br />
            <span className="text-2xl md:text-3xl text-muted-foreground font-normal">
              Harga Terbaik, Proses Instan
            </span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              <span>Terpercaya</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Proses Cepat</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>500+ Transaksi</span>
            </div>
          </div>
        </div>

        {/* ==================== HARGA BUY ==================== */}
        <section
          style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.15s forwards",
          }}
        >
          <SectionLabel
            mode="buy"
            label="HARGA BUY"
            sub="Harga kamu beli dari kami"
          />

          {/* Price cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <PriceCard
              type="BGL"
              mode="buy"
              price={BGL_BUY_PRICE}
              icon="🔵"
              description="Blue Gem Lock — item premium GrowTopia"
              change="Stok tersedia"
            />
            <PriceCard
              type="IRENG"
              mode="buy"
              price={IRENG_BUY_PRICE}
              icon="⚫"
              description="Ireng — item langka GrowTopia"
              change="Stok terbatas"
            />
          </div>

          {/* Qty selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <QuantitySelector
              type="BGL"
              quantity={bglBuyQty}
              price={BGL_BUY_PRICE}
              onChange={setBglBuyQty}
              icon="🔵"
            />
            <QuantitySelector
              type="IRENG"
              quantity={irengBuyQty}
              price={IRENG_BUY_PRICE}
              onChange={setIrengBuyQty}
              icon="⚫"
            />
          </div>

          {/* Cart */}
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-transparent p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <span
                  className="font-bold text-sm"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  KERANJANG BELI
                </span>
              </div>
              {hasBuyItems && (
                <button
                  onClick={() => {
                    setBglBuyQty(0);
                    setIrengBuyQty(0);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hapus semua
                </button>
              )}
            </div>
            {!hasBuyItems ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Pilih jumlah item di atas untuk mulai
              </p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {bglBuyQty > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        BGL &times; {bglBuyQty}
                      </span>
                      <span
                        className="text-amber-400 font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                      >
                        Rp {(bglBuyQty * BGL_BUY_PRICE).toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                  {irengBuyQty > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        IRENG &times; {irengBuyQty}
                      </span>
                      <span
                        className="text-slate-300 font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                      >
                        Rp{" "}
                        {(irengBuyQty * IRENG_BUY_PRICE).toLocaleString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-amber-500/20 pt-3 flex justify-between items-center">
                    <span className="font-bold">TOTAL</span>
                    <span
                      className="text-2xl font-bold gold-text"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      Rp {buyTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setStep("buy-checkout")}
                  className="w-full py-4 rounded-2xl btn-gold flex items-center justify-center gap-2 text-base"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  LANJUT KE PEMESANAN
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* ==================== HARGA SELL ==================== */}
        <section
          style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.3s forwards",
          }}
        >
          <SectionLabel
            mode="sell"
            label="HARGA SELL"
            sub="Harga kami beli dari kamu"
          />

          {/* Price cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <PriceCard
              type="BGL"
              mode="sell"
              price={BGL_SELL_PRICE}
              icon="🔵"
              description="Blue Gem Lock — harga kami beli"
              change="Terima semua"
            />
            <PriceCard
              type="IRENG"
              mode="sell"
              price={IRENG_SELL_PRICE}
              icon="⚫"
              description="Ireng — harga kami beli"
              change="Terima semua"
            />
          </div>

          {/* Qty selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <QuantitySelector
              type="BGL"
              quantity={bglSellQty}
              price={BGL_SELL_PRICE}
              onChange={setBglSellQty}
              icon="🔵"
            />
            <QuantitySelector
              type="IRENG"
              quantity={irengSellQty}
              price={IRENG_SELL_PRICE}
              onChange={setIrengSellQty}
              icon="⚫"
            />
          </div>

          {/* Sell cart */}
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 to-transparent p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span
                  className="font-bold text-sm"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  KERANJANG JUAL
                </span>
              </div>
              {hasSellItems && (
                <button
                  onClick={() => {
                    setBglSellQty(0);
                    setIrengSellQty(0);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hapus semua
                </button>
              )}
            </div>
            {!hasSellItems ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Pilih jumlah item yang ingin dijual
              </p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {bglSellQty > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        BGL &times; {bglSellQty}
                      </span>
                      <span
                        className="text-emerald-400 font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                      >
                        Rp{" "}
                        {(bglSellQty * BGL_SELL_PRICE).toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                  {irengSellQty > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        IRENG &times; {irengSellQty}
                      </span>
                      <span
                        className="text-teal-300 font-semibold"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                      >
                        Rp{" "}
                        {(irengSellQty * IRENG_SELL_PRICE).toLocaleString(
                          "id-ID",
                        )}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-emerald-500/20 pt-3 flex justify-between items-center">
                    <span className="font-bold">TOTAL DITERIMA</span>
                    <span
                      className="text-2xl font-bold text-emerald-400"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      Rp {sellTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setStep("sell-checkout")}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.08em",
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    color: "white",
                    boxShadow: "0 0 15px rgba(16,185,129,0.25)",
                  }}
                >
                  LANJUT JUAL ITEM
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* WA Info */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pb-4">
          <Phone className="w-4 h-4 text-green-400" />
          <span>CS WhatsApp:</span>
          <a
            href={"https://wa.me/" + WA_NUMBER.replace(/[^0-9]/g, "")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 font-medium transition-colors"
          >
            {WA_NUMBER}
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 text-center">
        <p
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          &copy; 2026 MAXX STORE &mdash; Growtopia Item Store &middot; All
          rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;
