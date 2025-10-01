import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  User, 
  TrendingUp, 
  Users,
  Video,
  LogOut,
  BookOpen,
  UserCheck,
  BarChart3,
  Calendar,
  Building2,
  MapPin
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { RoleSelector } from './RoleSelector';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentRole, setUser } from '../store';
import type { RootState } from '../store';

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.app.currentRole);

  const studentItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Opportunities',
      url: '/opportunities',
      icon: Briefcase,
      badge: 'New'
    },
    {
      title: 'My Applications',
      url: '/applications',
      icon: FileText,
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: User,
    },
  ];

  const careerItems = [
    {
      title: 'Skill Development',
      url: '/skill-development',
      icon: TrendingUp,
    },
    {
      title: 'Mock Interview',
      url: '/mock-interview',
      icon: Video,
    },
    {
      title: 'Success Stories',
      url: '/success-stories',
      icon: Users,
    },
  ];

  const govInternshipItems = [
    {
      title: 'Central Govt Internships',
      url: '/gov-internships/central',
      icon: Building2,
      badge: 'Hot'
    },
    {
      title: 'State Govt Programs',
      url: '/gov-internships/state',
      icon: MapPin,
    },
    {
      title: 'PSU Opportunities',
      url: '/gov-internships/psu',
      icon: Briefcase,
    },
  ];

  const facultyItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Student Management',
      url: '/students',
      icon: UserCheck,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: BarChart3,
    },
    {
      title: 'Placement Drive',
      url: '/placement-drive',
      icon: Calendar,
    },
  ];

  const facultyCareerItems = [
    {
      title: 'Academic Resources',
      url: '/academic-resources',
      icon: BookOpen,
    },
    {
      title: 'Industry Connect',
      url: '/industry-connect',
      icon: Users,
    },
  ];

  // Get navigation items based on current role
  const getNavigationItems = () => {
    if (currentRole === 'faculty' || currentRole === 'placement_cell') {
      return { 
        mainItems: facultyItems, 
        careerItems: facultyCareerItems,
        govItems: null 
      };
    }
    return { 
      mainItems: studentItems, 
      careerItems,
      govItems: govInternshipItems 
    };
  };

  const { mainItems, careerItems: currentCareerItems, govItems } = getNavigationItems();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Logo size="sm" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>{currentRole === 'faculty' || currentRole === 'placement_cell' ? 'Faculty Menu' : 'Main Menu'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    {(item as NavigationItem).badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {(item as NavigationItem).badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{currentRole === 'faculty' || currentRole === 'placement_cell' ? 'Academic Tools' : 'Career Growth'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentCareerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Government Internships Section - Only for Students */}
        {govItems && (
          <SidebarGroup>
            <SidebarGroupLabel>Government Internships</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {govItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => setLocation(item.url)}
                      isActive={location === item.url}
                      data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {(item as NavigationItem).badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {(item as NavigationItem).badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              dispatch(setUser(null));
              setLocation('/login');
            }}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
