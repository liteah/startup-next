import SelectLanguage from "@/components/layout/select-language";
import ToggleTheme from "@/components/layout/toggle-theme";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import constant from "@/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" className="h-10">
            <ArrowLeftIcon className="size-4 md:mr-2" />
            <span className="hidden md:inline">Home</span>
          </Button>
        </Link>
        <Link href="/" className="hidden md:flex items-center space-x-2">
          {constant.logo}
          <span className="text-lg font-semibold">{constant.name}</span>
        </Link>
        <div className="flex items-center space-x-2">
          <SelectLanguage />
          <ToggleTheme />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="p-4 text-center text-xs text-muted-foreground">
        <div className="mb-2">© {new Date().getFullYear()} {constant.name}. All rights reserved.</div>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
