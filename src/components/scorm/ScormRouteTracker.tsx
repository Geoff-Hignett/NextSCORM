"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useScormStore } from "@/stores/scormStore";
import { COURSE_ROUTE_ORDER } from "@/lib/scorm/courseMap";

export default function ScormRouteTracker() {
    const pathname = usePathname();
    const router = useRouter();

    const { location, resumeAvailable, resumeDecisionMade, updateLocationIfAdvanced } = useScormStore();

    /**
     * Resume redirect
     * Runs ONLY for returning learners AFTER they choose Resume
     */
    useEffect(() => {
        if (!resumeAvailable) return;
        if (!resumeDecisionMade) return;
        if (location === null || location === 0) return;

        const resumePath = Object.entries(COURSE_ROUTE_ORDER).find(([, loc]) => loc === location)?.[0];

        if (resumePath && resumePath !== pathname) {
            router.replace(resumePath);
        }
    }, [resumeAvailable, resumeDecisionMade, location, pathname, router]);

    /**
     * Progress advancement
     * Runs on EVERY navigation, always
     */
    useEffect(() => {
        const pageLocation = COURSE_ROUTE_ORDER[pathname];
        if (pageLocation === undefined) return;

        updateLocationIfAdvanced(pageLocation);
    }, [pathname, updateLocationIfAdvanced]);

    return null;
}
