'use client'

import Link from 'next/link'
import {
  TrendingUpIcon,
  DollarSignIcon,
  PercentIcon,
  PlusCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const investments = [
  {
    id: '1',
    name: 'S&P 500 Index Fund',
    type: 'Mutual Fund',
    amount: 245890.67,
    units: 1234.56,
    currentValue: 252300.45,
    purchaseDate: '2023-01-15',
    returns: 2.61,
    status: 'active'
  },
  {
    id: '2',
    name: 'Tech Stocks Portfolio',
    type: 'Stocks',
    amount: 125000.00,
    units: 500,
    currentValue: 138750.00,
    purchaseDate: '2023-03-20',
    returns: 11.00,
    status: 'active'
  },
  {
    id: '3',
    name: 'Corporate Bonds',
    type: 'Bonds',
    amount: 100000.00,
    units: 100,
    currentValue: 103500.00,
    purchaseDate: '2023-06-10',
    returns: 3.50,
    status: 'active'
  },
  {
    id: '4',
    name: 'Real Estate Fund',
    type: 'REIT',
    amount: 75000.00,
    units: 750,
    currentValue: 79500.00,
    purchaseDate: '2023-09-05',
    returns: 6.00,
    status: 'active'
  }
]

const performanceData = [
  { month: 'Jan', value: 545000 },
  { month: 'Feb', value: 558000 },
  { month: 'Mar', value: 552000 },
  { month: 'Apr', value: 565000 },
  { month: 'May', value: 571000 },
  { month: 'Jun', value: 574000 }
]

export default function InvestmentsPage() {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturns = totalCurrentValue - totalInvested
  const returnsPercentage = ((totalReturns / totalInvested) * 100).toFixed(2)

  const statisticsCardData = [
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalInvested.toLocaleString()}`,
      title: 'Total Invested',
      changePercentage: `${investments.length} investments`
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: `$${totalCurrentValue.toLocaleString()}`,
      title: 'Current Value',
      changePercentage: `+${returnsPercentage}%`
    },
    {
      icon: <ArrowUpIcon className='size-4' />,
      value: `$${totalReturns.toLocaleString()}`,
      title: 'Total Returns',
      changePercentage: '+' + returnsPercentage + '%'
    },
    {
      icon: <PercentIcon className='size-4' />,
      value: returnsPercentage + '%',
      title: 'Overall Return',
      changePercentage: 'Lifetime'
    }
  ]

  const getReturnsBadge = (returns: number) => {
    if (returns > 0) {
      return <Badge variant='outline' className='bg-green-500/10 text-green-700'>
        <ArrowUpIcon className='size-3 mr-1' />
        +{returns.toFixed(2)}%
      </Badge>
    }
    return <Badge variant='outline' className='bg-red-500/10 text-red-700'>
      <ArrowDownIcon className='size-3 mr-1' />
      {returns.toFixed(2)}%
    </Badge>
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Investments</h1>
            <p className='text-muted-foreground mt-2'>Track and manage your investment portfolio</p>
          </div>
          <Button asChild>
            <Link href='/dashboard/net-banking/investments/create'>
              <PlusCircleIcon className='size-4 mr-2' />
              New Investment
            </Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {/* Statistics Cards */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {statisticsCardData.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
              />
            ))}
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your investment portfolio value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='hsl(var(--chart-1))' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='hsl(var(--chart-1))' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
                  <XAxis dataKey='month' className='text-xs text-muted-foreground' />
                  <YAxis className='text-xs text-muted-foreground' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Area
                    type='monotone'
                    dataKey='value'
                    stroke='hsl(var(--chart-1))'
                    fillOpacity={1}
                    fill='url(#colorValue)'
                    name='Portfolio Value'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Investments List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
              <CardDescription>All your active investment holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {investments.map(investment => (
                  <div
                    key={investment.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='space-y-2'>
                      <div className='flex items-center gap-3'>
                        <div>
                          <p className='font-semibold'>{investment.name}</p>
                          <p className='text-sm text-muted-foreground'>{investment.type}</p>
                        </div>
                        {getReturnsBadge(investment.returns)}
                      </div>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <CalendarIcon className='size-3' />
                          <span>Purchased: {new Date(investment.purchaseDate).toLocaleDateString()}</span>
                        </div>
                        <div>Units: {investment.units.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className='text-right space-y-1'>
                      <p className='text-sm text-muted-foreground'>Current Value</p>
                      <p className='text-xl font-bold'>${investment.currentValue.toLocaleString()}</p>
                      <p className='text-xs text-muted-foreground'>
                        Invested: ${investment.amount.toLocaleString()}
                      </p>
                      <p className={`text-sm font-semibold ${investment.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.returns > 0 ? '+' : ''}${(investment.currentValue - investment.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
