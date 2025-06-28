"use client";

import { useState } from "react";
import { IconMail, IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EditEmailPage() {
  const [email, setEmail] = useState("sarah@email.com");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFE3EC]/20 to-[#D291BC]/5 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm mx-auto lg:max-w-3xl"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 lg:p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <Link href="/main/profile">
              <motion.div
                whileHover={{ x: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 lg:p-3 rounded-xl hover:bg-[#FFE3EC]/70 text-[#D291BC] transition-all duration-200 shadow-sm"
              >
                <IconArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FFE3EC] to-[#F8BBD9] p-3 lg:p-4 rounded-xl shadow-sm">
                <IconMail className="w-5 h-5 lg:w-6 lg:h-6 text-[#D291BC]" />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#D291BC]">
                Change Email
              </h1>
            </div>
          </div>

          <form className="space-y-6 lg:space-y-8">
            <div>
              <label className="block text-[#D291BC] text-sm lg:text-base font-semibold mb-3">
                New Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3.5 lg:py-4 rounded-xl border-2 border-[#D291BC]/10 focus:border-[#D291BC] focus:ring-2 focus:ring-[#D291BC]/20 transition-all text-[#D291BC] bg-white/60 placeholder-[#D291BC]/40 font-medium text-sm lg:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your new email"
                required
              />
              <p className="mt-3 text-sm lg:text-base text-[#D291BC]/70 leading-relaxed">
                Make sure to enter a valid email address that you have access
                to. A verification email will be sent to your new address.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/main/profile"
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl border-2 border-[#D291BC] text-[#D291BC] font-semibold text-center hover:bg-[#D291BC]/5 transition-all duration-200 shadow-sm text-sm lg:text-base"
              >
                Cancel
              </Link>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 py-2.5 lg:py-3 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-[#D291BC] to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
              >
                Update Email
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
