"use client";

import Link from "next/link";
import {
  ArrowRightLeftIcon,
  BellIcon,
  BrainIcon,
  BuildingIcon,
  ChartNoAxesCombinedIcon,
  ChevronRight,
  CoinsIcon,
  CreditCardIcon,
  DollarSignIcon,
  HandCoinsIcon,
  LanguagesIcon,
  LandmarkIcon,
  PiggyBankIcon,
  PlusCircleIcon,
  SettingsIcon,
  ShieldIcon,
  SlidersIcon,
  TrendingUpIcon,
  UserIcon,
  WalletIcon
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DashboardBreadcrumbs } from '@/components/dashboard-breadcrumbs'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";
import { useActivePath } from "@/hooks/use-active-path";
import { BrosBankLogo } from "@/components/icons/brosbank-logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isActive = useActivePath();
  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className='mb-3'>
                      <Link href='/'>
                        <BrosBankLogo className='size-10' />
                        <span className='text-[25px] font-semibold'>BrosBank</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip="Dashboard">
                      <Link href='/dashboard'>
                        <ChartNoAxesCombinedIcon />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Collapsible asChild defaultOpen className='group/collapsible'>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Account">
                          <UserIcon />
                          <span>Account</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive('/dashboard/account/user-data')}>
                              <Link href='/dashboard/account/user-data'>
                                <span>User Data</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/card-management')} tooltip="Card Management">
                      <Link href='/dashboard/card-management'>
                        <CreditCardIcon />
                        <span>Card Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/chat-with-ai')} tooltip="Chat With AI">
                      <Link href='/dashboard/chat-with-ai'>
                        <BrainIcon />
                        <span>Chat With AI</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/deposit-services')} tooltip="Deposit Services">
                      <Link href='/dashboard/deposit-services'>
                        <LandmarkIcon />
                        <span>Deposit Services</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/investments')} tooltip="Investments">
                      <Link href='/dashboard/investments'>
                        <TrendingUpIcon />
                        <span>Investments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Collapsible asChild defaultOpen className='group/collapsible'>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Net Banking">
                          <BuildingIcon />
                          <span>Net Banking</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <Collapsible asChild className=' '>
                            <SidebarMenuSubItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  <TrendingUpIcon className='size-4' />
                                  <span>Investments</span>
                                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/ :rotate-90' />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={isActive('/dashboard/net-banking/investments')}>
                                      <Link href='/dashboard/net-banking/investments'>
                                        <WalletIcon className='size-4' />
                                        <span>View Investments</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={isActive('/dashboard/net-banking/investments/create')}>
                                      <Link href='/dashboard/net-banking/investments/create'>
                                        <PlusCircleIcon className='size-4' />
                                        <span>Create Investment</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>

                          <Collapsible asChild className=' '>
                            <SidebarMenuSubItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  <HandCoinsIcon className='size-4' />
                                  <span>Loans</span>
                                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/ :rotate-90' />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={isActive('/dashboard/net-banking/loans')}>
                                      <Link href='/dashboard/net-banking/loans'>
                                        <CreditCardIcon className='size-4' />
                                        <span>View Loans</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                  <SidebarMenuSubItem>
                                    <SidebarMenuSubButton asChild isActive={isActive('/dashboard/net-banking/loans/create')}>
                                      <Link href='/dashboard/net-banking/loans/create'>
                                        <PlusCircleIcon className='size-4' />
                                        <span>Create Loan</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive('/dashboard/net-banking/deposits')}>
                              <Link href='/dashboard/net-banking/deposits'>
                                <PiggyBankIcon className='size-4' />
                                <span>Deposits</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <Collapsible asChild defaultOpen className='group/collapsible'>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Alerts & Notifications">
                          <BellIcon />
                          <span>Alerts & Notifications</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={isActive('/dashboard/alerts-notifications/reminder')}>
                              <Link href='/dashboard/alerts-notifications/reminder'>
                                <span>Reminder</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/security-features')} tooltip="Security Features">
                      <Link href='/dashboard/security-features'>
                        <ShieldIcon />
                        <span>Security Features</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/settings')} tooltip="Settings">
                      <Link href='/dashboard/settings'>
                        <SettingsIcon />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive('/dashboard/settings-integrations')} tooltip="Settings & Integrations">
                      <Link href='/dashboard/settings-integrations'>
                        <SlidersIcon />
                        <span>Settings & Integrations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:!size-5' />
                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                <DashboardBreadcrumbs />
              </div>
              <div className="flex items-center gap-1.5">
                <LanguageDropdown
                  trigger={
                    <Button variant="ghost" size="icon">
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant="ghost" size="icon" className="size-9.5">
                      <Avatar className="size-9.5 rounded-md">
                        <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>
          {children}
          {/*           
          <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  Shadcn/studio
                </a>
                , Made for better web design
              </p>
              <div className='flex items-center gap-5'>
                <a href='#'>
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#'>
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#'>
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#'>
                  <TwitterIcon className='size-4' />
                </a>
              </div>
            </div>
          </footer> */}
        </div>
      </SidebarProvider>
    </div>
  );
}
