import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { H2, P } from "@/components/ui/Typography";

export const metadata = {
  title: "Profile - Dashboard",
  description: "View and edit your personal profile information.",
};

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch the logged-in user with preferences and country
  const user = await db.user.findUnique({
    where: { id: session.sub },
    include: {
      preference: true,
      country: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Fetch countries and languages for the form options
  const countries = await db.country.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const languages = await db.language.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <ProfileForm user={user} countries={countries} languages={languages} />
    </div>
  );
}
