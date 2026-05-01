import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-sm normal-case",
            card: "bg-card/50 backdrop-blur-xl border border-border shadow-2xl",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border-border hover:bg-muted text-foreground",
            socialButtonsBlockButtonText: "text-foreground font-medium",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-input text-foreground",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-purple-400 hover:text-purple-300",
          }
        }} />
      </div>
    </div>
  );
}
