import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";
import { EmptyState } from "@/components/dashboard/states/EmptyState";
import { Map } from "lucide-react";

export const metadata = {
  title: "Roadmaps - Dashboard",
  description: "Follow your learning roadmaps and tracks.",
};

export default function RoadmapsPage() {
  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Roadmaps"
        description="Follow your learning roadmaps and tracks."
      />
      <SectionCard>
        <EmptyState
          icon={<Map className="w-8 h-8" />}
          title="No roadmaps yet"
          description="Your personalized learning roadmaps will appear here."
        />
      </SectionCard>
    </PageContainer>
  );
}
