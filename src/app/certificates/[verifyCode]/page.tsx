import { db as prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CertificateView } from "@/features/certificates/components/CertificateView";

interface PageProps {
  params: {
    verifyCode: string;
  };
}

export default async function CertificateVerificationPage({ params }: PageProps) {
  const certificate = await prisma.certificate.findUnique({
    where: { verifyCode: params.verifyCode },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      course: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!certificate) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4 sm:p-8">
      <CertificateView certificate={certificate} />
    </div>
  );
}
