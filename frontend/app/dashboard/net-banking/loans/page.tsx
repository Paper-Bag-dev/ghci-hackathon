'use client'

import Link from 'next/link'
import {
  HandCoinsIcon,
  DollarSignIcon,
  PercentIcon,
  PlusCircleIcon,
  CalendarIcon,
  CreditCardIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'

const loans = [
  {
    id: '1',
    name: 'Home Loan',
    type: 'Mortgage',
    principal: 285000,
    outstanding: 245000,
    emi: 2450,
    interestRate: 6.5,
    tenure: 240,
    remainingMonths: 198,
    nextDueDate: '2025-01-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Car Loan',
    type: 'Auto',
    principal: 45000,
    outstanding: 28000,
    emi: 890,
    interestRate: 7.2,
    tenure: 60,
    remainingMonths: 32,
    nextDueDate: '2025-01-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Personal Loan',
    type: 'Personal',
    principal: 25000,
    outstanding: 12000,
    emi: 650,
    interestRate: 9.5,
    tenure: 48,
    remainingMonths: 18,
    nextDueDate: '2025-01-01',
    status: 'active'
  }
]

export default function LoansPage() {
  const totalPrincipal = loans.reduce((sum, loan) => sum + loan.principal, 0)
  const totalOutstanding = loans.reduce((sum, loan) => sum + loan.outstanding, 0)
  const totalEMI = loans.reduce((sum, loan) => sum + loan.emi, 0)
  const totalPaid = totalPrincipal - totalOutstanding

  const statisticsCardData = [
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalPrincipal.toLocaleString()}`,
      title: 'Total Borrowed',
      changePercentage: `${loans.length} loans`
    },
    {
      icon: <HandCoinsIcon className='size-4' />,
      value: `$${totalOutstanding.toLocaleString()}`,
      title: 'Total Outstanding',
      changePercentage: 'Current'
    },
    {
      icon: <CreditCardIcon className='size-4' />,
      value: `$${totalEMI.toLocaleString()}`,
      title: 'Monthly EMI',
      changePercentage: 'Total'
    },
    {
      icon: <PercentIcon className='size-4' />,
      value: `${((totalPaid / totalPrincipal) * 100).toFixed(1)}%`,
      title: 'Repaid',
      changePercentage: `$${totalPaid.toLocaleString()}`
    }
  ]

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Loans</h1>
            <p className='text-muted-foreground mt-2'>Manage your loan accounts and payments</p>
          </div>
          <Button asChild>
            <Link href='/dashboard/net-banking/loans/create'>
              <PlusCircleIcon className='size-4 mr-2' />
              Apply for Loan
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

          {/* Loans List */}
          <div className='space-y-4'>
            {loans.map(loan => {
              const repaidPercentage = ((loan.principal - loan.outstanding) / loan.principal) * 100
              return (
                <Card key={loan.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle>{loan.name}</CardTitle>
                        <CardDescription>{loan.type} Loan</CardDescription>
                      </div>
                      <Badge variant='outline' className='bg-green-500/10 text-green-700'>
                        {loan.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Loan Progress</span>
                          <span className='font-semibold'>{repaidPercentage.toFixed(1)}% Repaid</span>
                        </div>
                        <Progress value={repaidPercentage} className='h-2' />
                      </div>

                      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Principal Amount</p>
                          <p className='font-semibold'>${loan.principal.toLocaleString()}</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Outstanding</p>
                          <p className='font-semibold'>${loan.outstanding.toLocaleString()}</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Monthly EMI</p>
                          <p className='font-semibold'>${loan.emi.toLocaleString()}</p>
                        </div>
                        <div className='space-y-1'>
                          <p className='text-xs text-muted-foreground'>Interest Rate</p>
                          <p className='font-semibold'>{loan.interestRate}% p.a.</p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-4 border-t'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <CalendarIcon className='size-4' />
                          <span>Next Payment: {new Date(loan.nextDueDate).toLocaleDateString()}</span>
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {loan.remainingMonths} months remaining
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
