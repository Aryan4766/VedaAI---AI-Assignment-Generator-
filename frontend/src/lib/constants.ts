export const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based",
  "Numerical Problems",
  "Long Answer Questions",
  "Fill in the Blanks",
] as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/groups", label: "My Groups", icon: "groups" as const },
  {
    href: "/assignments",
    label: "Assignments",
    icon: "assignments" as const,
    badge: 10,
  },
  { href: "/toolkit", label: "AI Teacher's Toolkit", icon: "toolkit" as const },
  { href: "/library", label: "My Library", icon: "library" as const },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/assignments", label: "Assignments", icon: "assignments" as const },
  { href: "/library", label: "Library", icon: "library" as const },
  { href: "/toolkit", label: "AI Toolkit", icon: "toolkit" as const },
] as const;

export const SCHOOL = {
  name: "Delhi Public School",
  location: "Bokaro Steel City",
  fullName: "Delhi Public School, Sector-4, Bokaro",
};

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";
