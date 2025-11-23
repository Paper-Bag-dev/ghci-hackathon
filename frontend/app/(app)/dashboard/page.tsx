"use client";

import { useEffect, useState } from "react";
import {
  WalletIcon,
  TrendingUpIcon,
  ClockIcon,
  PiggyBankIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ProductInsightsCard from "@/components/shadcn-studio/blocks/widget-product-insights";
import SalesMetricsCard from "@/components/shadcn-studio/blocks/chart-sales-metrics";
import StatisticsCard from "@/components/shadcn-studio/blocks/statistics-card-01";
import TotalEarningCard from "@/components/shadcn-studio/blocks/widget-total-earning";
import TransactionDatatable from "@/components/shadcn-studio/blocks/datatable-transaction";

import { accountPortfolioData, bankingTransactions } from "@/lib/banking-data";
import axios from "axios";
import { useAppContext } from "@/context";

// Transaction table data - Use banking transactions from data file
const transactionData = bankingTransactions.slice(0, 25);

// Transform portfolio data to match TotalEarningCard expected format
const portfolioData = accountPortfolioData.map((account) => ({
  img: account.img,
  platform: account.accountType,
  technologies: account.accountNumber,
  earnings: account.balance,
  progressPercentage: account.allocationPercentage,
}));

export default function Dashboard() {
  // State for balance visibility
  const [showBalance, setShowBalance] = useState(false);
  const { user, setUser } = useAppContext();
  // Statistics card data - Banking Metrics
  const StatisticsCardData = [
    {
      icon: <WalletIcon className="size-4" />,
      value: showBalance ? "$ 567" : "$ XXX,XXX",
      title: "Available Balance",
      changePercentage: "+12.5%",
      action: (
        <Button
          variant="ghost"
          size="icon"
          className="size-6 hover:bg-primary/10"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </Button>
      ),
    },
    {
      icon: <TrendingUpIcon className="size-4" />,
      value: "$1,245,890.67",
      title: "Total Investments",
      changePercentage: "+18.3%",
    },
    {
      icon: <ClockIcon className="size-4" />,
      value: "12",
      title: "Pending Transactions",
      changePercentage: "$23,456.78",
    },
    {
      icon: <PiggyBankIcon className="size-4" />,
      value: "$15,234.90",
      title: "Monthly Savings",
      changePercentage: "+24.1%",
    },
  ];

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/protected/user`,
  //       { withCredentials: true }
  //     );
  //     console.log("user Data: ", data.user);
  //     setUser(data.user);
  //   };
  //   fetchUserData();
  // }, []);

  return (
    <div className="p-6">
      <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {/* Statistics Cards - Banking Metrics */}
          <div className="col-span-full grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {StatisticsCardData.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
                action={card.action}
              />
            ))}
          </div>

          <div className="grid gap-6 max-xl:col-span-full lg:max-xl:grid-cols-2">
            {/* Account Activity Card */}
            <ProductInsightsCard className="justify-between gap-3 [&>[data-slot=card-content]]:space-y-5" />

            {/* Account Portfolio Card */}
            <TotalEarningCard
              title="Account Portfolio"
              earning={1245890}
              trend="up"
              percentage={8.5}
              comparisonText="Growth compared to last quarter"
              earningData={portfolioData}
              className="justify-between gap-5 sm:min-w-0 [&>[data-slot=card-content]]:space-y-7"
            />
          </div>

          <SalesMetricsCard className="col-span-full xl:col-span-2 [&>[data-slot=card-content]]:space-y-6" />

          <Card className="col-span-full w-full py-0">
            <TransactionDatatable data={transactionData} />
          </Card>
        </div>
      </main>
    </div>
  );
}
