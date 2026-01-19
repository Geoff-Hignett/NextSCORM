"use client";

import { usePathname } from "next/navigation";
import { useScormStore } from "@/stores/scormStore";

export default function ResumePrompt() {
    const pathname = usePathname();
    const { resumeAvailable, resumeDecisionMade, resumeCourse, restartCourse } = useScormStore();
    if (pathname !== "/") return null;
    if (!resumeAvailable || resumeDecisionMade) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                <h2 className="text-lg font-semibold mb-3">Resume your progress?</h2>

                <p className="text-sm text-gray-600 mb-6">
                    We found previous progress in this course. Would you like to continue where you left off, or restart from the beginning?
                </p>

                <div className="flex justify-end gap-3">
                    <button onClick={restartCourse} className="px-4 py-2 text-sm border rounded">
                        Restart
                    </button>

                    <button onClick={resumeCourse} className="px-4 py-2 text-sm bg-black text-white rounded">
                        Resume
                    </button>
                </div>
            </div>
        </div>
    );
}
