/**
 * Utility functions for the application.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"

export const detectTextDirection = (text: string) => {
  if (!text) return "ltr"

  // A regex to detect Arabic letters
  const arabicPattern = /[\u0600-\u06FF]/

  return arabicPattern.test(text) ? "rtl" : "ltr"
}
