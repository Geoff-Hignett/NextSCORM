"use client";

import { usePathname } from "next/navigation";
import { useLangStore } from "@/stores/langStore";

export default function Summary() {
    const pathname = usePathname();
    const { i18nR } = useLangStore();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
            <h1 className="text-3xl font-bold">{i18nR(pathname, "s1_h1")}</h1>
            <p className="text-gray-700">{i18nR(pathname, "s1_p1")}</p>
            <div className="flex gap-4"></div>
        </main>
    );
}
