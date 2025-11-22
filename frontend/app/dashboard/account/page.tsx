'use client'

import { useState } from 'react'
import {
  WalletIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CreditCardIcon,
  DownloadIcon,
  FileTextIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowUpRight,
  ArrowDownRight,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  UserPlusIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { userAccounts, balanceHistory, accountStatements, taxDocuments } from '@/lib/mock-data/accounts'
import { bankingTransactions, bankingProfile } from '@/lib/banking-data'
import { formatDateTime, formatDate } from '@/lib/utils/date'

export default function AccountPage() {
  const [showBalance, setShowBalance] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: bankingProfile.name,
    email: bankingProfile.email,
    phone: '+1 (555) 123-4567',
    address: '123 Banking Street, New York, NY 10001',
    dateOfBirth: '1990-05-15'
  })

  // Calculate total balances
  const totalBalance = userAccounts.reduce((sum, acc) => {
    if (acc.accountType !== 'loan') {
      return sum + acc.balance
    }
    return sum
  }, 0)

  const totalAssets = userAccounts
    .filter(acc => acc.accountType === 'investment')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const totalSavings = userAccounts
    .filter(acc => acc.accountType === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const activeAccounts = userAccounts.filter(acc => acc.status === 'active').length
  const totalDocuments = accountStatements.length + taxDocuments.length

  // Overview statistics
  const overviewStatistics = [
    {
      icon: <WalletIcon className='size-4' />,
      value: showBalance ? `$${totalBalance.toLocaleString()}` : '$XXX,XXX',
      title: 'Total Balance',
      changePercentage: '+12.5%',
      action: (
        <Button
          variant='ghost'
          size='icon'
          className='size-6 hover:bg-primary/10'
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
        </Button>
      )
    },
    {
      icon: <TrendingUpIcon className='size-4' />,
      value: `$${totalAssets.toLocaleString()}`,
      title: 'Investments',
      changePercentage: '+18.3%'
    },
    {
      icon: <DollarSignIcon className='size-4' />,
      value: `$${totalSavings.toLocaleString()}`,
      title: 'Total Savings',
      changePercentage: '+8.7%'
    },
    {
      icon: <CreditCardIcon className='size-4' />,
      value: activeAccounts.toString(),
      title: 'Active Accounts',
      changePercentage: '+2'
    }
  ]

  // Settings statistics
  const settingsStatistics = [
    {
      icon: <UserIcon className='size-4' />,
      value: profile.name,
      title: 'Account Holder',
      changePercentage: 'Primary Account'
    },
    {
      icon: <LinkIcon className='size-4' />,
      value: activeAccounts.toString(),
      title: 'Active Accounts',
      changePercentage: userAccounts.length + ' total'
    },
    {
      icon: <FileTextIcon className='size-4' />,
      value: totalDocuments.toString(),
      title: 'Documents',
      changePercentage: 'Available'
    },
    {
      icon: <UserPlusIcon className='size-4' />,
      value: bankingProfile.memberSince,
      title: 'Member Since',
      changePercentage: 'Premium Member'
    }
  ]

  // Get account type badge color
  const getAccountTypeBadge = (type: string, status: string) => {
    if (status !== 'active') {
      return <Badge variant='outline' className='text-muted-foreground'>{status}</Badge>
    }

    const colors: Record<string, string> = {
      checking: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      savings: 'bg-green-500/10 text-green-700 dark:text-green-400',
      credit: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      investment: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
      loan: 'bg-red-500/10 text-red-700 dark:text-red-400'
    }
    return <Badge variant='outline' className={colors[type]}>{type}</Badge>
  }

  // Recent activity - last 5 transactions
  const recentActivity = bankingTransactions.slice(0, 5)

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <Tabs defaultValue='overview' className='space-y-6'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value='overview' className='space-y-6'>
            {/* Statistics Cards */}
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {overviewStatistics.map((card, index) => (
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

            {/* Balance History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Balance History</CardTitle>
                <CardDescription>Your account balance trends over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart data={balanceHistory}>
                    <defs>
                      <linearGradient id='colorChecking' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='hsl(var(--chart-1))' stopOpacity={0.3} />
                        <stop offset='95%' stopColor='hsl(var(--chart-1))' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='colorSavings' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='hsl(var(--chart-2))' stopOpacity={0.3} />
                        <stop offset='95%' stopColor='hsl(var(--chart-2))' stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id='colorInvestment' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='hsl(var(--chart-3))' stopOpacity={0.3} />
                        <stop offset='95%' stopColor='hsl(var(--chart-3))' stopOpacity={0} />
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
                    <Legend />
                    <Area
                      type='monotone'
                      dataKey='checking'
                      stroke='hsl(var(--chart-1))'
                      fillOpacity={1}
                      fill='url(#colorChecking)'
                      name='Checking'
                    />
                    <Area
                      type='monotone'
                      dataKey='savings'
                      stroke='hsl(var(--chart-2))'
                      fillOpacity={1}
                      fill='url(#colorSavings)'
                      name='Savings'
                    />
                    <Area
                      type='monotone'
                      dataKey='investment'
                      stroke='hsl(var(--chart-3))'
                      fillOpacity={1}
                      fill='url(#colorInvestment)'
                      name='Investment'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Account Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Accounts</CardTitle>
                  <CardDescription>Manage your banking accounts</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {userAccounts.map(account => (
                    <div
                      key={account.id}
                      className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                    >
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{account.nickname}</p>
                          {getAccountTypeBadge(account.accountType, account.status)}
                        </div>
                        <p className='text-sm text-muted-foreground'>{account.accountNumber}</p>
                        {account.interestRate && (
                          <p className='text-xs text-muted-foreground'>
                            {account.interestRate}% APY
                          </p>
                        )}
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold'>
                          {account.accountType === 'credit' ? 'Available' : 'Balance'}
                        </p>
                        <p className='text-lg font-bold'>
                          ${Math.abs(account.balance).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {recentActivity.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className='flex items-start gap-4 border-l-2 border-muted pl-4 pb-4 last:pb-0'
                    >
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium text-sm'>{transaction.name}</p>
                          <Badge
                            variant='outline'
                            className={
                              transaction.status === 'completed'
                                ? 'bg-green-500/10 text-green-700'
                                : transaction.status === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-700'
                                : 'bg-red-500/10 text-red-700'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>{transaction.description}</p>
                        <p className='text-xs text-muted-foreground'>
                          {formatDateTime(transaction.date)}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p
                          className={`font-semibold flex items-center ${
                            transaction.transactionType === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.transactionType === 'credit' ? (
                            <ArrowUpRight className='size-4' />
                          ) : (
                            <ArrowDownRight className='size-4' />
                          )}
                          ${transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Document Center */}
            <Card>
              <CardHeader>
                <CardTitle>Document Center</CardTitle>
                <CardDescription>Access your statements and tax documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                  {/* Statements */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold flex items-center gap-2'>
                      <FileTextIcon className='size-5' />
                      Account Statements
                    </h3>
                    <div className='space-y-2'>
                      {accountStatements.map(statement => {
                        const account = userAccounts.find(acc => acc.id === statement.accountId)
                        return (
                          <div
                            key={statement.id}
                            className='flex items-center justify-between rounded-lg border p-3'
                          >
                            <div>
                              <p className='font-medium text-sm'>{account?.nickname}</p>
                              <p className='text-xs text-muted-foreground'>
                                {new Date(statement.statementDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <Button variant='ghost' size='sm'>
                              <DownloadIcon className='size-4' />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tax Documents */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold flex items-center gap-2'>
                      <FileTextIcon className='size-5' />
                      Tax Documents
                    </h3>
                    <div className='space-y-2'>
                      {taxDocuments.map(doc => {
                        const account = userAccounts.find(acc => acc.id === doc.accountId)
                        return (
                          <div
                            key={doc.id}
                            className='flex items-center justify-between rounded-lg border p-3'
                          >
                            <div>
                              <p className='font-medium text-sm'>
                                {doc.documentType} - {doc.taxYear}
                              </p>
                              <p className='text-xs text-muted-foreground'>{account?.nickname}</p>
                              <p className='text-xs text-muted-foreground'>
                                ${doc.amount.toLocaleString()}
                              </p>
                            </div>
                            <Button variant='ghost' size='sm'>
                              <DownloadIcon className='size-4' />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value='settings' className='space-y-6'>
            {/* Statistics Cards */}
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {settingsStatistics.map((card, index) => (
                <StatisticsCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                  changePercentage={card.changePercentage}
                />
              ))}
            </div>

            <div className='grid gap-6 lg:grid-cols-3'>
              {/* Profile Information */}
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? 'default' : 'outline'}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='size-20'>
                      <AvatarImage src={bankingProfile.avatar} />
                      <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant='outline' size='sm'>
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Full Name</Label>
                      <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
                        <UserIcon className='size-4 text-muted-foreground' />
                        {isEditing ? (
                          <input
                            id='name'
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className='flex-1 bg-transparent outline-none'
                          />
                        ) : (
                          <span>{profile.name}</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email Address</Label>
                      <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
                        <MailIcon className='size-4 text-muted-foreground' />
                        {isEditing ? (
                          <input
                            id='email'
                            type='email'
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className='flex-1 bg-transparent outline-none'
                          />
                        ) : (
                          <span>{profile.email}</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
                        <PhoneIcon className='size-4 text-muted-foreground' />
                        {isEditing ? (
                          <input
                            id='phone'
                            type='tel'
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className='flex-1 bg-transparent outline-none'
                          />
                        ) : (
                          <span>{profile.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='dob'>Date of Birth</Label>
                      <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
                        <UserIcon className='size-4 text-muted-foreground' />
                        {isEditing ? (
                          <input
                            id='dob'
                            type='date'
                            value={profile.dateOfBirth}
                            onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                            className='flex-1 bg-transparent outline-none'
                          />
                        ) : (
                          <span>{formatDate(profile.dateOfBirth, 'medium')}</span>
                        )}
                      </div>
                    </div>

                    <div className='space-y-2 sm:col-span-2'>
                      <Label htmlFor='address'>Address</Label>
                      <div className='flex items-center gap-2 rounded-md border px-3 py-2'>
                        <MapPinIcon className='size-4 text-muted-foreground' />
                        {isEditing ? (
                          <input
                            id='address'
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            className='flex-1 bg-transparent outline-none'
                          />
                        ) : (
                          <span>{profile.address}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-3 pt-4 border-t'>
                    <Button variant='outline' className='flex-1'>
                      Change Password
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      Close Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Linked Accounts */}
              <Card className='lg:col-span-1'>
                <CardHeader>
                  <CardTitle>Linked Accounts</CardTitle>
                  <CardDescription>External accounts and connections</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='rounded-lg border p-4'>
                    <p className='font-medium text-sm mb-2'>No External Accounts</p>
                    <p className='text-sm text-muted-foreground mb-4'>
                      Link external accounts to view balances and transfer funds
                    </p>
                    <Button variant='outline' size='sm' className='w-full'>
                      <LinkIcon className='size-4 mr-2' />
                      Link Account
                    </Button>
                  </div>

                  <div className='rounded-lg border p-4'>
                    <p className='font-medium text-sm mb-2'>Authorized Users</p>
                    <p className='text-sm text-muted-foreground mb-4'>
                      Manage users with access to your accounts
                    </p>
                    <Button variant='outline' size='sm' className='w-full'>
                      <UserPlusIcon className='size-4 mr-2' />
                      Add User
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document Center */}
            <Card>
              <CardHeader>
                <CardTitle>Document Center</CardTitle>
                <CardDescription>Access your statements, tax documents, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                  {/* Statements */}
                  <div className='space-y-3'>
                    <h3 className='font-semibold flex items-center gap-2'>
                      <FileTextIcon className='size-5' />
                      Account Statements
                    </h3>
                    <div className='space-y-2'>
                      {accountStatements.map(statement => {
                        const account = userAccounts.find(acc => acc.id === statement.accountId)
                        return (
                          <div
                            key={statement.id}
                            className='flex items-center justify-between rounded-lg border p-3'
                          >
                            <div>
                              <p className='font-medium text-sm'>{account?.nickname}</p>
                              <p className='text-xs text-muted-foreground'>
                                {new Date(statement.statementDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <Button variant='ghost' size='sm'>
                              <DownloadIcon className='size-4' />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Tax Documents */}
                  <div className='space-y-3'>
                    <h3 className='font-semibold flex items-center gap-2'>
                      <FileTextIcon className='size-5' />
                      Tax Documents
                    </h3>
                    <div className='space-y-2'>
                      {taxDocuments.map(doc => {
                        const account = userAccounts.find(acc => acc.id === doc.accountId)
                        return (
                          <div
                            key={doc.id}
                            className='flex items-center justify-between rounded-lg border p-3'
                          >
                            <div>
                              <p className='font-medium text-sm'>
                                {doc.documentType} - {doc.taxYear}
                              </p>
                              <p className='text-xs text-muted-foreground'>{account?.nickname}</p>
                              <p className='text-xs text-muted-foreground'>
                                ${doc.amount.toLocaleString()}
                              </p>
                            </div>
                            <Button variant='ghost' size='sm'>
                              <DownloadIcon className='size-4' />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
