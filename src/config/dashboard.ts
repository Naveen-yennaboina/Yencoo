import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Map,
  BarChart,
  CreditCard,
  Settings,
  User,
} from "lucide-react";

export const dashboardNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Learning Roadmaps",
    href: "/dashboard/roadmaps",
    icon: Map,
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: BarChart,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];
