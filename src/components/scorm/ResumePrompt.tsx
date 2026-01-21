"use client";

import { usePathname } from "next/navigation";
import { useScormStore } from "@/stores/scormStore";
import { useLangStore } from "@/stores/langStore";

export default function ResumePrompt() {
    const pathname = usePathname();
    const { resumeAvailable, resumeDecisionMade, resumeCourse, restartCourse } = useScormStore();
    const { i18nUI } = useLangStore();

    if (pathname !== "/") return null;
    if (!resumeAvailable || resumeDecisionMade) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                <h2 className="text-lg font-semibold mb-3">{i18nUI("resume_title")}</h2>

                <p className="text-sm text-gray-600 mb-6">{i18nUI("resume_body")}</p>

                <div className="flex justify-end gap-3">
                    <button onClick={restartCourse} className="px-4 py-2 text-sm border rounded">
                        {i18nUI("resume_restart")}
                    </button>

                    <button onClick={resumeCourse} className="px-4 py-2 text-sm bg-black text-white rounded">
                        {i18nUI("resume_continue")}
                    </button>
                </div>
            </div>
        </div>
    );
}
