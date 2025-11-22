'use client'

import { useState } from 'react'
import {
  SettingsIcon,
  ShieldIcon,
  BellIcon,
  PaletteIcon,
  LanguagesIcon,
  LockIcon,
  MailIcon,
  SmartphoneIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    transactionAlerts: true,
    marketingEmails: false,
    twoFactorAuth: true,
    biometricAuth: false,
    sessionTimeout: '30',
    theme: 'system',
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-5xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground mt-2'>Manage your account preferences and security settings</p>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <BellIcon className='size-5' />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='email-notifications' className='text-base'>Email Notifications</Label>
                  <p className='text-sm text-muted-foreground'>Receive notifications via email</p>
                </div>
                <Switch
                  id='email-notifications'
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='sms-notifications' className='text-base'>SMS Notifications</Label>
                  <p className='text-sm text-muted-foreground'>Receive important alerts via SMS</p>
                </div>
                <Switch
                  id='sms-notifications'
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='push-notifications' className='text-base'>Push Notifications</Label>
                  <p className='text-sm text-muted-foreground'>Receive push notifications on your devices</p>
                </div>
                <Switch
                  id='push-notifications'
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='transaction-alerts' className='text-base'>Transaction Alerts</Label>
                  <p className='text-sm text-muted-foreground'>Get notified for all account transactions</p>
                </div>
                <Switch
                  id='transaction-alerts'
                  checked={settings.transactionAlerts}
                  onCheckedChange={(checked) => handleSettingChange('transactionAlerts', checked)}
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='marketing-emails' className='text-base'>Marketing Emails</Label>
                  <p className='text-sm text-muted-foreground'>Receive promotional offers and updates</p>
                </div>
                <Switch
                  id='marketing-emails'
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <ShieldIcon className='size-5' />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='two-factor-auth' className='text-base'>Two-Factor Authentication</Label>
                  <p className='text-sm text-muted-foreground'>Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id='two-factor-auth'
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label htmlFor='biometric-auth' className='text-base'>Biometric Authentication</Label>
                  <p className='text-sm text-muted-foreground'>Use fingerprint or face recognition</p>
                </div>
                <Switch
                  id='biometric-auth'
                  checked={settings.biometricAuth}
                  onCheckedChange={(checked) => handleSettingChange('biometricAuth', checked)}
                />
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label htmlFor='session-timeout' className='text-base'>Session Timeout</Label>
                  <p className='text-sm text-muted-foreground'>Automatically log out after period of inactivity</p>
                </div>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
                >
                  <SelectTrigger id='session-timeout' className='w-full sm:w-[200px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='15'>15 minutes</SelectItem>
                    <SelectItem value='30'>30 minutes</SelectItem>
                    <SelectItem value='60'>1 hour</SelectItem>
                    <SelectItem value='120'>2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className='space-y-3'>
                <Button variant='outline' className='w-full sm:w-auto'>
                  <LockIcon className='size-4 mr-2' />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <PaletteIcon className='size-5' />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label htmlFor='theme' className='text-base'>Theme</Label>
                  <p className='text-sm text-muted-foreground'>Select your preferred color scheme</p>
                </div>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => handleSettingChange('theme', value)}
                >
                  <SelectTrigger id='theme' className='w-full sm:w-[200px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>
                      <div className='flex items-center gap-2'>
                        <SunIcon className='size-4' />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='dark'>
                      <div className='flex items-center gap-2'>
                        <MoonIcon className='size-4' />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value='system'>
                      <div className='flex items-center gap-2'>
                        <MonitorIcon className='size-4' />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <LanguagesIcon className='size-5' />
                <CardTitle>Regional Settings</CardTitle>
              </div>
              <CardDescription>Configure language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label htmlFor='language' className='text-base'>Language</Label>
                  <p className='text-sm text-muted-foreground'>Choose your preferred language</p>
                </div>
                <Select
                  value={settings.language}
                  onValueChange={(value) => handleSettingChange('language', value)}
                >
                  <SelectTrigger id='language' className='w-full sm:w-[200px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Spanish</SelectItem>
                    <SelectItem value='fr'>French</SelectItem>
                    <SelectItem value='de'>German</SelectItem>
                    <SelectItem value='zh'>Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label htmlFor='currency' className='text-base'>Currency</Label>
                  <p className='text-sm text-muted-foreground'>Default currency for transactions</p>
                </div>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => handleSettingChange('currency', value)}
                >
                  <SelectTrigger id='currency' className='w-full sm:w-[200px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='USD'>USD ($)</SelectItem>
                    <SelectItem value='EUR'>EUR (€)</SelectItem>
                    <SelectItem value='GBP'>GBP (£)</SelectItem>
                    <SelectItem value='JPY'>JPY (¥)</SelectItem>
                    <SelectItem value='INR'>INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label htmlFor='date-format' className='text-base'>Date Format</Label>
                  <p className='text-sm text-muted-foreground'>How dates are displayed</p>
                </div>
                <Select
                  value={settings.dateFormat}
                  onValueChange={(value) => handleSettingChange('dateFormat', value)}
                >
                  <SelectTrigger id='date-format' className='w-full sm:w-[200px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MM/DD/YYYY'>MM/DD/YYYY</SelectItem>
                    <SelectItem value='DD/MM/YYYY'>DD/MM/YYYY</SelectItem>
                    <SelectItem value='YYYY-MM-DD'>YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className='flex justify-end gap-4'>
            <Button variant='outline'>Reset to Defaults</Button>
            <Button>
              <SettingsIcon className='size-4 mr-2' />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
