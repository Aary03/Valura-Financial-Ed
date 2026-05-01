"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from "lucide-react";
import type { QuizResult } from "@/lib/game/quiz-types";
import ResultsScreen from "@/components/game/quiz/ResultsScreen";

// ── SMS deck ──────────────────────────────────────────────────────────────────

interface SmsCard {
  id: string;
  sender: string;
  time: string;
  body: string;
  bodyAr: string;
  isReal: boolean;
  explanationEn: string;
  explanationAr: string;
  redFlagEn?: string;
  redFlagAr?: string;
}

const SMS_DECK: SmsCard[] = [
  {
    id: "s1", sender: "DEWA-UAE", time: "9:41 AM",
    body: "Your DEWA bill of AED 456.00 is due 15 Feb. Pay at dewa.gov.ae or any DEWA centre. Ref: 9823041.",
    bodyAr: "فاتورة ديوا 456 درهم مستحقة 15 فبراير. ادفع على dewa.gov.ae أو أي مركز ديوا. مرجع: 9823041.",
    isReal: true,
    explanationEn: "Real. Official DEWA sender ID, gov.ae domain, no urgency or threats.",
    explanationAr: "حقيقية. معرّف DEWA الرسمي، نطاق gov.ae، لا ضغط أو تهديد.",
  },
  {
    id: "s2", sender: "+971509123456", time: "2:13 AM",
    body: "URGENT: Your Emirates ID expires in 3 days! Update NOW or face visa cancellation: id-uae-renew.net/verify",
    bodyAr: "عاجل: هويتك تنتهي خلال 3 أيام! حدّثها الآن وإلا ستُلغى تأشيرتك: id-uae-renew.net/verify",
    isReal: false,
    explanationEn: "Fake. ICA and GDRFA handle Emirates ID — never via random numbers at 2 AM.",
    explanationAr: "مزيّفة. هيئة الهوية لا ترسل روابط عبر أرقام عشوائية في الساعة الثانية فجراً.",
    redFlagEn: "Sent at 2 AM · Random number · Fake domain",
    redFlagAr: "أُرسل الساعة 2 ص · رقم عشوائي · نطاق مزيّف",
  },
  {
    id: "s3", sender: "du-UAE", time: "10:05 AM",
    body: "Your du monthly bill of AED 299 is ready. View at my.du.ae or the du app. No action needed if auto-pay is on.",
    bodyAr: "فاتورتك الشهرية من du بقيمة 299 درهم جاهزة. اعرضها على my.du.ae أو التطبيق.",
    isReal: true,
    explanationEn: "Real. Standard billing SMS, official my.du.ae, no click forced.",
    explanationAr: "حقيقية. إشعار فاتورة عادي، الموقع الرسمي my.du.ae، لا إجبار على الضغط.",
  },
  {
    id: "s4", sender: "Prize-AED", time: "11:30 PM",
    body: "🎉 Congratulations! You've won AED 75,000 in the Dubai Shopping Festival lucky draw. Claim within 24 hrs: dsf-prize.info/claim",
    bodyAr: "🎉 تهانينا! فزت بـ 75,000 درهم في سحب مهرجان دبي. استلم خلال 24 ساعة: dsf-prize.info/claim",
    isReal: false,
    explanationEn: "Fake. DSF draws are announced publicly — you can't win one you didn't enter.",
    explanationAr: "مزيّفة. سحوبات DSF تُعلن رسمياً — لا يمكنك الفوز بسحب لم تشترك فيه.",
    redFlagEn: "You didn't enter · Fake sender · 24-hr pressure",
    redFlagAr: "لم تشترك · مرسل مزيّف · ضغط وقتي",
  },
  {
    id: "s5", sender: "ENBD-Alerts", time: "2:31 PM",
    body: "Your Emirates NBD card ending 4821 was charged AED 1,200.00 at Carrefour MOE on 14 Feb, 2:30 PM.",
    bodyAr: "تم خصم 1,200 درهم من بطاقتك ENBD المنتهية بـ 4821 في كارفور MOE في 14 فبراير الساعة 2:30 م.",
    isReal: true,
    explanationEn: "Real. Last 4 digits, merchant, date/time — standard transaction alert, no link.",
    explanationAr: "حقيقية. آخر 4 أرقام، اسم التاجر، التاريخ — إشعار معاملة عادي، بلا رابط.",
  },
  {
    id: "s6", sender: "+447911123456", time: "8:47 AM",
    body: "Your account has been SUSPENDED due to unusual activity. Verify immediately: verify-uae-bank.com",
    bodyAr: "تم تعليق حسابك بسبب نشاط غير اعتيادي. تحقق فوراً: verify-uae-bank.com",
    isReal: false,
    explanationEn: "Fake. A UK number (+44) sending a UAE bank alert is a major red flag.",
    explanationAr: "مزيّفة. رقم بريطاني (+44) يرسل تنبيه بنك إماراتي مثير للشك كبير.",
    redFlagEn: "UK number · No card digits · Fake domain",
    redFlagAr: "رقم UK · لا أرقام بطاقة · نطاق مزيّف",
  },
  {
    id: "s7", sender: "AECB", time: "10:00 AM",
    body: "Your AECB credit report is ready. Download at aecb.gov.ae using UAE Pass. Free service.",
    bodyAr: "تقرير الائتمان AECB جاهز. حمّله على aecb.gov.ae باستخدام UAE Pass. خدمة مجانية.",
    isReal: true,
    explanationEn: "Real. AECB is the official UAE credit bureau. gov.ae + UAE Pass = legitimate.",
    explanationAr: "حقيقية. AECB هو مكتب الائتمان الإماراتي الرسمي. gov.ae + UAE Pass = موثوق.",
  },
  {
    id: "s8", sender: "Investment-Pro", time: "6:15 PM",
    body: "💰 Earn 25% monthly returns GUARANTEED! Send AED 5,000 to get started. WhatsApp: +971501234567",
    bodyAr: "💰 اربح 25% شهرياً مضمون! أرسل 5,000 درهم للبدء. واتساب: +971501234567",
    isReal: false,
    explanationEn: "Fake. 'Guaranteed 25% monthly' is impossible in any regulated market — classic Ponzi.",
    explanationAr: "مزيّفة. '25% شهرياً مضمون' مستحيل — نموذج احتيال بونزي كلاسيكي.",
    redFlagEn: "Impossible returns · WhatsApp only · No company name",
    redFlagAr: "عوائد مستحيلة · واتساب فقط · لا اسم شركة",
  },
  {
    id: "s9", sender: "MoHRE", time: "9:00 AM",
    body: "MoHRE: Your WPS salary of AED 12,500 has been recorded for Feb 2025. For queries: mohre.gov.ae",
    bodyAr: "وزارة الموارد البشرية: تم تسجيل راتبك بنظام WPS بقيمة 12,500 درهم لشهر فبراير. mohre.gov.ae",
    isReal: true,
    explanationEn: "Real. MoHRE WPS notifications are official — gov.ae domain, no link to click.",
    explanationAr: "حقيقية. إشعارات WPS رسمية — نطاق gov.ae، لا رابط يجب الضغط عليه.",
  },
  {
    id: "s10", sender: "+971551998877", time: "3:20 PM",
    body: "Your parcel couldn't be delivered. Pay AED 8 customs fee now: dhl-uae-delivery.info/pay or it will be returned.",
    bodyAr: "تعذر تسليم طردك. ادفع 8 دراهم رسوم جمارك: dhl-uae-delivery.info/pay وإلا سيُعاد.",
    isReal: false,
    explanationEn: "Fake. DHL never requests customs fees via SMS from random numbers.",
    explanationAr: "مزيّفة. DHL لا تطلب رسوم جمارك عبر SMS من أرقام عشوائية.",
    redFlagEn: "Random number · Fake domain · Tiny fee to seem legit",
    redFlagAr: "رقم عشوائي · نطاق مزيّف · رسوم صغيرة لتبدو حقيقية",
  },
];

