"use client";

import {
  createContext, useContext, useState,
  type ReactNode, type HTMLAttributes,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Context ───────────────────────────────────────────────────────────────────

interface TabsCtx { value: string; onValueChange: (v: string) => void }
const Ctx = createContext<TabsCtx>({ value: "", onValueChange: () => {} });

// ── Tabs root ─────────────────────────────────────────────────────────────────

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children: ReactNode;
}

export function Tabs({ value, defaultValue = "", onValueChange, children, className, ...rest }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active   = value ?? internal;
  const onChange = onValueChange ?? setInternal;
  return (
    <Ctx.Provider value={{ value: active, onValueChange: onChange }}>
      <div className={cn("flex flex-col", className)} {...rest}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

// ── TabsList ──────────────────────────────────────────────────────────────────

export function TabsList({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-0 rounded-2xl p-1",
        "bg-[rgba(0,17,27,0.05)] border border-[rgba(0,17,27,0.07)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── TabsTrigger ───────────────────────────────────────────────────────────────

interface TriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({ value, children, className, ...rest }: TriggerProps) {
  const ctx      = useContext(Ctx);
  const isActive = ctx.value === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative flex-1 rounded-xl py-2 px-2 font-heading text-xs font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05A049]",
        isActive ? "text-[#00111B]" : "text-[#64748B] hover:text-[#475569]",
        className,
      )}
      {...rest}
    >
      {isActive && (
        <motion.span
          layoutId="tab-pill"
          className="absolute inset-0 rounded-xl bg-white shadow-sm"
          style={{ zIndex: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ── TabsContent ───────────────────────────────────────────────────────────────

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function TabsContent({ value, children, className, ...rest }: ContentProps) {
  const { value: active } = useContext(Ctx);
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      className={cn("outline-none", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
