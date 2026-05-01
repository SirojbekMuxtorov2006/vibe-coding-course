import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(); // Protect layout

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-end px-6 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Logged in as Admin</span>
          </div>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
