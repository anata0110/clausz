
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  type: "BGL" | "IRENG";
  quantity: number;
  price: number;
  onChange: (qty: number) => void;
  icon: string;
}

const PRESETS = [1, 5, 10, 25, 50, 100];

const QuantitySelector = ({ type, quantity, price, onChange, icon }: QuantitySelectorProps) => {
  const isBGL = type === "BGL";
  const subtotal = quantity * price;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300
        ${isBGL
          ? "border-amber-500/25 bg-gradient-to-br from-amber-950/30 to-transparent"
          : "border-slate-500/25 bg-gradient-to-br from-slate-900/50 to-transparent"
        }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4
            className="font-bold text-lg"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {isBGL ? (
              <span className="gold-text">{type}</span>
            ) : (
              <span className="text-slate-300">{type}</span>
            )}
          </h4>
          <p className="text-xs text-muted-foreground">
            @ Rp {price.toLocaleString("id-ID")} / item
          </p>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200
              ${quantity === preset
                ? isBGL
                  ? "bg-amber-500 text-black"
                  : "bg-slate-400 text-black"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border"
              }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Manual input */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, quantity - 1))}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            border font-bold text-lg
            ${isBGL
              ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/20"
              : "border-slate-500/40 text-slate-400 hover:bg-slate-500/20"
            }`}
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className={`flex-1 text-center rounded-xl border bg-secondary/50 py-2 text-base font-bold
            focus:outline-none focus:ring-2 transition-all duration-200
            ${isBGL
              ? "border-amber-500/30 focus:ring-amber-500/50 text-amber-300"
              : "border-slate-500/30 focus:ring-slate-400/50 text-slate-300"
            }`}
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        />

        <button
          onClick={() => onChange(quantity + 1)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            border font-bold text-lg
            ${isBGL
              ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/20"
              : "border-slate-500/40 text-slate-400 hover:bg-slate-500/20"
            }`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      {quantity > 0 && (
        <div
          className={`mt-3 pt-3 border-t flex justify-between items-center
            ${isBGL ? "border-amber-500/20" : "border-slate-500/20"}`}
        >
          <span className="text-xs text-muted-foreground">Subtotal</span>
          <span
            className={`font-bold text-sm ${isBGL ? "text-amber-400" : "text-slate-300"}`}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
