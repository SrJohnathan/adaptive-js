import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { QuickNavFab } from "./quick-nav-fab";
import { CommandPalette } from "./command-palette";
import { ToastContainer } from "./toast-container";
import type { ScreenType } from "../../shared/omni-hub/types";

interface AppShellProps {
  active: ScreenType;
  children: any;
}

export function AppShell({ active, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      <Header />

      <div className="flex flex-1 pt-16">
        <Sidebar active={active} />

        {/* Canvas de Conteúdo Central */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-[calc(100vh-64px)] pb-16 md:pb-6 overflow-x-hidden">
          {children}
        </div>
      </div>

      <QuickNavFab active={active} />

      <CommandPalette />
      <ToastContainer />
    </div>
  );
}