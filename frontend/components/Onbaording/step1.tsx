"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Link2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Step1Props = {
  onBack: () => void;
};

const Step1 = ({ onBack }: Step1Props) => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantSlug: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
    }),
  };

  const inputClasses =
    "h-11 rounded-lg border-[#dfded2] bg-[#f8f7ec] text-[#1d1d18] placeholder:text-[#a3a293] focus-visible:ring-2 focus-visible:ring-[#007b68]/20 focus-visible:border-[#007b68] focus-visible:bg-white transition-colors [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#1d1d18]";

  return (
    <div className="w-full h-full flex items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex mx-auto px-5 py-6 flex-col w-[550px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-lg p-6"
      >
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-medium text-[#686861] transition-colors hover:text-[#1d1d18]"
            >
              Back
            </button>
            <span className="text-sm font-medium text-[#686861]">
              Step 1 of 3
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-[#007b68]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#ecebe0]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#ecebe0]" />
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="w-12 h-12 rounded-xl bg-[#1d1d18] flex items-center justify-center mb-4"
        >
          <Sparkles size={20} className="text-white" />
        </motion.div>

        {/* Header */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-[#1d1d18] mb-1">
            Set Up Your Restaurant
          </h1>
          <p className="text-[#686861]">Tell us about your restaurant</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-4 flex-1">
          {/* Restaurant Name */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Label
              htmlFor="restaurantName"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Restaurant Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="restaurantName"
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="e.g. The Garden Bistro"
              className={inputClasses}
            />
          </motion.div>

          {/* Restaurant Slug */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Label
              htmlFor="restaurantSlug"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Restaurant Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="restaurantSlug"
              type="text"
              name="restaurantSlug"
              value={formData.restaurantSlug}
              onChange={handleChange}
              placeholder="your-restaurant"
              className={inputClasses}
            />
            <p className="flex items-center gap-1.5 text-xs text-[#686861] mt-2">
              Your menu will be available at
            </p>
            <p className="flex items-center gap-1.5 text-xs text-[#007b68] font-medium mt-0.5">
              <Link2 size={12} />
              menuqr.app/{formData.restaurantSlug || "your-restaurant"}
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <Label
              htmlFor="email"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Email{" "}
              <span className="text-xs font-normal text-[#686861]">
                (optional)
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@restaurant.com"
              className={inputClasses}
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            <Label
              htmlFor="phone"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Phone{" "}
              <span className="text-xs font-normal text-[#686861]">
                (optional)
              </span>
            </Label>
            <div className="flex gap-2">
              <div className="flex h-11 items-center rounded-lg border border-[#dfded2] bg-[#f8f7ec] px-3 text-sm text-[#686861] font-medium">
                +91
              </div>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=""
                className={`flex-1 ${inputClasses}`}
              />
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={7}
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                className="mt-2 h-11 w-full bg-[#1d1d18] text-white hover:bg-[#000000] group"
              >
                Continue
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>
        </form>

        {/* Footer note */}
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={8}
          className="text-center text-xs text-[#686861] mt-4"
        >
          You can update these details anytime
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Step1;
