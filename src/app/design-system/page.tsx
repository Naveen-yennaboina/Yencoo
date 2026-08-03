"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, MotionCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { SkeletonCard, SkeletonList } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";
import { Tooltip } from "@/components/ui/Tooltip";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { OtpInput } from "@/components/ui/OtpInput";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";
import { Info, AlertTriangle, CheckCircle2, Search, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 md:px-8 space-y-24">
      <div className="space-y-4">
        <h1 className="font-heading text-5xl font-bold tracking-tight text-primary">Yencoo Design System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A premium, mobile-first design system built with Tailwind CSS v4 and Framer Motion. 
          Focusing on elegant interactions, deep accessibility, and beautiful typography.
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ColorSwatch name="Primary" className="bg-primary text-primary-foreground" />
          <ColorSwatch name="Secondary" className="bg-secondary text-secondary-foreground" />
          <ColorSwatch name="Accent" className="bg-accent text-accent-foreground" />
          <ColorSwatch name="Background" className="bg-background text-foreground border" />
          <ColorSwatch name="Muted" className="bg-muted text-muted-foreground" />
          
          <ColorSwatch name="Success" className="bg-success text-success-foreground" />
          <ColorSwatch name="Warning" className="bg-warning text-warning-foreground" />
          <ColorSwatch name="Destructive" className="bg-destructive text-destructive-foreground" />
          <ColorSwatch name="Info" className="bg-info text-info-foreground" />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Typography</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Heading Font (Poppins)</p>
            <h1 className="font-heading text-4xl font-bold">The quick brown fox jumps over the lazy dog</h1>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Body Font (Inter)</p>
            <p className="font-sans text-base">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Mono Font (JetBrains Mono)</p>
            <p className="font-mono text-sm bg-muted inline-block p-2 rounded-md">console.log("The quick brown fox");</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button isLoading>Loading...</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="lg">Large Button</Button>
          <Button size="default">Default Size</Button>
          <Button size="sm">Small</Button>
          <Button size="icon"><CheckCircle2 className="h-5 w-5" /></Button>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Inputs & Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="space-y-4">
            <Input placeholder="Standard Input" />
            <Input placeholder="Search..." icon={<Search className="h-4 w-4" />} />
            <Input placeholder="Email Address" type="email" icon={<Mail className="h-4 w-4" />} />
            <Input placeholder="Password" type="password" icon={<Lock className="h-4 w-4" />} />
            <Input placeholder="Error State" error />
          </div>
          <div className="space-y-4">
            <Textarea placeholder="Type your message here..." />
            <div className="space-y-2">
              <p className="text-sm font-medium">OTP Input</p>
              <OtpInput length={6} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Cards & Layouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MotionCard isHoverable>
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
              <CardDescription>Hover over me to see the premium shadow animation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Cards are used to group related content. They support header, content, and footer regions.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Action</Button>
            </CardFooter>
          </MotionCard>
          
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-primary/10 blur-3xl rounded-full" />
            <CardHeader>
              <CardTitle>Glassmorphism</CardTitle>
              <CardDescription>A stunning glass effect for premium contexts.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm">This card looks incredible over gradients or images.</p>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>A subtle variant without background.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Best used when you don't want to distract from the main content.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Feedback & Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Alert variant="default">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Here is some information you might need.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Your subscription is expiring soon.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your profile has been updated.</AlertDescription>
            </Alert>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Progress Bar</p>
              <Progress value={65} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Badges</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Toasts</p>
              <Toast title="Action Successful" description="Your settings have been saved." variant="default" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Display & Overlays</h2>
        <div className="flex flex-wrap gap-12 items-center">
          <div className="space-y-2">
            <p className="text-sm font-medium">Avatars</p>
            <div className="flex items-center gap-4">
              <Avatar size="sm" />
              <Avatar size="md" src="https://i.pravatar.cc/150?u=1" />
              <Avatar size="lg" src="https://i.pravatar.cc/150?u=2" bordered />
              <Avatar size="xl" src="https://i.pravatar.cc/150?u=3" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Tooltips</p>
            <Tooltip content="This is a helpful tooltip!">
              <Button variant="outline">Hover Me</Button>
            </Tooltip>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Dropdowns</p>
            <Dropdown trigger={<Button variant="secondary">Open Menu</Button>}>
              <DropdownItem>Profile Settings</DropdownItem>
              <DropdownItem>Billing</DropdownItem>
              <DropdownItem className="text-destructive">Log out</DropdownItem>
            </Dropdown>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Modals</p>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Premium Modal">
              <p className="text-muted-foreground mb-4">
                This modal uses Framer Motion spring physics for a beautiful entry and exit animation.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </Modal>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Skeletons & Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkeletonCard />
          <SkeletonList />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-semibold border-b pb-2">Tabs (Animated)</h2>
        <div className="max-w-2xl">
          <Tabs 
            tabs={[
              { label: "Account", content: <Card className="p-6">Account Settings</Card> },
              { label: "Password", content: <Card className="p-6">Change Password</Card> },
              { label: "Notifications", content: <Card className="p-6">Notification Preferences</Card> },
            ]}
          />
        </div>
      </section>
      
      <div className="pb-24" />
    </div>
  );
}

function ColorSwatch({ name, className }: { name: string, className?: string }) {
  return (
    <div className={cn("h-24 rounded-xl p-4 flex items-end justify-start font-medium shadow-sm", className)}>
      {name}
    </div>
  );
}
