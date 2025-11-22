'use client'

import { useState } from 'react'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  CalendarIcon,
  ShieldIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { bankingProfile } from '@/lib/banking-data'
import { formatDate } from '@/lib/utils/date'

export default function UserDataPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: bankingProfile.name,
    email: bankingProfile.email,
    phone: '+1 (555) 123-4567',
    address: '123 Banking Street, New York, NY 10001',
    dateOfBirth: '1990-05-15',
    accountNumber: 'ACC-2024-001234',
    customerId: 'CUST-897654'
  })

  const statisticsCardData = [
    {
      icon: <UserIcon className='size-4' />,
      value: profile.name,
      title: 'Account Holder',
      changePercentage: 'Verified'
    },
    {
      icon: <CreditCardIcon className='size-4' />,
      value: profile.accountNumber,
      title: 'Account Number',
      changePercentage: 'Active'
    },
    {
      icon: <ShieldIcon className='size-4' />,
      value: 'Premium',
      title: 'Account Type',
      changePercentage: bankingProfile.memberSince
    },
    {
      icon: <CalendarIcon className='size-4' />,
      value: profile.customerId,
      title: 'Customer ID',
      changePercentage: 'Verified'
    }
  ]

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>User Data</h1>
          <p className='text-muted-foreground mt-2'>Manage your personal information and account details</p>
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

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
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
                <Avatar className='size-24'>
                  <AvatarImage src={bankingProfile.avatar} />
                  <AvatarFallback className='text-xl'>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-xl font-semibold'>{profile.name}</h3>
                  <p className='text-sm text-muted-foreground'>Member since {bankingProfile.memberSince}</p>
                  <Badge className='mt-2'>Premium Account</Badge>
                </div>
                {isEditing && (
                  <Button variant='outline' size='sm' className='ml-auto'>
                    Change Photo
                  </Button>
                )}
              </div>

              <div className='grid gap-6 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <div className='relative'>
                    <UserIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      id='name'
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <div className='relative'>
                    <MailIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      id='email'
                      type='email'
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <div className='relative'>
                    <PhoneIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      id='phone'
                      type='tel'
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='dob'>Date of Birth</Label>
                  <div className='relative'>
                    <CalendarIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      id='dob'
                      type='date'
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='space-y-2 sm:col-span-2'>
                  <Label htmlFor='address'>Address</Label>
                  <div className='relative'>
                    <MapPinIcon className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      id='address'
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      className='pl-10'
                    />
                  </div>
                </div>
              </div>

              <div className='flex gap-3 pt-4 border-t'>
                <Button variant='outline' className='flex-1'>
                  Change Password
                </Button>
                <Button variant='outline' className='flex-1 text-destructive hover:bg-destructive/10'>
                  Close Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>View your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='rounded-lg border p-4'>
                  <p className='text-sm text-muted-foreground mb-1'>Account Number</p>
                  <p className='font-semibold'>{profile.accountNumber}</p>
                </div>
                <div className='rounded-lg border p-4'>
                  <p className='text-sm text-muted-foreground mb-1'>Customer ID</p>
                  <p className='font-semibold'>{profile.customerId}</p>
                </div>
                <div className='rounded-lg border p-4'>
                  <p className='text-sm text-muted-foreground mb-1'>Account Status</p>
                  <Badge variant='outline' className='bg-green-500/10 text-green-700'>Active</Badge>
                </div>
                <div className='rounded-lg border p-4'>
                  <p className='text-sm text-muted-foreground mb-1'>Member Since</p>
                  <p className='font-semibold'>{bankingProfile.memberSince}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
