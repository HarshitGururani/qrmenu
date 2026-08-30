"use client";

import {
  ArrowRight,
  BarChart3,
  CreditCard,
  QrCode,
  Utensils,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface GetStartedProps {
  onGetStarted?: () => void;
}

const GetStarted = ({ onGetStarted }: GetStartedProps) => {
  return (
    <div className="text-neutral-950 w-full h-fit min-h-screen overflow-visible">
      <main className="min-h-[740px] flex mx-auto px-6 py-8 flex-col w-[850px] overflow-hidden">
        <section className="text-center flex flex-col justify-center items-center flex-1 gap-8">
          <div className="relative size-64 bg-[radial-gradient(circle_at_30%_20%,oklch(0.985_0_0),oklch(0.94_0.04_177)_42%,oklch(0.52_0.097_177)_100%)] shadow-[0_24px_70px_-28px_oklch(0.52_0.097_177/.5)] rounded-[48px] flex justify-center items-center">
            <div className="size-3 rounded-full bg-neutral-900/70 absolute left-8 top-8" />
            <div className="size-5 rounded-full bg-neutral-900/30 absolute right-9 bottom-9" />
            <div className="backdrop-blur-sm rounded-4xl bg-white/70 border-neutral-900/15 border-1 border-solid absolute inset-8" />
            <div className="relative size-36 shadow-[0_16px_30px_-12px_oklch(0.55_0.18_35/.65)] rounded-3xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
              <QrCode className="size-20" strokeWidth={1.6} />
              <div className="size-12 shadow-lg rounded-2xl bg-neutral-950 text-white border-white border-4 border-solid flex absolute -right-3 -bottom-3 justify-center items-center">
                <Utensils className="size-5" />
              </div>
            </div>
            <div className="size-11 shadow-md rounded-2xl bg-white border-neutral-200 border-1 border-solid flex absolute -right-1 top-16 justify-center items-center">
              <BarChart3 className="size-5 text-neutral-900" />
            </div>
            <div className="size-11 shadow-md rounded-2xl bg-white border-neutral-200 border-1 border-solid flex absolute -left-2 bottom-16 justify-center items-center">
              <CreditCard className="size-5 text-neutral-900" />
            </div>
          </div>

          <div className="max-w-[500px] flex flex-col gap-4">
            <div className="font-semibold rounded-full bg-neutral-100 text-neutral-900 text-xs leading-4 flex mx-auto px-3 py-1.5 items-center gap-2">
              <span className="size-1.5 rounded-full bg-neutral-900" />
              Everything your restaurant needs
            </div>
            <h1 className="font-bold text-[38px] leading-10 tracking-[-0.64px]">
              All-in-one Restaurant Management
            </h1>
            <p className="text-neutral-500 text-[15px] leading-6">
              POS, QR ordering, table management, staff operations, payments,
              and analytics — connected in one real-time platform.
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center">
          <Button
            onClick={onGetStarted}
            className="font-semibold shadow-[0_12px_24px_-12px_oklch(0.55_0.18_35/.7)] rounded-2xl bg-neutral-900 text-neutral-50 text-base leading-6 w-[550px]  h-10"
          >
            Get Started
            <ArrowRight className="size-5 ml-2" />
          </Button>
          <Link
            href={"/"}
            className="font-semibold pt-4 text-center text-neutral-500 text-[14px] underline"
          >
            I already have an account
          </Link>
        </div>
      </main>
    </div>
  );
};
export default GetStarted;
