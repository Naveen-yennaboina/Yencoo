import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";
import { EmptyState } from "@/components/dashboard/states/EmptyState";
import { Settings } from "lucide-react";

export const metadata = {
  title: "Settings - Dashboard",
  description: "Manage your account settings and preferences.",
};

export default function SettingsPage() {
  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Settings"
        description="Manage your account settings and preferences."
      />
      <SectionCard>
        <EmptyState
          icon={<Settings className="w-8 h-8" />}
          title="Settings Coming Soon"
          description="We are currently building the new settings experience."
        />
      </SectionCard>
    </PageContainer>
  );
}
