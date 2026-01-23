"use client";

import { usePathname } from "next/navigation";
import { useLangStore } from "@/stores/langStore";
import { getCoursePath } from "@/lib/getCoursePath";

export default function Summary() {
    const pathname = usePathname();
    const route = getCoursePath(pathname);
    const { i18nR } = useLangStore();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
            <h1 className="text-7xl font-bold">{i18nR(route, "s1_h1")}</h1>
            <p className="text-gray-700">{i18nR(route, "s1_p1")}</p>
        </main>
    );
}
