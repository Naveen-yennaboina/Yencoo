"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { Mail, Camera, Key, CreditCard, Bell } from "lucide-react";

export default function ProfileTemplate() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and billing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar (Optional, tabs handle this, but good for larger layouts) */}
        <div className="w-full">
          <Tabs
            tabs={[
              {
                label: "Profile",
                content: (
                  <div className="space-y-6 pt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Public Profile</CardTitle>
                        <CardDescription>This information will be displayed publicly.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                          <Avatar size="2xl" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                          <div className="space-y-2">
                            <Button variant="outline" size="sm">
                              <Camera className="h-4 w-4 mr-2" />
                              Change Picture
                            </Button>
                            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input defaultValue="Alex" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input defaultValue="Carter" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Bio</label>
                          <textarea 
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us a little bit about yourself"
                            defaultValue="Frontend developer learning Next.js and Tailwind."
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-6 flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Email Address</CardTitle>
                        <CardDescription>Manage the email address associated with your account.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <Input defaultValue="alex.carter@example.com" readOnly icon={<Mail className="h-4 w-4" />} className="bg-muted/50" />
                          <Button variant="outline">Update</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              },
              {
                label: "Security",
                content: (
                  <div className="space-y-6 pt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Current Password</label>
                          <Input type="password" icon={<Key className="h-4 w-4" />} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">New Password</label>
                          <Input type="password" icon={<Key className="h-4 w-4" />} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Confirm New Password</label>
                          <Input type="password" icon={<Key className="h-4 w-4" />} />
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-6 flex justify-end">
                        <Button>Update Password</Button>
                      </CardFooter>
                    </Card>
                  </div>
                )
              },
              {
                label: "Billing",
                content: (
                  <div className="space-y-6 pt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>You are currently on the Pro plan.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-heading font-semibold text-xl text-primary">Pro (Annual)</p>
                            <p className="text-sm text-muted-foreground">Renews on Oct 24, 2024</p>
                          </div>
                          <p className="text-2xl font-bold">$29<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-6 flex gap-2 justify-end">
                        <Button variant="outline">Cancel Plan</Button>
                        <Button>Upgrade Plan</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Manage your payment details.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
