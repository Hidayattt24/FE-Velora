"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: {
    month: string;
    day: string;
    year: string;
  };
  onChange: (date: { month: string; day: string; year: string }) => void;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Pilih tanggal",
  error,
  className
}: DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Mendapatkan tahun saat ini
  const currentYear = new Date().getFullYear();
  
  // Tanggal untuk date picker
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return date.toLocaleString('id-ID', { month: 'long' });
  });

  // Fungsi untuk mendapatkan jumlah hari dalam bulan
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Mendapatkan jumlah hari berdasarkan bulan dan tahun yang dipilih
  const selectedMonth = value.month ? parseInt(value.month) : 1;
  const selectedYear = value.year ? parseInt(value.year) : currentYear;
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Generate 100 tahun ke belakang dari tahun saat ini
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Memastikan tanggal valid saat pergantian bulan/tahun
  useEffect(() => {
    if (value.day && value.month && value.year) {
      const maxDays = getDaysInMonth(parseInt(value.month), parseInt(value.year));
      if (parseInt(value.day) > maxDays) {
        onChange({ ...value, day: maxDays.toString() });
      }
    }
  }, [value.month, value.year]);

  return (
    <div className={cn("relative", className)} ref={datePickerRef}>
      <label className="block text-sm font-medium text-[#C86B85] mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="w-full px-4 py-3 rounded-xl border border-[#C86B85]/20 hover:border-[#C86B85] focus:outline-none transition-colors text-left flex items-center justify-between"
      >
        <span className={value.day ? "text-[#C86B85]" : "text-[#C86B85]/60"}>
          {value.day 
            ? `${value.day} ${months[parseInt(value.month) - 1]} ${value.year}`
            : placeholder}
        </span>
        <IconCalendarEvent className="w-5 h-5 text-[#C86B85]/60" />
      </button>

      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-[#C86B85]/10 p-4 z-50"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-[#C86B85]/60">Bulan</label>
                <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C86B85]/20 scrollbar-track-transparent">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => onChange({ ...value, month: (index + 1).toString() })}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg transition-colors",
                        value.month === (index + 1).toString()
                          ? "bg-[#FFE3EC] text-[#C86B85]"
                          : "hover:bg-[#FFE3EC]/50 text-[#C86B85]/80"
                      )}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#C86B85]/60">Tanggal</label>
                <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C86B85]/20 scrollbar-track-transparent">
                  {days.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => onChange({ ...value, day: day.toString() })}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg transition-colors",
                        value.day === day.toString()
                          ? "bg-[#FFE3EC] text-[#C86B85]"
                          : "hover:bg-[#FFE3EC]/50 text-[#C86B85]/80"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#C86B85]/60">Tahun</label>
                <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#C86B85]/20 scrollbar-track-transparent">
                  {years.map(year => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onChange({ ...value, year: year.toString() })}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg transition-colors",
                        value.year === year.toString()
                          ? "bg-[#FFE3EC] text-[#C86B85]"
                          : "hover:bg-[#FFE3EC]/50 text-[#C86B85]/80"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 