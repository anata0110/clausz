
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceCardProps {
  type: "BGL" | "IRENG";
  mode: "buy" | "sell";
  price: number;
  icon: string;
  description: string;
  change?: string;
}

const PriceCard = ({ type, mode, price, icon, description, change }: PriceCardProps) => {
  const isBGL = type === "BGL";
  const isBuy = mode === "buy";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 card-glow cursor-default
        ${isBGL && isBuy
          ? "border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-amber-900/10"
          : !isBGL && isBuy
          ? "border-slate-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/20"
          : isBGL && !isBuy
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/10"
          : "border-teal-500/30 bg-gradient-to-br from-teal-950/40 to-teal-900/10"
        }`}
    >
      {/* Background glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20
          ${isBuy ? (isBGL ? "bg-amber-400" : "bg-slate-400") : (isBGL ? "bg-emerald-400" : "bg-teal-400")}`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {isBuy ? "Harga Beli" : "Harga Jual"} {type}
            </p>
            <h3
              className="font-rajdhani text-2xl font-bold"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {isBuy ? (
                isBGL ? <span className="gold-text">{type}</span> : <span className="text-slate-300">{type}</span>
              ) : (
                isBGL ? <span className="text-emerald-400">{type}</span> : <span className="text-teal-300">{type}</span>
              )}
            </h3>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
              ${isBuy
                ? isBGL ? "bg-amber-500/20 border border-amber-500/30" : "bg-slate-500/20 border border-slate-500/30"
                : isBGL ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-teal-500/20 border border-teal-500/30"
              }`}
          >
            {icon}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">{description}</p>

        <div className="flex items-end gap-2">
          <span
            className={`text-3xl font-bold ${
              isBuy
                ? isBGL ? "gold-text" : "text-slate-200"
                : isBGL ? "text-emerald-400" : "text-teal-300"
            }`}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Rp {price.toLocaleString("id-ID")}
          </span>
          <span className="text-muted-foreground text-sm mb-1">/ 1 item</span>
        </div>

        {change && (
          <div className="flex items-center gap-1 mt-2">
            {isBuy
              ? <TrendingUp className="w-3 h-3 text-green-400" />
              : <TrendingDown className="w-3 h-3 text-emerald-400" />
            }
            <span className={`text-xs ${isBuy ? "text-green-400" : "text-emerald-400"}`}>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCard;
