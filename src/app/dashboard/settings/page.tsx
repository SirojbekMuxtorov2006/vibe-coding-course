import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await getAuthUser();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your profile, subscription, and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user?.name || ""} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">Email is managed by your authentication provider.</p>
            </div>
            <Button variant="neon">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your billing and plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl border border-purple-500/30 bg-purple-500/5">
              <div>
                <p className="font-semibold">{user?.subscriptionPlan || "FREE"} Plan</p>
                <p className="text-sm text-muted-foreground">Current active plan</p>
              </div>
              {user?.subscriptionPlan === "FREE" ? (
                <Button variant="neon" size="sm">Upgrade to Pro</Button>
              ) : (
                <Button variant="outline" size="sm">Manage Billing</Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Notification Preferences</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  Email me about new courses
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" defaultChecked />
                  Email me about community replies
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
