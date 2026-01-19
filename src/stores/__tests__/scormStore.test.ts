import { useScormStore } from "../scormStore";
import { scormAPI } from "@/lib/scormApi";

jest.mock("@/lib/scormApi");

const resetStore = () => {
    useScormStore.setState({
        version: "",
        scormAPIConnected: false,
        scormConnectRun: 0,
        scormInited: { success: false, version: "" },
        suspendData: null,
        location: null,
        resumeAvailable: false,
        resumeDecisionMade: false,
    });
};

describe("scormStore", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        resetStore();
    });

    describe("hydration precedence", () => {
        it("hydrates from localStorage when SCORM is not connected", () => {
            localStorage.setItem("bookmark", "2");

            const store = useScormStore.getState();
            store.hydrateFromPersistence();

            expect(useScormStore.getState().location).toBe(2);
        });

        it("LMS data overrides localStorage when SCORM is connected (1.2)", () => {
            localStorage.setItem("bookmark", "1");

            (scormAPI.get as jest.Mock).mockReturnValue("2");

            useScormStore.setState({
                scormAPIConnected: true,
                version: "1.2",
            });

            const store = useScormStore.getState();
            store.hydrateFromPersistence();

            expect(useScormStore.getState().location).toBe(2);
        });
    });

    describe("monotonic route-based bookmarking", () => {
        it("advances location only when navigating forward", () => {
            const store = useScormStore.getState();

            store.updateLocationIfAdvanced(1);
            expect(useScormStore.getState().location).toBe(1);

            store.updateLocationIfAdvanced(0);
            expect(useScormStore.getState().location).toBe(1);

            store.updateLocationIfAdvanced(2);
            expect(useScormStore.getState().location).toBe(2);
        });
    });

    describe("resume availability", () => {
        it("does not enable resume during in-session progress", () => {
            const store = useScormStore.getState();

            store.updateLocationIfAdvanced(1);

            expect(useScormStore.getState().resumeAvailable).toBe(false);
        });

        it("enables resume only when progress is hydrated from persistence", () => {
            localStorage.setItem("bookmark", "2");

            const store = useScormStore.getState();
            store.hydrateFromPersistence();

            expect(useScormStore.getState().resumeAvailable).toBe(true);
        });
    });

    describe("restartCourse", () => {
        it("clears all persisted progress and disables resume", () => {
            localStorage.setItem("bookmark", "2");

            const store = useScormStore.getState();
            store.hydrateFromPersistence();

            expect(useScormStore.getState().resumeAvailable).toBe(true);

            store.restartCourse();

            const state = useScormStore.getState();

            expect(state.location).toBe(0);
            expect(state.suspendData).toBeNull();
            expect(state.resumeAvailable).toBe(false);
            expect(state.resumeDecisionMade).toBe(true);
        });
    });
});
