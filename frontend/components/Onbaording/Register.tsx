"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type RegisterProps = {
  onContinue: () => void;
};

const Register = ({ onContinue }: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleSignUp = () => {
    // Will integrate with Google OAuth
    window.location.href = "http://localhost:8000/auth/google/login";
  };

  const isFormValid =
    formData.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 8;

  const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-6">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-[560px] flex mx-auto px-5 py-6 flex-col w-[560px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-lg p-6"
      >
        {/* Header */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-[#1d1d18] mb-2">
            Create Your Account
          </h1>
          <p className="text-[#686861]">
            Join MenuQR to manage your restaurant effortlessly
          </p>
        </motion.div>

        {/* Google Sign Up */}
        <motion.button
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          onClick={handleGoogleSignUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full border-2 border-[#dfded2] rounded-xl py-3 px-4 mb-2 flex items-center justify-center gap-3 hover:bg-[#f8f7ec] hover:border-[#c9c7b5] transition-colors font-semibold text-[#1d1d18]"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Continue with Google
        </motion.button>

        {/* Divider */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex items-center my-4"
        >
          <div className="flex-1 border-t border-[#dfded2]" />
          <span className="px-3 text-[10px] font-semibold text-[#686861] uppercase tracking-[0.14em]">
            OR SIGN UP WITH EMAIL
          </span>
          <div className="flex-1 border-t border-[#dfded2]" />
        </motion.div>

        {/* Form */}
        <form className="space-y-3 flex-1">
          {/* Name */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Label
              htmlFor="name"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="h-11 rounded-lg border-[#dfded2] text-[#1d1d18] placeholder:text-[#686861] focus-visible:ring-2 focus-visible:ring-[#007b68]/20 focus-visible:border-[#007b68] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#1d1d18]"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Label
              htmlFor="email"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@restaurant.com"
              className="h-11 rounded-lg border-[#dfded2] text-[#1d1d18] placeholder:text-[#686861] focus-visible:ring-2 focus-visible:ring-[#007b68]/20 focus-visible:border-[#007b68] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#1d1d18]"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <Label
              htmlFor="password"
              className="block text-sm font-semibold text-[#1d1d18] mb-2"
            >
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className="h-11 rounded-lg border-[#dfded2] pr-10 text-[#1d1d18] placeholder:text-[#686861] focus-visible:ring-2 focus-visible:ring-[#007b68]/20 focus-visible:border-[#007b68] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#1d1d18]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#686861] hover:text-[#007b68] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
                in +91
              </div>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="h-11 flex-1 rounded-lg border-[#dfded2] text-[#1d1d18] placeholder:text-[#686861] focus-visible:ring-2 focus-visible:ring-[#007b68]/20 focus-visible:border-[#007b68] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#1d1d18]"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            custom={7}
          >
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={onContinue}
                disabled={!isFormValid}
                className="mt-4 h-11 w-full bg-[#007b68] text-white hover:bg-[#006554] group disabled:cursor-not-allowed disabled:bg-[#7aa29d] disabled:text-white/90"
              >
                Sign Up
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>
        </form>

        {/* Login Link */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={8}
          className="text-center text-sm text-[#686861] mt-4"
        >
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#007b68] font-semibold hover:underline"
          >
            Log in
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
