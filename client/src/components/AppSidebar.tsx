import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  User, 
  TrendingUp, 
  Users,
  Video,
  LogOut
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

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Logo size="sm" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Career Growth</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {careerItems.map((item) => (
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
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Switch View</p>
            <RoleSelector
              value={currentRole}
              onChange={(role) => dispatch(setCurrentRole(role))}
            />
          </div>
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
