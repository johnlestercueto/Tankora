"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function ShopLayout({ children }) {
  const { shopId } = useParams();
  const pathname = usePathname();

  const tabs = [
    { key: "products", label: "Products", href: "" },
    { key: "reviews", label: "Reviews", href: "reviews" },
    { key: "details", label: "Shop Details", href: "details" },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 overflow-auto p-4">{children}</div>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white border-t h-16">
        {tabs.map((tab) => {
          // Fix: Use pathname.includes instead of endsWith for better matching
          const isActive = pathname.includes(tab.href) || (tab.href === "" && pathname.endsWith(shopId));
          return (
            <Link
              key={tab.key}
              href={`/shop/${shopId}${tab.href ? `/${tab.href}` : ""}`}
              className={`flex-1 text-center ${isActive ? "text-blue-500 font-bold" : "text-gray-500"}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
