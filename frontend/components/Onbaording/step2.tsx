"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Step2 = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
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

  const isFormValid =
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.pincode.trim() !== "";

  return (
    <div className="w-full h-full flex items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex mx-auto px-5 py-6 flex-col w-[420px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-lg p-6"
      >
        {/* Icon */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="w-12 h-12 rounded-xl bg-[#1d1d18] flex items-center justify-center mb-4"
        >
          <MapPin size={20} className="text-white" />
        </motion.div>

        {/* Header */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-[#1d1d18] mb-1">
            Where Are You Located?
          </h1>
          <p className="text-[#686861]">Help customers find your restaurant</p>
        </motion.div>

        {/* Form */}
        <form className="space-y-4 flex-1">
          {/* Address */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Label
              htmlFor="address"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Address
            </Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your restaurant address"
              className={inputClasses}
            />
          </motion.div>

          {/* City */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Label
              htmlFor="city"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              City
            </Label>
            <Input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={inputClasses}
            />
          </motion.div>

          {/* State */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Label
              htmlFor="state"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              State
            </Label>
            <Input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className={inputClasses}
            />
          </motion.div>

          {/* Pincode */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <Label
              htmlFor="pincode"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Pincode
            </Label>
            <Input
              id="pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className={inputClasses}
            />
          </motion.div>

          {/* Next Button */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                className="mt-2 h-11 w-full bg-[#1d1d18] text-white hover:bg-[#000000] group"
              >
                Next
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
          custom={7}
          className="text-center text-xs text-[#686861] mt-4"
        >
          You can update these details anytime
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Step2;