// ── Badge ─────────────────────────────────────────────────────────────────────

function ScamBadge({ score, total, locale }: { score: number; total: number; locale: string }) {
  const isAr = locale === "ar";
  const pct  = score / total;
  const tier = pct === 1 ? "gold" : pct >= 0.7 ? "silver" : "bronze";
  const config = {
    gold:   { label: { en: "Scam Shield",  ar: "درع الاحتيال" }, color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
    silver: { label: { en: "Alert Eye",    ar: "عين يقظة"     }, color: "#64748B", bg: "#F8FAFC", border: "#CBD5E1" },
    bronze: { label: { en: "Stay Sharp",   ar: "كن يقظاً"     }, color: "#C8773A", bg: "#FFF7ED", border: "#FDBA74" },
  }[tier];

  return (
    <motion.div
      className="flex flex-col items-center gap-3 py-5"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
    >
      <div
        className="flex size-20 items-center justify-center rounded-full shadow-lg"
        style={{ background: config.bg, border: `3px solid ${config.border}` }}
      >
        <ShieldCheck className="size-10" style={{ color: config.color }} />
      </div>
      <div className="text-center">
        <p className="font-heading text-lg font-extrabold" style={{ color: config.color }}>
          {config.label[isAr ? "ar" : "en"]}
        </p>
        <p className="font-body text-sm mt-0.5" style={{ color: "#64748B" }}>
          {score}/{total} {isAr ? "صحيح" : "correct"}
        </p>
      </div>
    </motion.div>
  );
}

// ── ScamSpotter ────────────────────────────────────────────────────────────────

interface ScamSpotterProps {
  locale: string;
  onComplete: (result: QuizResult) => void;
}

type Phase = "question" | "revealed" | "done";

export default function ScamSpotter({ locale, onComplete }: ScamSpotterProps) {
  const isAr = locale === "ar";
  const [index, setIndex]   = useState(0);
  const [phase, setPhase]   = useState<Phase>("question");
  const [chosen, setChosen] = useState<boolean | null>(null);
  const [score, setScore]   = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const card = SMS_DECK[index];

  function handleAnswer(answer: boolean) {
    if (phase !== "question") return;
    const correct = answer === card.isReal;
    if (correct) setScore((s) => s + 1);
    setChosen(answer);
    setPhase("revealed");
  }

  function handleNext() {
    const finalScore = score; // already tallied on tap
    if (index + 1 >= SMS_DECK.length) {
      const r: QuizResult = {
        score: finalScore,
        total: SMS_DECK.length,
        xpEarned: finalScore * 18,
        coinsEarned: finalScore * 6,
      };
      setResult(r);
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
      setPhase("question");
      setChosen(null);
    }
  }

  if (phase === "done" && result) {
    return (
      <div className="flex flex-col">
        <div className="px-5 pb-2">
          <ScamBadge score={result.score} total={result.total} locale={locale} />
          <p className="text-center font-body text-xs px-4 mb-4" style={{ color: "#64748B" }}>
            {isAr
              ? "تذكّر: الجهات الرسمية لن تطلب أبداً رابطاً أو دفعة عبر SMS."
              : "Remember: official bodies never ask you to click a link or pay via SMS."}
          </p>
        </div>
        <div className="px-5 pb-4">
          <ResultsScreen result={result} locale={locale} onComplete={() => onComplete(result)} />
        </div>
      </div>
    );
  }

  const isCorrect   = chosen === card.isReal;
  const progressPct = (index / SMS_DECK.length) * 100;
  const scoreColor  = score > index * 0.6 ? "#059669" : "#64748B";

  return (
    <div className="flex flex-col" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Header band ─────────────────────────────────────────────── */}
      <div
        className="px-5 pt-4 pb-3"
        style={{ background: "linear-gradient(135deg, #00111B 0%, #0A2640 100%)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4" style={{ color: "#FBBF24" }} />
            <p className="font-heading text-sm font-bold" style={{ color: "#FFFFFC" }}>
              {isAr ? "حارس النصب" : "Scam Sentinel"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-[11px] tabular-nums" style={{ color: "#B4E3C8" }}>
              {score} ✓
            </span>
            <span className="font-body text-[11px]" style={{ color: "#64748B" }}>
              {index + 1}/{SMS_DECK.length}
            </span>
          </div>
        </div>
        {/* Progress dots */}
        <div className="flex gap-1">
          {SMS_DECK.map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{
                background: i < index
                  ? "#05A049"
                  : i === index
                    ? "#B4E3C8"
                    : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        {/* ── Phone-style SMS card ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: isAr ? -40 : 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isAr ? 40 : -40, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Phone frame */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl mb-4"
              style={{
                background: "#1C1C1E",
                border: phase === "revealed"
                  ? `2px solid ${isCorrect ? "#05A049" : "#C0312B"}`
                  : "2px solid transparent",
              }}
            >
              {/* Status bar mock */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ background: "#2C2C2E" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex size-7 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: card.isReal ? "#059669" : "#374151", color: "#FFFFFC" }}
                  >
                    {card.sender.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-[11px] font-bold" style={{ color: "#FFFFFC" }}>
                      {card.sender}
                    </p>
                    <p className="font-body text-[9px]" style={{ color: "#6B7280" }}>SMS · {card.time}</p>
                  </div>
                </div>
                {phase === "revealed" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  >
                    {isCorrect
                      ? <CheckCircle2 className="size-5" style={{ color: "#05A049" }} />
                      : <XCircle className="size-5" style={{ color: "#C0312B" }} />
                    }
                  </motion.div>
                )}
              </div>

              {/* Message bubble */}
              <div className="px-4 py-3">
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]"
                  style={{ background: "#374151" }}
                >
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#F3F4F6", lineHeight: 1.6 }}>
                    {isAr ? card.bodyAr : card.body}
                  </p>
                </div>
              </div>

              {/* Red-flag strip (visible after reveal for fakes) */}
              <AnimatePresence>
                {phase === "revealed" && !card.isReal && (card.redFlagEn || card.redFlagAr) && (
                  <motion.div
                    className="px-4 pb-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2"
                      style={{ background: "rgba(192,49,43,0.15)", border: "1px solid rgba(192,49,43,0.3)" }}
                    >
                      <span className="text-xs">🚩</span>
                      <p className="font-body text-[11px]" style={{ color: "#FCA5A5" }}>
                        {isAr ? card.redFlagAr : card.redFlagEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Buttons or explanation ───────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === "question" ? (
            <motion.div
              key="btns"
              className="flex gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {/* Real */}
              <motion.button
                className="flex-1 flex flex-col items-center gap-1.5 rounded-2xl py-4 font-heading text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
                  color: "#059669",
                  border: "1.5px solid #A7F3D0",
                  boxShadow: "0 2px 8px rgba(5,150,105,0.12)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(true)}
              >
                <CheckCircle2 className="size-6" />
                {isAr ? "حقيقي" : "Real"}
              </motion.button>

              {/* Fake */}
              <motion.button
                className="flex-1 flex flex-col items-center gap-1.5 rounded-2xl py-4 font-heading text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
                  color: "#C0312B",
                  border: "1.5px solid #FECACA",
                  boxShadow: "0 2px 8px rgba(192,49,43,0.10)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(false)}
              >
                <XCircle className="size-6" />
                {isAr ? "مزيّف" : "Fake"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="explanation"
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="rounded-2xl px-4 py-3.5"
                style={{
                  background: isCorrect ? "#ECFDF5" : "#FFF1F2",
                  border: `1.5px solid ${isCorrect ? "#A7F3D0" : "#FECACA"}`,
                }}
              >
                <p className="font-heading text-xs font-bold mb-1" style={{ color: isCorrect ? "#059669" : "#C0312B" }}>
                  {isCorrect
                    ? (isAr ? "✓ صحيح!" : "✓ Correct!")
                    : (isAr ? "✗ خطأ" : "✗ Not quite")}
                </p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "#374151" }}>
                  {isAr ? card.explanationAr : card.explanationEn}
                </p>
              </div>

              <motion.button
                className="w-full rounded-2xl py-3.5 font-heading text-sm font-bold"
                style={{ background: "#00111B", color: "#FFFFFC" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
              >
                {index + 1 < SMS_DECK.length
                  ? (isAr ? "التالي ←" : "Next →")
                  : (isAr ? "عرض النتائج" : "See results")}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
