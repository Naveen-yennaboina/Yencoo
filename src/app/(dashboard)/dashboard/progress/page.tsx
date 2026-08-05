import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";
import { EmptyState } from "@/components/dashboard/states/EmptyState";
import { LineChart } from "lucide-react";

export const metadata = {
  title: "Progress - Dashboard",
  description: "Track your learning progress and achievements.",
};

export default function ProgressPage() {
  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Progress"
        description="Track your learning progress and achievements."
      />
      <SectionCard>
        <EmptyState
          icon={<LineChart className="w-8 h-8" />}
          title="No progress yet"
          description="Start learning to see your progress and achievements here."
        />
      </SectionCard>
    </PageContainer>
  );
}
