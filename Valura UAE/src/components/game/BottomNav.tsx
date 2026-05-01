"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Users, Users2, ShoppingBag, User } from "lucide-react";

interface BottomNavProps {
  locale: string;
}

const NAV_ITEMS = [
  {
    key: "journey",
    icon: Map,
    labelEn: "Journey",
    labelAr: "الرحلة",
    href: (locale: string) => `/${locale}/journey`,
    matchSegment: "journey",
  },
  {
    key: "friends",
    icon: Users,
    labelEn: "Friends",
    labelAr: "أصدقاء",
    href: (locale: string) => `/${locale}/friends`,
    matchSegment: "friends",
  },
  {
    key: "majlis",
    icon: Users2,
    labelEn: "Majlis",
    labelAr: "المجلس",
    href: (locale: string) => `/${locale}/majlis`,
    matchSegment: "majlis",
  },
  {
    key: "shop",
    icon: ShoppingBag,
    labelEn: "Shop",
    labelAr: "المتجر",
    href: (locale: string) => `/${locale}/shop`,
    matchSegment: "shop",
  },
  {
    key: "profile",
    icon: User,
    labelEn: "Profile",
    labelAr: "ملفي",
    href: (locale: string) => `/${locale}/profile`,
    matchSegment: "profile",
  },
] as const;

/**
 * Sticky bottom navigation bar shown on all inner app pages.
 * Highlights the current active tab based on the URL pathname.
 */
export default function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();
  const isAr = locale === "ar";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      aria-label={isAr ? "التنقل" : "App navigation"}
      style={{
        background: "rgba(255,255,252,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,17,27,0.07)",
        boxShadow: "0 -4px 24px rgba(0,17,27,0.06)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <ul className="flex h-16 items-stretch justify-around">
        {NAV_ITEMS.map(({ key, icon: Icon, labelEn, labelAr, href, matchSegment }) => {
          const isActive =
            matchSegment === "journey"
              ? pathname.includes("/journey")
              : pathname.includes(`/${matchSegment}`);

          return (
            <li key={key} className="flex flex-1">
              <Link
                href={href(locale)}
                className="flex flex-1 flex-col items-center justify-center gap-1 transition-colors"
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className="flex size-9 items-center justify-center rounded-2xl transition-all"
                  style={{
                    background: isActive ? "rgba(5,160,73,0.12)" : "transparent",
                  }}
                >
                  <Icon
                    className="size-5 transition-colors"
                    style={{ color: isActive ? "#05A049" : "#94A3B8" }}
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.2 : 1.6}
                  />
                </div>
                <span
                  className="font-heading text-[10px] font-semibold tracking-wide transition-colors"
                  style={{ color: isActive ? "#05A049" : "#94A3B8" }}
                >
                  {isAr ? labelAr : labelEn}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
