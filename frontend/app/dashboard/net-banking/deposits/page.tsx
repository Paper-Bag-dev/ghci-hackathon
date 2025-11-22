'use client'

import {
  PiggyBankIcon,
  DollarSignIcon,
  PercentIcon,
  TrendingUpIcon,
  CalendarIcon,
  PlusCircleIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'

const deposits = [
  {
    id: '1',
    name: 'Fixed Deposit - 1 Year',
    type: 'Fixed Deposit',
    amount: 50000,
    interestRate: 6.5,
    maturityAmount: 53250,
    startDate: '2024-01-01',
    maturityDate: '2025-01-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Recurring Deposit',
    type: 'Recurring Deposit',
    amount: 1000,
    interestRate: 6.0,
    maturityAmount: 12360,
    startDate: '2024-01-01',
    maturityDate: '2025-01-01',
    status: 'active',
    monthlyDeposit: 1000
  },
  {
    id: '3',
    name: 'Fixed Deposit - 3 Years',
    type: 'Fixed Deposit',
    amount: 100000,
    interestRate: 7.2,
    maturityAmount: 123166,
    startDate: '2023-01-01',
    maturityDate: '2026-01-01',
    status: 'active'
  }
]

export default function DepositsPage() {
  const totalDeposited = deposits.reduce((sum, dep) => {
    if (dep.type === 'Recurring Deposit' && dep.monthlyDeposit) {
      const months = Math.floor((new Date(dep.maturityDate).getTime() - new Date(dep.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
      return sum + (dep.monthlyDeposit * months)
    }
    return sum + dep.amount
  }, 0)
  const totalMaturityValue = deposits.reduce((sum, dep) => sum + dep.maturityAmount, 0)
  const totalInterest = totalMaturityValue - totalDeposited
  const avgInterestRate = (deposits.reduce((sum, dep) => sum + dep.interestRate, 0) / deposits.length).toFixed(2)

  const statisticsCardData = [
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalDeposited.toLocaleString()}`,
      title: 'Total Deposited',
      changePercentage: `${deposits.length} deposits`
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: `$${totalMaturityValue.toLocaleString()}`,
      title: 'Maturity Value',
      changePercentage: 'Total'
    },
    {
      icon: <PiggyBankIcon className='size-4' />,
      value: `$${totalInterest.toLocaleString()}`,
      title: 'Interest Earned',
      changePercentage: 'Projected'
    },
    {
      icon: <PercentIcon className='size-4' />,
      value: `${avgInterestRate}%`,
      title: 'Avg Interest Rate',
      changePercentage: 'p.a.'
    }
  ]

  const getDaysRemaining = (maturityDate: string) => {
    const days = Math.ceil((new Date(maturityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Deposits</h1>
            <p className='text-muted-foreground mt-2'>View and manage your deposit accounts</p>
          </div>
          <Button>
            <PlusCircleIcon className='size-4 mr-2' />
            New Deposit
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

          {/* Deposits List */}
          <div className='space-y-4'>
            {deposits.map(deposit => {
              const daysRemaining = getDaysRemaining(deposit.maturityDate)
              return (
                <Card key={deposit.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle>{deposit.name}</CardTitle>
                        <CardDescription>{deposit.type}</CardDescription>
                      </div>
                      <Badge variant='outline' className='bg-green-500/10 text-green-700'>
                        {deposit.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>
                            {deposit.type === 'Recurring Deposit' ? 'Monthly Deposit' : 'Principal Amount'}
                          </p>
                          <p className='font-semibold'>${deposit.type === 'Recurring Deposit' && deposit.monthlyDeposit ? deposit.monthlyDeposit.toLocaleString() : deposit.amount.toLocaleString()}</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Maturity Amount</p>
                          <p className='font-semibold text-green-600'>${deposit.maturityAmount.toLocaleString()}</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Interest Rate</p>
                          <p className='font-semibold'>{deposit.interestRate}% p.a.</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Interest Earned</p>
                          <p className='font-semibold text-blue-600'>
                            ${(deposit.maturityAmount - (deposit.type === 'Recurring Deposit' && deposit.monthlyDeposit ? deposit.monthlyDeposit * 12 : deposit.amount)).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-4 border-t'>
                        <div className='flex items-center gap-4 text-sm'>
                          <div className='flex items-center gap-1 text-muted-foreground'>
                            <CalendarIcon className='size-4' />
                            <span>Start: {new Date(deposit.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className='flex items-center gap-1 text-muted-foreground'>
                            <CalendarIcon className='size-4' />
                            <span>Maturity: {new Date(deposit.maturityDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge variant='outline'>
                          {daysRemaining} days remaining
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Information Card */}
          <Card className='border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20'>
            <CardHeader>
              <CardTitle className='text-blue-900 dark:text-blue-100'>Deposit Benefits</CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-blue-800 dark:text-blue-200 space-y-2'>
              <p>• Guaranteed returns with competitive interest rates</p>
              <p>• Flexible tenure options from 6 months to 10 years</p>
              <p>• Premature withdrawal available with minimal penalty</p>
              <p>• Auto-renewal option for hassle-free reinvestment</p>
              <p>• Loan facility against fixed deposits up to 90% of deposit value</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
