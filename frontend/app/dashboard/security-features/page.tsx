'use client'

import { useState } from 'react'
import {
  ShieldCheckIcon,
  SmartphoneIcon,
  LockIcon,
  EyeIcon,
  MapPinIcon,
  XCircleIcon,
  CheckCircle2Icon,
  AlertTriangleIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'
import { formatDateTime } from '@/lib/utils/date'

// Mock security data
interface Device {
  id: string
  name: string
  type: 'desktop' | 'mobile' | 'tablet'
  os: string
  browser: string
  lastActive: string
  location: string
  isCurrent: boolean
  trusted: boolean
}

interface LoginHistory {
  id: string
  timestamp: string
  device: string
  location: string
  ipAddress: string
  status: 'success' | 'failed' | 'blocked'
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Windows Desktop',
    type: 'desktop',
    os: 'Windows 11',
    browser: 'Chrome 120',
    lastActive: '2025-11-21T10:30:00',
    location: 'New York, NY',
    isCurrent: true,
    trusted: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    type: 'mobile',
    os: 'iOS 17.2',
    browser: 'Safari',
    lastActive: '2025-11-20T15:45:00',
    location: 'New York, NY',
    isCurrent: false,
    trusted: true
  },
  {
    id: '3',
    name: 'MacBook Pro',
    type: 'desktop',
    os: 'macOS 14',
    browser: 'Safari 17',
    lastActive: '2025-11-19T09:20:00',
    location: 'New York, NY',
    isCurrent: false,
    trusted: true
  },
  {
    id: '4',
    name: 'iPad Air',
    type: 'tablet',
    os: 'iPadOS 17',
    browser: 'Safari',
    lastActive: '2025-11-17T18:30:00',
    location: 'Brooklyn, NY',
    isCurrent: false,
    trusted: true
  }
]

const mockLoginHistory: LoginHistory[] = [
  {
    id: '1',
    timestamp: '2025-11-21T10:30:00',
    device: 'Windows Desktop - Chrome',
    location: 'New York, NY',
    ipAddress: '192.168.1.100',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2025-11-20T15:45:00',
    device: 'iPhone 15 Pro - Safari',
    location: 'New York, NY',
    ipAddress: '192.168.1.101',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2025-11-20T03:15:00',
    device: 'Unknown Device - Chrome',
    location: 'Los Angeles, CA',
    ipAddress: '203.45.67.89',
    status: 'blocked'
  },
  {
    id: '4',
    timestamp: '2025-11-19T09:20:00',
    device: 'MacBook Pro - Safari',
    location: 'New York, NY',
    ipAddress: '192.168.1.102',
    status: 'success'
  },
  {
    id: '5',
    timestamp: '2025-11-18T21:10:00',
    device: 'Unknown Device',
    location: 'Miami, FL',
    ipAddress: '156.78.90.123',
    status: 'failed'
  },
  {
    id: '6',
    timestamp: '2025-11-17T18:30:00',
    device: 'iPad Air - Safari',
    location: 'Brooklyn, NY',
    ipAddress: '192.168.1.103',
    status: 'success'
  }
]

