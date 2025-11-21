'use client'

import { useState } from 'react'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  FileTextIcon,
  DownloadIcon,
  LinkIcon,
  UserPlusIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { bankingProfile } from '@/lib/banking-data'
import { userAccounts, accountStatements, taxDocuments } from '@/lib/mock-data/accounts'
import { formatDate } from '@/lib/utils/date'

export default function AccountManagement() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: bankingProfile.name,
    email: bankingProfile.email,
    phone: '+1 (555) 123-4567',
    address: '123 Banking Street, New York, NY 10001',
    dateOfBirth: '1990-05-15'
  })

  const activeAccounts = userAccounts.filter(acc => acc.status === 'active').length
  const totalDocuments = accountStatements.length + taxDocuments.length

  const statisticsCardData = [
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

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
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
        </div>
      </main>
    </div>
  )
}
