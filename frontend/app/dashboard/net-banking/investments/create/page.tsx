'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TrendingUpIcon,
  DollarSignIcon,
  CalendarIcon,
  InfoIcon,
  ArrowLeftIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function CreateInvestmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
    units: '',
    riskLevel: '',
    expectedReturns: '',
    duration: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Investment created:', formData)
    router.push('/dashboard/net-banking/investments')
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-5xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6'>
          <Button variant='ghost' asChild className='mb-4'>
            <Link href='/dashboard/net-banking/investments'>
              <ArrowLeftIcon className='size-4 mr-2' />
              Back to Investments
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Create New Investment</h1>
          <p className='text-muted-foreground mt-2'>Add a new investment to your portfolio</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Enter the basic details of your investment</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Investment Name *</Label>
                    <Input
                      id='name'
                      placeholder='e.g., S&P 500 Index Fund'
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='type'>Investment Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id='type'>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='stocks'>Stocks</SelectItem>
                        <SelectItem value='mutual-fund'>Mutual Fund</SelectItem>
                        <SelectItem value='bonds'>Bonds</SelectItem>
                        <SelectItem value='reit'>REIT</SelectItem>
                        <SelectItem value='etf'>ETF</SelectItem>
                        <SelectItem value='crypto'>Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='amount'>Investment Amount *</Label>
                    <div className='relative'>
                      <DollarSignIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='amount'
                        type='number'
                        placeholder='10000'
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className='pl-10'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='units'>Number of Units *</Label>
                    <Input
                      id='units'
                      type='number'
                      placeholder='100'
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='riskLevel'>Risk Level *</Label>
                    <Select
                      value={formData.riskLevel}
                      onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}
                    >
                      <SelectTrigger id='riskLevel'>
                        <SelectValue placeholder='Select risk level' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='low'>Low Risk</SelectItem>
                        <SelectItem value='moderate'>Moderate Risk</SelectItem>
                        <SelectItem value='high'>High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='expectedReturns'>Expected Annual Returns (%)</Label>
                    <Input
                      id='expectedReturns'
                      type='number'
                      step='0.01'
                      placeholder='8.5'
                      value={formData.expectedReturns}
                      onChange={(e) => setFormData({ ...formData, expectedReturns: e.target.value })}
                    />
                  </div>

                  <div className='space-y-2 sm:col-span-2'>
                    <Label htmlFor='duration'>Investment Duration</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) => setFormData({ ...formData, duration: value })}
                    >
                      <SelectTrigger id='duration'>
                        <SelectValue placeholder='Select duration' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='short'>Short Term (&lt; 1 year)</SelectItem>
                        <SelectItem value='medium'>Medium Term (1-5 years)</SelectItem>
                        <SelectItem value='long'>Long Term (&gt; 5 years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2 sm:col-span-2'>
                    <Label htmlFor='notes'>Additional Notes</Label>
                    <Textarea
                      id='notes'
                      placeholder='Any additional information about this investment...'
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className='border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20'>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <InfoIcon className='size-5 text-blue-600 dark:text-blue-400' />
                  <CardTitle className='text-blue-900 dark:text-blue-100'>Important Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='text-sm text-blue-800 dark:text-blue-200 space-y-2'>
                <p>• All investments are subject to market risks. Please read all scheme related documents carefully.</p>
                <p>• Past performance is not indicative of future returns.</p>
                <p>• Ensure you understand the risks involved before investing.</p>
                <p>• Consult with a financial advisor if you need investment guidance.</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <Button type='submit' size='lg' className='flex-1'>
                <TrendingUpIcon className='size-4 mr-2' />
                Create Investment
              </Button>
              <Button
                type='button'
                variant='outline'
                size='lg'
                onClick={() => router.push('/dashboard/net-banking/investments')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
