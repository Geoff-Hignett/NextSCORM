/**
 * courseLink
 * ----------
 * Generates SCORM-safe relative links for static export.
 *
 * Rules:
 * - Never returns absolute paths
 * - Always returns a trailing slash
 * - Assumes links are used from a page folder (e.g. /section1/)
 */
export function courseLink(target: string) {
    // Remove leading slashes if someone passes "/summary"
    const clean = target.replace(/^\/+/, "").replace(/\/+$/, "");

    // Go up one level, then into target
    return `../${clean}/`;
}
