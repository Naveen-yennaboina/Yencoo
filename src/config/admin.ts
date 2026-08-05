import { 
  LayoutDashboard, 
  BookOpen, 
  Tags, 
  Map as MapIcon, 
  Globe, 
  Image as ImageIcon, 
  Ticket, 
  Star, 
  Settings 
} from "lucide-react";

export const adminNav = [
  { href: "/admin", title: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", title: "Courses", icon: BookOpen },
  { href: "/admin/categories", title: "Categories", icon: Tags },
  { href: "/admin/roadmaps", title: "Roadmaps", icon: MapIcon },
  { href: "/admin/languages", title: "Languages", icon: Globe },
  { href: "/admin/media", title: "Media Library", icon: ImageIcon },
  { href: "/admin/coupons", title: "Coupons", icon: Ticket },
  { href: "/admin/reviews", title: "Reviews", icon: Star },
  { href: "/admin/settings", title: "Settings", icon: Settings },
];
