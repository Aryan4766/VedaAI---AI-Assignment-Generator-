import {
  LayoutGrid,
  Users,
  FileText,
  Smartphone,
  Clock,
  Settings,
  Sparkles,
  BookOpen,
} from "lucide-react";

const iconClass = "h-[18px] w-[18px] shrink-0";

export function NavIcon({ name }: { name: string }) {
  switch (name) {
    case "home":
      return <LayoutGrid className={iconClass} strokeWidth={1.75} />;
    case "groups":
      return <Users className={iconClass} strokeWidth={1.75} />;
    case "assignments":
      return <FileText className={iconClass} strokeWidth={1.75} />;
    case "toolkit":
      return <Smartphone className={iconClass} strokeWidth={1.75} />;
    case "library":
      return <Clock className={iconClass} strokeWidth={1.75} />;
    case "settings":
      return <Settings className={iconClass} strokeWidth={1.75} />;
    case "sparkle":
      return <Sparkles className={iconClass} strokeWidth={1.75} />;
    case "book":
      return <BookOpen className={iconClass} strokeWidth={1.75} />;
    default:
      return <LayoutGrid className={iconClass} strokeWidth={1.75} />;
  }
}
