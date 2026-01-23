export function getCoursePath(pathname: string) {
    const match = pathname.match(/\/(section1|summary)\/?$/);
    return match ? `/${match[1]}` : "/";
}
