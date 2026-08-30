import {
  ArrowUpRight,
  BarChart3,
  LayoutDashboard,
  QrCode,
  ReceiptText,
  Utensils,
  type LucideIcon,
} from "lucide-react";

function MockupBox({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`
        relative flex items-center justify-center
        overflow-hidden rounded-[18px]
        border border-black/8
        bg-black/2.5
        ${className}
      `}
    >
      {children || (
        <span className="px-3 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-black/30">
          {label}
        </span>
      )}
    </div>
  );
}

function FeaturePill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-black/[0.07] bg-black/[0.025] px-3 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
        <Icon size={15} strokeWidth={1.8} className="text-neutral-700" />
      </div>

      <span className="text-[11px] font-medium text-neutral-600">{label}</span>
    </div>
  );
}

function OrderRow({
  table,
  amount,
  status,
  time,
}: {
  table: string;
  amount: string;
  status: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur-sm">
      <div>
        <p className="text-[12px] font-semibold text-white">Table {table}</p>
        <p className="mt-0.5 text-[10px] text-white/50">{time}</p>
      </div>

      <div className="text-right">
        <p className="text-[12px] font-semibold text-white">{amount}</p>
        <p className="mt-0.5 text-[10px] text-emerald-200">{status}</p>
      </div>
    </div>
  );
}

export default function RestaurantSystemShowcase() {
  return (
    <section className="mx-auto mt-32 w-full max-w-[1210px] px-5 sm:px-6 lg:px-0">
      {/* Heading */}
      <div className="mb-7">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#007b68]">
          One connected system
        </p>

        <h2 className="max-w-[620px] text-[28px] font-semibold leading-[1.12] tracking-[-0.035em] text-neutral-900 sm:text-[34px]">
          Everything your restaurant needs,
          <br className="hidden sm:block" /> working together.
        </h2>
      </div>

      <div className="showcase-parent">
        {/* Main POS card */}
        <div className="showcase-div1 group relative overflow-hidden rounded-[24px] bg-[#087c69] p-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-7">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />

          <div className="relative z-10 grid h-full gap-7 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <ReceiptText size={18} />
                </div>

                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
                  POS & live orders
                </h3>

                <p className="mt-3 max-w-[300px] text-[13px] leading-6 text-white/65">
                  Manage dine-in orders, QR orders, tables and payments from one
                  real-time workspace.
                </p>
              </div>

              <button className="mt-8 flex w-fit items-center gap-2 text-[12px] font-medium text-white/85">
                Explore POS
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-[#0a6f60] p-4 shadow-2xl shadow-black/10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Live orders
                  </p>
                  <p className="mt-1 text-[13px] font-medium">Downtown Café</p>
                </div>

                <div className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-[9px] text-emerald-100">
                  12 open
                </div>
              </div>

              <div className="space-y-2.5">
                <OrderRow
                  table="12"
                  amount="₹1,240"
                  status="New order"
                  time="20 sec ago"
                />

                <OrderRow
                  table="08"
                  amount="₹2,180"
                  status="Preparing"
                  time="4 min ago"
                />

                <OrderRow
                  table="03"
                  amount="₹760"
                  status="Ready"
                  time="Just now"
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Ordering */}
        <div className="showcase-div2 group flex flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">
          <div className="flex min-h-[310px] flex-1 items-center justify-center rounded-[20px] bg-[#f4f3ec]">
            <div className="w-[150px] rounded-[28px] border-[6px] border-neutral-900 bg-white p-2 shadow-xl">
              <div className="overflow-hidden rounded-[18px]">
                <div className="flex h-28 items-center justify-center bg-[#0b806d] text-white">
                  <QrCode size={38} strokeWidth={1.4} />
                </div>

                <div className="space-y-2 p-3">
                  <div className="h-2.5 w-[80%] rounded-full bg-black/10" />
                  <div className="h-2 w-[60%] rounded-full bg-black/[0.06]" />

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-14 rounded-lg bg-[#f3eee3]" />
                    <div className="h-14 rounded-lg bg-[#f3eee3]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7f4]">
              <QrCode size={17} className="text-[#007b68]" />
            </div>

            <h3 className="text-[16px] font-semibold tracking-tight text-neutral-900">
              QR ordering
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-neutral-500">
              Guests scan, browse and order directly from their table without
              waiting for staff.
            </p>
          </div>
        </div>

        {/* Tables */}
        <div className="showcase-div4 group overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">
          <div className="grid grid-cols-2 gap-2">
            <FeaturePill icon={Utensils} label="Table 01" />
            <FeaturePill icon={Utensils} label="Table 02" />
            <FeaturePill icon={QrCode} label="QR active" />
            <FeaturePill icon={ReceiptText} label="Bill open" />
          </div>

          <div className="mt-5">
            <h3 className="text-[16px] font-semibold tracking-tight text-neutral-900">
              Tables & QR
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-neutral-500">
              Track table activity, QR sessions and running orders from one
              place.
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="showcase-div5 group overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400">
                Today's sales
              </p>

              <p className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-neutral-900">
                ₹42,860
              </p>
            </div>

            <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
              +18.4%
            </div>
          </div>

          <div className="flex h-[120px] items-end gap-2 rounded-[18px] bg-[#f7f6f1] px-4 pb-4 pt-6">
            {[42, 62, 48, 76, 58, 88, 72, 96].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-md bg-[#0b806d]/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <BarChart3 size={16} className="text-[#007b68]" />

            <h3 className="text-[16px] font-semibold tracking-tight text-neutral-900">
              Sales & insights
            </h3>
          </div>

          <p className="mt-2 text-[13px] leading-5 text-neutral-500">
            Understand revenue, order volume and restaurant performance at a
            glance.
          </p>
        </div>

        {/* Explore */}
        <div className="showcase-div7 group flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#171713] p-5 text-white transition-transform duration-300 hover:-translate-y-1">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <LayoutDashboard size={18} strokeWidth={1.6} />
            </div>

            <h3 className="text-[16px] font-semibold">
              Built for every workflow
            </h3>

            <p className="mt-2 max-w-[260px] text-[13px] leading-5 text-white/55">
              Kitchen display, payments, staff permissions, reports and
              multi-location management.
            </p>
          </div>

          <button className="mt-5 flex items-center gap-2 text-[12px] font-medium text-white/85">
            Explore all features
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .showcase-parent {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-template-rows: repeat(10, minmax(58px, 1fr));
          gap: 16px;
        }

        .showcase-div1 {
          grid-column: span 4 / span 4;
          grid-row: span 6 / span 6;
        }

        .showcase-div2 {
          grid-column: span 2 / span 2;
          grid-column-start: 5;
          grid-row: span 7 / span 7;
        }

        .showcase-div4 {
          grid-column: span 2 / span 2;
          grid-row: span 4 / span 4;
          grid-row-start: 7;
        }

        .showcase-div5 {
          grid-column: span 2 / span 2;
          grid-column-start: 3;
          grid-row: span 4 / span 4;
          grid-row-start: 7;
        }

        .showcase-div7 {
          grid-column: span 2 / span 2;
          grid-column-start: 5;
          grid-row: span 3 / span 3;
          grid-row-start: 8;
        }

        @media (max-width: 900px) {
          .showcase-parent {
            display: flex;
            flex-direction: column;
          }

          .showcase-div1,
          .showcase-div2,
          .showcase-div4,
          .showcase-div5,
          .showcase-div7 {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
