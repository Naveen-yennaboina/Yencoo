"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Printer, Download, Share2, ShieldCheck, Medal } from "lucide-react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface CertificateViewProps {
  certificate: {
    id: string;
    verifyCode: string;
    issuedAt: Date;
    user: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
    };
    course: {
      title: string;
      slug: string;
    };
  };
}

export function CertificateView({ certificate }: CertificateViewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificate-\${certificate.verifyCode}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="w-full max-w-5xl space-y-8">
      {/* Action Bar (Hidden when printing) */}
      <div className="print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-background p-4 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Verified Certificate</h3>
            <p className="text-xs text-muted-foreground">ID: {certificate.verifyCode}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      {/* Certificate Container */}
      <div 
        className="w-full aspect-[1.414/1] bg-background border-[12px] border-double border-muted rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center print:shadow-none print:border-8 print:m-0 print:w-full print:h-screen"
        ref={printRef}
      >
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 text-center space-y-12 p-12 w-full max-w-4xl">
          {/* Logo / Header */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg mb-4">
              <Medal className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase tracking-[0.2em]">
              Certificate of Completion
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Recipient */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground uppercase tracking-wider font-medium">
              This certifies that
            </p>
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
              {certificate.user.firstName ? `${certificate.user.firstName} ${certificate.user.lastName || ''}` : certificate.user.email}
            </h2>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground uppercase tracking-wider font-medium">
              has successfully completed the course
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {certificate.course.title}
            </h3>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-end justify-between pt-16 mt-8 border-t border-border/50 text-left">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Date Issued</p>
              <p className="text-lg font-medium">{format(certificate.issuedAt, "MMMM do, yyyy")}</p>
            </div>
            <div className="space-y-1 text-center">
              <div className="w-32 h-16 bg-muted/50 rounded flex items-center justify-center opacity-50 mb-2 mx-auto">
                {/* Signature placeholder */}
                <span className="font-serif italic text-muted-foreground text-sm">Yencoo Staff</span>
              </div>
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Authorized Signature</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Verification ID</p>
              <p className="text-lg font-medium tracking-wider">{certificate.verifyCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function handleShare() {
  if (navigator.share) {
    navigator.share({
      title: 'My Yencoo Certificate',
      url: window.location.href
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }
}