export default function SecurityFeatures() {
  const [devices, setDevices] = useState(mockDevices)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [biometric, setBiometric] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [cardLock, setCardLock] = useState(false)

  const successfulLogins = mockLoginHistory.filter(l => l.status === 'success').length
  const blockedAttempts = mockLoginHistory.filter(l => l.status === 'blocked').length
  const failedAttempts = mockLoginHistory.filter(l => l.status === 'failed').length
  const securityScore = 92 // Mock security score

  const statisticsCardData = [
    {
      icon: <ShieldCheckIcon className='size-4' />,
      value: `${securityScore}%`,
      title: 'Security Score',
      changePercentage: 'Excellent'
    },
    {
      icon: <SmartphoneIcon className='size-4' />,
      value: devices.filter(d => d.trusted).length.toString(),
      title: 'Trusted Devices',
      changePercentage: devices.length + ' total'
    },
    {
      icon: <LockIcon className='size-4' />,
      value: blockedAttempts.toString(),
      title: 'Blocked Attempts',
      changePercentage: 'Last 30 days'
    },
    {
      icon: <EyeIcon className='size-4' />,
      value: successfulLogins.toString(),
      title: 'Successful Logins',
      changePercentage: 'Last 30 days'
    }
  ]

  const getStatusBadge = (status: LoginHistory['status']) => {
    const config = {
      success: { color: 'bg-green-500/10 text-green-700 dark:text-green-400', icon: CheckCircle2Icon },
      failed: { color: 'bg-red-500/10 text-red-700 dark:text-red-400', icon: XCircleIcon },
      blocked: { color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400', icon: AlertTriangleIcon }
    }
    const { color, icon: Icon } = config[status]
    return (
      <Badge variant='outline' className={`${color} flex items-center gap-1`}>
        <Icon className='size-3' />
        {status}
      </Badge>
    )
  }

  const revokeDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id))
  }

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

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-1'>
                      <Label className='font-medium'>Two-Factor Authentication</Label>
                      <p className='text-sm text-muted-foreground'>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>

                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-1'>
                      <Label className='font-medium'>Biometric Authentication</Label>
                      <p className='text-sm text-muted-foreground'>
                        Use fingerprint or face ID to log in
                      </p>
                    </div>
                    <Switch
                      checked={biometric}
                      onCheckedChange={setBiometric}
                    />
                  </div>

                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-1'>
                      <Label className='font-medium'>Login Alerts</Label>
                      <p className='text-sm text-muted-foreground'>
                        Get notified of new login attempts
                      </p>
                    </div>
                    <Switch
                      checked={loginAlerts}
                      onCheckedChange={setLoginAlerts}
                    />
                  </div>

                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-1'>
                      <Label className='font-medium'>Card Lock</Label>
                      <p className='text-sm text-muted-foreground'>
                        Temporarily freeze all your cards
                      </p>
                    </div>
                    <Switch
                      checked={cardLock}
                      onCheckedChange={setCardLock}
                    />
                  </div>
                </div>

                <div className='space-y-3 pt-4 border-t'>
                  <Button variant='outline' className='w-full'>
                    <LockIcon className='size-4 mr-2' />
                    Change Password
                  </Button>
                  <Button variant='outline' className='w-full'>
                    <ShieldCheckIcon className='size-4 mr-2' />
                    Security Checkup
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trusted Devices */}
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle>Trusted Devices</CardTitle>
                    <CardDescription>Manage devices with access to your account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                {devices.map(device => (
                  <div
                    key={device.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='mt-1'>
                        <SmartphoneIcon className='size-5 text-muted-foreground' />
                      </div>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{device.name}</p>
                          {device.isCurrent && (
                            <Badge variant='default' className='h-5 px-1.5 text-xs'>Current</Badge>
                          )}
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {device.os} • {device.browser}
                        </p>
                        <p className='text-xs text-muted-foreground flex items-center gap-1'>
                          <MapPinIcon className='size-3' />
                          {device.location}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Last active: {formatDateTime(device.lastActive)}
                        </p>
                      </div>
                    </div>
                    {!device.isCurrent && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => revokeDevice(device.id)}
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Login History */}
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent account access activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {mockLoginHistory.map(login => (
                  <div
                    key={login.id}
                    className='flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50'
                  >
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{login.device}</p>
                        {getStatusBadge(login.status)}
                      </div>
                      <p className='text-sm text-muted-foreground flex items-center gap-1'>
                        <MapPinIcon className='size-3' />
                        {login.location} • {login.ipAddress}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {formatDateTime(login.timestamp)}
                      </p>
                    </div>
                    {login.status !== 'success' && (
                      <Button variant='outline' size='sm'>
                        Report
                      </Button>
                    )}
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
