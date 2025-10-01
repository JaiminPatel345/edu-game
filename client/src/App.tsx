import { Switch, Route, Redirect } from "wouter";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import type { RootState } from "./store";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Opportunities from "@/pages/Opportunities";
import Applications from "@/pages/Applications";
import SkillDevelopment from "@/pages/SkillDevelopment";
import MockInterview from "@/pages/MockInterview";
import SuccessStories from "@/pages/SuccessStories";
import CentralGovInternships from "@/pages/CentralGovInternships";
import StateGovPrograms from "@/pages/StateGovPrograms";
import PSUOpportunities from "@/pages/PSUOpportunities";

function AuthenticatedApp() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/profile" component={Profile} />
              <Route path="/opportunities" component={Opportunities} />
              <Route path="/applications" component={Applications} />
              <Route path="/skill-development" component={SkillDevelopment} />
              <Route path="/mock-interview" component={MockInterview} />
              <Route path="/success-stories" component={SuccessStories} />
              <Route path="/gov-internships/central" component={CentralGovInternships} />
              <Route path="/gov-internships/state" component={StateGovPrograms} />
              <Route path="/gov-internships/psu" component={PSUOpportunities} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppRouter() {
  const user = useSelector((state: RootState) => state.app.user);

  if (!user) {
    return <Auth />;
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppRouter />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}
