"use client";

import { usePathname } from "next/navigation";
import { useLangStore } from "@/stores/langStore";
import { getCoursePath } from "@/lib/getCoursePath";
import { scormLink } from "@/lib/scormLink";

export default function Introduction() {
    const pathname = usePathname();
    const route = getCoursePath(pathname);
    const { i18nR } = useLangStore();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
            <h1 className="text-7xl font-bold">{i18nR(route, "s1_h1")}</h1>
            <p className="text-gray-700">{i18nR(route, "s1_p1")}</p>
            <a href={scormLink("section1", pathname)} className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
                {i18nR(route, "s1_b1")}
            </a>
        </main>
    );
}
