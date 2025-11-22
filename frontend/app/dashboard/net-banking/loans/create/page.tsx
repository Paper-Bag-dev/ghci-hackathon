'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  HandCoinsIcon,
  DollarSignIcon,
  CalendarIcon,
  InfoIcon,
  ArrowLeftIcon,
  PercentIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function CreateLoanPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    purpose: '',
    tenure: '',
    employmentType: '',
    monthlyIncome: '',
    existingLoans: '',
    collateral: '',
    notes: ''
  })

  const [calculatedEMI, setCalculatedEMI] = useState(0)

  const calculateEMI = () => {
    const principal = parseFloat(formData.amount) || 0
    const rate = 8.5 / 12 / 100 // 8.5% annual rate
    const months = parseInt(formData.tenure) || 0

    if (principal && months) {
      const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      setCalculatedEMI(Math.round(emi))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Loan application submitted:', formData)
    router.push('/dashboard/net-banking/loans')
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-5xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6'>
          <Button variant='ghost' asChild className='mb-4'>
            <Link href='/dashboard/net-banking/loans'>
              <ArrowLeftIcon className='size-4 mr-2' />
              Back to Loans
            </Link>
          </Button>
          <h1 className='text-3xl font-bold'>Apply for Loan</h1>
          <p className='text-muted-foreground mt-2'>Submit your loan application</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6'>
            {/* Loan Details */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter the details of the loan you wish to apply for</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='loanType'>Loan Type *</Label>
                    <Select
                      value={formData.loanType}
                      onValueChange={(value) => setFormData({ ...formData, loanType: value })}
                    >
                      <SelectTrigger id='loanType'>
                        <SelectValue placeholder='Select loan type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='home'>Home Loan</SelectItem>
                        <SelectItem value='auto'>Car Loan</SelectItem>
                        <SelectItem value='personal'>Personal Loan</SelectItem>
                        <SelectItem value='education'>Education Loan</SelectItem>
                        <SelectItem value='business'>Business Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='amount'>Loan Amount *</Label>
                    <div className='relative'>
                      <DollarSignIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='amount'
                        type='number'
                        placeholder='50000'
                        value={formData.amount}
                        onChange={(e) => {
                          setFormData({ ...formData, amount: e.target.value })
                          calculateEMI()
                        }}
                        className='pl-10'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='tenure'>Loan Tenure (months) *</Label>
                    <div className='relative'>
                      <CalendarIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='tenure'
                        type='number'
                        placeholder='60'
                        value={formData.tenure}
                        onChange={(e) => {
                          setFormData({ ...formData, tenure: e.target.value })
                          calculateEMI()
                        }}
                        className='pl-10'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='purpose'>Loan Purpose *</Label>
                    <Input
                      id='purpose'
                      placeholder='e.g., Home purchase'
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {calculatedEMI > 0 && (
                  <div className='rounded-lg border border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20 p-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-green-900 dark:text-green-100'>
                        Estimated Monthly EMI
                      </span>
                      <span className='text-2xl font-bold text-green-700 dark:text-green-300'>
                        ${calculatedEMI.toLocaleString()}
                      </span>
                    </div>
                    <p className='text-xs text-green-700 dark:text-green-300 mt-1'>
                      At 8.5% annual interest rate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Employment & Income Details</CardTitle>
                <CardDescription>Provide your employment and financial information</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='employmentType'>Employment Type *</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                    >
                      <SelectTrigger id='employmentType'>
                        <SelectValue placeholder='Select employment type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='salaried'>Salaried</SelectItem>
                        <SelectItem value='self-employed'>Self Employed</SelectItem>
                        <SelectItem value='business'>Business Owner</SelectItem>
                        <SelectItem value='retired'>Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='monthlyIncome'>Monthly Income *</Label>
                    <div className='relative'>
                      <DollarSignIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='monthlyIncome'
                        type='number'
                        placeholder='5000'
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        className='pl-10'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='existingLoans'>Existing Loan EMIs</Label>
                    <div className='relative'>
                      <DollarSignIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='existingLoans'
                        type='number'
                        placeholder='1000'
                        value={formData.existingLoans}
                        onChange={(e) => setFormData({ ...formData, existingLoans: e.target.value })}
                        className='pl-10'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='collateral'>Collateral (if any)</Label>
                    <Input
                      id='collateral'
                      placeholder='e.g., Property, Vehicle'
                      value={formData.collateral}
                      onChange={(e) => setFormData({ ...formData, collateral: e.target.value })}
                    />
                  </div>

                  <div className='space-y-2 sm:col-span-2'>
                    <Label htmlFor='notes'>Additional Information</Label>
                    <Textarea
                      id='notes'
                      placeholder='Any additional details...'
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
                  <CardTitle className='text-blue-900 dark:text-blue-100'>Loan Application Guidelines</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='text-sm text-blue-800 dark:text-blue-200 space-y-2'>
                <p>• Loan approval is subject to credit score verification and documentation.</p>
                <p>• Processing fee may apply based on loan type and amount.</p>
                <p>• You will receive a call from our loan officer within 2-3 business days.</p>
                <p>• Ensure all documents (ID proof, income proof, address proof) are ready for verification.</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex gap-4'>
              <Button type='submit' size='lg' className='flex-1'>
                <HandCoinsIcon className='size-4 mr-2' />
                Submit Application
              </Button>
              <Button
                type='button'
                variant='outline'
                size='lg'
                onClick={() => router.push('/dashboard/net-banking/loans')}
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
