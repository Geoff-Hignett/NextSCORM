import type { Metadata } from "next";
import "./globals.css";

import LangWrapper from "@/components/lang/LangWrapper";
import ScormWrapper from "@/components/scorm/ScormWrapper";
import ScormRouteTracker from "@/components/scorm/ScormRouteTracker";
import ResumePrompt from "@/components/scorm/ResumePrompt";
import DebugToggle from "@/components/debug/DebugToggle";
import DebugPanel from "@/components/debug/DebugPanel";

export const metadata: Metadata = {
    title: "NextScorm",
    description: "Modern Next.js SCORM course shell",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="font-sans antialiased">
                <LangWrapper>
                    <ScormWrapper>
                        <ResumePrompt />
                        <ScormRouteTracker />
                        <DebugToggle />
                        <DebugPanel />
                        {children}
                    </ScormWrapper>
                </LangWrapper>
            </body>
        </html>
    );
}
