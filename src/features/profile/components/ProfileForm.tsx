"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, Upload, Shield, Key, Bell, CreditCard, ChevronRight, Moon, Sun, Smartphone, Laptop, SmartphoneNfc } from "lucide-react";
import { useRouter } from "next/navigation";
import { profileSchema, ProfileInput } from "@/lib/validators/profile";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";

interface ProfileFormProps {
  user: any;
  countries: { id: string; name: string }[];
  languages: { id: string; name: string }[];
}

export function ProfileForm({ user, countries, languages }: ProfileFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      bio: user.bio || "",
      countryId: user.countryId || "",
      preferredLearningMode: user.preference?.preferredLearningMode || "TEXT",
      preferredLanguageId: user.preference?.preferredLanguageId || "",
      preferredTimezone: user.preference?.preferredTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save profile");

      setSaveSuccess(true);
      reset(data); // reset form with new values so isDirty becomes false
      router.refresh();
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const countryOptions = [
    { label: "Select Country", value: "" },
    ...countries.map((c) => ({ label: c.name, value: c.id }))
  ];

  const languageOptions = [
    { label: "Select Language", value: "" },
    ...languages.map((l) => ({ label: l.name, value: l.id }))
  ];

  const userCountry = countries.find(c => c.id === user.countryId)?.name || "Not Specified";
  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <PageContainer size="wide">
      <form onSubmit={handleSubmit(onSubmit)} className="pb-32">
        <PageHeader 
          title="Profile Settings"
          description="Manage your account settings and preferences."
          actions={
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isDirty && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => reset()} 
                  disabled={isSaving}
                  className="rounded-xl"
                >
                  Discard
                </Button>
              )}
              <Button 
                type="submit" 
                variant="default"
                disabled={!isDirty || isSaving}
                className="rounded-xl shadow-premium-sm"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          }
        />

        {saveSuccess && (
          <div className="mb-8 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900 rounded-[20px] flex items-center shadow-sm text-sm font-medium">
            <Save className="w-5 h-5 mr-3" />
            Profile updated successfully.
          </div>
        )}
        
        {saveError && (
          <div className="mb-8 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-[20px] shadow-sm text-sm font-medium">
            {saveError}
          </div>
        )}

        <div className="space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Profile Summary Card */}
            <div className="lg:col-span-4">
              <SectionCard className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold uppercase shrink-0 mb-4 border-4 border-background shadow-sm">
                  {user.firstName ? user.firstName[0] : user.email[0]}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-2">
                  {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "User"}
                </h3>
                <Badge variant="outline" className="bg-primary/5 mb-4 font-medium">{user.role}</Badge>
                
                <div className="flex flex-col gap-2 w-full max-w-xs text-sm text-muted-foreground mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 15.002 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{userCountry}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>Joined {joinDate}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" type="button" className="gap-2 min-h-[44px] w-full sm:w-auto rounded-xl">
                  <Upload className="w-4 h-4" />
                  Change Avatar
                </Button>
              </SectionCard>
            </div>

            {/* Personal Information */}
            <div className="lg:col-span-8">
              <SectionCard title="Personal Information">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <Input {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
                      {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <Input {...register("lastName")} className={errors.lastName ? "border-red-500" : ""} />
                      {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input {...register("phone")} placeholder="+1 (555) 000-0000" className={errors.phone ? "border-red-500" : ""} />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Country</label>
                      <Controller
                        control={control}
                        name="countryId"
                        render={({ field }) => (
                          <Select
                            options={countryOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.countryId && <p className="text-xs text-red-500">{errors.countryId.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Timezone</label>
                      <Input {...register("preferredTimezone")} placeholder="America/New_York" className={errors.preferredTimezone ? "border-red-500" : ""} />
                      {errors.preferredTimezone && <p className="text-xs text-red-500">{errors.preferredTimezone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Language</label>
                      <Controller
                        control={control}
                        name="preferredLanguageId"
                        render={({ field }) => (
                          <Select
                            options={languageOptions}
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.preferredLanguageId && <p className="text-xs text-red-500">{errors.preferredLanguageId.message}</p>}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Preferences */}
          <SectionCard className="p-0 md:p-0 lg:p-0 overflow-hidden">
            <div className="px-5 md:px-6 lg:px-8 py-5 md:py-6 border-b border-border">
              <h3 className="font-semibold text-lg tracking-tight">Preferences</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="px-5 md:px-6 lg:px-8 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-foreground">Theme</h4>
                  <p className="text-sm text-muted-foreground mt-1">Select your preferred interface theme.</p>
                </div>
                <div className="flex bg-muted p-1 rounded-xl w-full sm:w-auto h-[44px]">
                  <button type="button" className="flex-1 sm:px-4 py-1.5 flex items-center justify-center gap-2 text-sm font-medium bg-background shadow-sm rounded-lg text-foreground">
                    <Sun className="h-4 w-4" /> Light
                  </button>
                  <button type="button" className="flex-1 sm:px-4 py-1.5 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">
                    <Moon className="h-4 w-4" /> Dark
                  </button>
                  <button type="button" className="flex-1 sm:px-4 py-1.5 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">
                    <Laptop className="h-4 w-4" /> System
                  </button>
                </div>
              </div>
              <div className="px-5 md:px-6 lg:px-8 py-5 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-foreground">Learning Mode</h4>
                  <p className="text-sm text-muted-foreground mt-1">How you prefer to consume content.</p>
                </div>
                <div className="w-full sm:w-[200px]">
                  <Controller
                    control={control}
                    name="preferredLearningMode"
                    render={({ field }) => (
                      <Select
                        options={[
                          { label: "Text First", value: "TEXT" },
                          { label: "Audio First", value: "AUDIO" },
                          { label: "Interactive", value: "INTERACTIVE" },
                        ]}
                        value={field.value || "TEXT"}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Security */}
          <SectionCard className="p-0 md:p-0 lg:p-0 overflow-hidden">
            <div className="px-5 md:px-6 lg:px-8 py-5 md:py-6 border-b border-border flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg tracking-tight">Security</h3>
            </div>
            <div className="divide-y divide-border">
              <button type="button" className="w-full px-5 md:px-6 lg:px-8 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left group min-h-[64px]">
                <div>
                  <h4 className="font-medium text-foreground">Change Password</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Update your password associated with this account.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4" />
              </button>
              <button type="button" className="w-full px-5 md:px-6 lg:px-8 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left group min-h-[64px]">
                <div>
                  <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4" />
              </button>
              <button type="button" className="w-full px-5 md:px-6 lg:px-8 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left group min-h-[64px]">
                <div>
                  <h4 className="font-medium text-foreground">Active Sessions</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Manage devices that are currently logged in.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-4" />
              </button>
            </div>
          </SectionCard>
        </div>
      </form>
      
      {/* Sticky Save Bar for mobile fallback, though we use PageHeader for desktop */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] px-4 py-4 md:px-8 md:py-4 flex justify-center pb-safe sm:hidden"
          >
            <div className="w-full max-w-7xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => reset()} 
                  className="flex-1 min-h-[44px] rounded-xl"
                  disabled={isSaving}
                >
                  Discard
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 min-h-[44px] rounded-xl shadow-premium-sm"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSaving}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
