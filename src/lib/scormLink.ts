export function scormLink(target: string, pathname: string) {
    const clean = target.replace(/^\/+/, "").replace(/\/+$/, "");

    // Local dev (Next server understands folders)
    if (process.env.NODE_ENV === "development") {
        return `/${clean}`;
    }

    // SCORM Cloud: MUST reference index.html explicitly
    if (pathname === "/") {
        return `${clean}/index.html`;
    }

    return `../${clean}/index.html`;
}
