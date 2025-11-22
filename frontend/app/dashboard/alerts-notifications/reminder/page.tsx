'use client'

import { useState } from 'react'
import {
  BellIcon,
  PlusCircleIcon,
  CalendarIcon,
  ClockIcon,
  TrashIcon,
  EditIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'

interface Reminder {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: string
  status: 'active' | 'completed'
}

export default function ReminderPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Loan EMI Payment',
      description: 'Pay monthly loan EMI for home loan',
      date: '2025-01-01',
      time: '09:00',
      type: 'payment',
      status: 'active'
    },
    {
      id: '2',
      title: 'Investment Review',
      description: 'Review quarterly investment portfolio performance',
      date: '2025-01-15',
      time: '14:00',
      type: 'review',
      status: 'active'
    },
    {
      id: '3',
      title: 'Credit Card Bill',
      description: 'Pay credit card bill before due date',
      date: '2025-01-10',
      time: '10:00',
      type: 'payment',
      status: 'active'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'payment'
  })

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault()
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...formData,
      status: 'active'
    }
    setReminders([...reminders, newReminder])
    setFormData({ title: '', description: '', date: '', time: '', type: 'payment' })
    setShowCreateForm(false)
  }

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id))
  }

  const activeReminders = reminders.filter(r => r.status === 'active').length
  const completedReminders = reminders.filter(r => r.status === 'completed').length

  const statisticsCardData = [
    {
      icon: <BellIcon className='size-4' />,
      value: reminders.length.toString(),
      title: 'Total Reminders',
      changePercentage: 'All time'
    },
    {
      icon: <ClockIcon className='size-4' />,
      value: activeReminders.toString(),
      title: 'Active Reminders',
      changePercentage: 'Pending'
    },
    {
      icon: <CalendarIcon className='size-4' />,
      value: completedReminders.toString(),
      title: 'Completed',
      changePercentage: 'Done'
    }
  ]

  const getReminderTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      payment: 'bg-red-500/10 text-red-700',
      review: 'bg-blue-500/10 text-blue-700',
      meeting: 'bg-purple-500/10 text-purple-700',
      other: 'bg-gray-500/10 text-gray-700'
    }
    return <Badge variant='outline' className={colors[type] || colors.other}>{type}</Badge>
  }

  return (
    <div className='p-6'>
      <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Reminders</h1>
            <p className='text-muted-foreground mt-2'>Manage your payment and task reminders</p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <PlusCircleIcon className='size-4 mr-2' />
            {showCreateForm ? 'Cancel' : 'New Reminder'}
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          {/* Statistics Cards */}
          <div className='grid gap-6 sm:grid-cols-3'>
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

          {/* Create Reminder Form */}
          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Reminder</CardTitle>
                <CardDescription>Set up a new reminder for important tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateReminder} className='space-y-4'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='title'>Reminder Title *</Label>
                      <Input
                        id='title'
                        placeholder='e.g., Pay Credit Card Bill'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='type'>Reminder Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger id='type'>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='payment'>Payment</SelectItem>
                          <SelectItem value='review'>Review</SelectItem>
                          <SelectItem value='meeting'>Meeting</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='date'>Date *</Label>
                      <Input
                        id='date'
                        type='date'
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='time'>Time *</Label>
                      <Input
                        id='time'
                        type='time'
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>

                    <div className='space-y-2 sm:col-span-2'>
                      <Label htmlFor='description'>Description</Label>
                      <Textarea
                        id='description'
                        placeholder='Add details about this reminder...'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Button type='submit'>Create Reminder</Button>
                    <Button type='button' variant='outline' onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reminders List */}
          <div className='space-y-4'>
            {reminders.length === 0 ? (
              <Card>
                <CardContent className='flex flex-col items-center justify-center py-12'>
                  <BellIcon className='size-12 text-muted-foreground mb-4' />
                  <p className='text-lg font-semibold mb-2'>No Reminders Yet</p>
                  <p className='text-muted-foreground mb-4'>Create your first reminder to get started</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <PlusCircleIcon className='size-4 mr-2' />
                    Create Reminder
                  </Button>
                </CardContent>
              </Card>
            ) : (
              reminders.map(reminder => (
                <Card key={reminder.id}>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <CardTitle>{reminder.title}</CardTitle>
                          {getReminderTypeBadge(reminder.type)}
                        </div>
                        <CardDescription>{reminder.description}</CardDescription>
                      </div>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='icon'>
                          <EditIcon className='size-4' />
                        </Button>
                        <Button variant='ghost' size='icon' onClick={() => handleDeleteReminder(reminder.id)}>
                          <TrashIcon className='size-4 text-destructive' />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <CalendarIcon className='size-4' />
                        <span>{new Date(reminder.date).toLocaleDateString()}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <ClockIcon className='size-4' />
                        <span>{reminder.time}</span>
                      </div>
                      <Badge variant='outline' className='bg-green-500/10 text-green-700'>
                        {reminder.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
