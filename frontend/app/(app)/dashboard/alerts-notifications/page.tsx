"use client";

import { useEffect, useState } from "react";
import {
  BellIcon,
  ShieldAlertIcon,
  DollarSignIcon,
  CalendarIcon,
  CheckCircle2Icon,
  InfoIcon,
  Settings2Icon,
  PlusCircleIcon,
  ClockIcon,
  TrashIcon,
  EditIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsCard from "@/components/shadcn-studio/blocks/statistics-card-01";
import { formatDateTime } from "@/lib/utils/date";
import { useAppContext } from "@/context";

// Alert types
interface Alert {
  id: string;
  type: "transaction" | "security" | "balance" | "payment" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

// Reminder types
interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: "active" | "completed";
}

// Mock alert data
const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "security",
    title: "New Login Detected",
    message: "A new login from Windows Chrome was detected in New York, NY",
    timestamp: "2025-11-21T10:30:00",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "transaction",
    title: "Large Transaction Alert",
    message:
      "A transaction of $5,000.00 was processed from your Primary Checking account",
    timestamp: "2025-11-20T14:20:00",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "balance",
    title: "Low Balance Warning",
    message: "Your Emergency Fund balance is below $160,000",
    timestamp: "2025-11-20T09:00:00",
    read: true,
    priority: "medium",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Reminder",
    message: "Your scheduled rent payment of $2,400 is due in 3 days",
    timestamp: "2025-11-19T08:00:00",
    read: true,
    priority: "high",
  },
  {
    id: "5",
    type: "transaction",
    title: "Deposit Received",
    message: "A deposit of $8,500.00 has been credited to your account",
    timestamp: "2025-11-18T12:00:00",
    read: true,
    priority: "low",
  },
  {
    id: "6",
    type: "security",
    title: "Password Changed",
    message: "Your account password was successfully changed",
    timestamp: "2025-11-17T16:45:00",
    read: true,
    priority: "high",
  },
  {
    id: "7",
    type: "info",
    title: "New Feature Available",
    message: "Check out our new AI-powered financial insights feature",
    timestamp: "2025-11-16T10:00:00",
    read: true,
    priority: "low",
  },
  {
    id: "8",
    type: "transaction",
    title: "Card Transaction Declined",
    message: "A transaction of $450.00 was declined due to insufficient funds",
    timestamp: "2025-11-15T18:30:00",
    read: true,
    priority: "high",
  },
];

// Mock reminder data
const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "Loan EMI Payment",
    description: "Pay monthly loan EMI for home loan",
    date: "2025-01-01",
    time: "09:00",
    type: "payment",
    status: "active",
  },
  {
    id: "2",
    title: "Investment Review",
    description: "Review quarterly investment portfolio performance",
    date: "2025-01-15",
    time: "14:00",
    type: "review",
    status: "active",
  },
  {
    id: "3",
    title: "Credit Card Bill",
    description: "Pay credit card bill before due date",
    date: "2025-01-10",
    time: "10:00",
    type: "payment",
    status: "active",
  },
];

export default function AlertsRemindersPage() {
  // Alert states
  const { reminders, setReminders } = useAppContext();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [balanceAlerts, setBalanceAlerts] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);

  // Reminder states
  const [showCreateForm, setShowCreateForm] = useState(false);
  // const [reminders, setReminders] = useState<Reminder[]>(mockReminders)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "payment",
  });

  // Alert calculations
  const unreadCount = alerts.filter((a) => !a.read).length;
  const todayAlerts = alerts.filter((a) => {
    const alertDate = new Date(a.timestamp);
    const today = new Date();
    return alertDate.toDateString() === today.toDateString();
  }).length;

  // Reminder calculations
  const activeReminders = reminders.filter(
    (r: any) => r.status === "active"
  ).length;
  const completedReminders = reminders.filter(
    (r: any) => r.status === "completed"
  ).length;

  const statisticsCardData = [
    {
      icon: <BellIcon className="size-4" />,
      value: alerts.length.toString(),
      title: "Total Alerts",
      changePercentage: "Last 30 days",
    },
    {
      icon: <InfoIcon className="size-4" />,
      value: unreadCount.toString(),
      title: "Unread Alerts",
      changePercentage: todayAlerts + " today",
    },
    {
      icon: <CalendarIcon className="size-4" />,
      value: reminders.length.toString(),
      title: "Total Reminders",
      changePercentage: "All time",
    },
    {
      icon: <ClockIcon className="size-4" />,
      value: activeReminders.toString(),
      title: "Active Reminders",
      changePercentage: "Pending",
    },
  ];

  // Alert functions
  const getAlertIcon = (type: Alert["type"]) => {
    const icons = {
      transaction: DollarSignIcon,
      security: ShieldAlertIcon,
      balance: DollarSignIcon,
      payment: CalendarIcon,
      info: InfoIcon,
    };
    const Icon = icons[type];
    return <Icon className="size-5" />;
  };

  const getAlertColor = (type: Alert["type"], priority: Alert["priority"]) => {
    if (priority === "high") return "border-l-4 border-l-red-500 bg-red-500/5";
    if (type === "security")
      return "border-l-4 border-l-orange-500 bg-orange-500/5";
    if (type === "transaction")
      return "border-l-4 border-l-blue-500 bg-blue-500/5";
    return "border-l-4 border-l-gray-500 bg-gray-500/5";
  };

  const filteredAlerts =
    filter === "unread" ? alerts.filter((a) => !a.read) : alerts;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  // Reminder functions
  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...formData,
      status: "active",
    };
    setReminders([...reminders, newReminder]);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "payment",
    });
    setShowCreateForm(false);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r: any) => r.id !== id));
  };

  const getReminderTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      payment: "bg-red-500/10 text-red-700",
      review: "bg-blue-500/10 text-blue-700",
      meeting: "bg-purple-500/10 text-purple-700",
      other: "bg-gray-500/10 text-gray-700",
    };
    return (
      <Badge variant="outline" className={colors[type] || colors.other}>
        {type}
      </Badge>
    );
  };

  useEffect(() => {}, [reminders]);

  return (
    <div className="p-6">
      <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Alerts & Reminders</h1>
            <p className="text-muted-foreground mt-2">
              Manage your notifications and reminders
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Statistics Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Tabs for Alerts and Reminders */}
          <Tabs defaultValue="alerts" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
            </TabsList>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Alert Feed */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Alert Feed</CardTitle>
                        <CardDescription>
                          Your recent notifications and alerts
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={filter === "all" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter("all")}
                        >
                          All
                        </Button>
                        <Button
                          variant={filter === "unread" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilter("unread")}
                        >
                          Unread ({unreadCount})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                        >
                          Mark all read
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`rounded-lg p-4 transition-colors hover:bg-muted/50 ${getAlertColor(
                          alert.type,
                          alert.priority
                        )} ${!alert.read ? "font-medium" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 ${
                              alert.type === "security"
                                ? "text-orange-600"
                                : alert.type === "transaction"
                                ? "text-blue-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={
                                  !alert.read ? "font-semibold" : "font-medium"
                                }
                              >
                                {alert.title}
                              </p>
                              {!alert.read && (
                                <Badge
                                  variant="default"
                                  className="h-5 px-1.5 text-xs"
                                >
                                  New
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className="h-5 px-1.5 text-xs capitalize"
                              >
                                {alert.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {alert.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateTime(alert.timestamp)}
                            </p>
                          </div>
                          {!alert.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(alert.id)}
                            >
                              <CheckCircle2Icon className="size-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings2Icon className="size-5" />
                      Settings
                    </CardTitle>
                    <CardDescription>Manage alert preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">
                        Notification Channels
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email" className="text-sm">
                            Email Notifications
                          </Label>
                          <Switch
                            id="email"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms" className="text-sm">
                            SMS Notifications
                          </Label>
                          <Switch
                            id="sms"
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push" className="text-sm">
                            Push Notifications
                          </Label>
                          <Switch
                            id="push"
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">Alert Types</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="transaction" className="text-sm">
                            Transaction Alerts
                          </Label>
                          <Switch
                            id="transaction"
                            checked={transactionAlerts}
                            onCheckedChange={setTransactionAlerts}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="security" className="text-sm">
                            Security Alerts
                          </Label>
                          <Switch
                            id="security"
                            checked={securityAlerts}
                            onCheckedChange={setSecurityAlerts}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="balance" className="text-sm">
                            Balance Alerts
                          </Label>
                          <Switch
                            id="balance"
                            checked={balanceAlerts}
                            onCheckedChange={setBalanceAlerts}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="payment" className="text-sm">
                            Payment Reminders
                          </Label>
                          <Switch
                            id="payment"
                            checked={paymentReminders}
                            onCheckedChange={setPaymentReminders}
                          />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Save Preferences</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reminders Tab */}
            <TabsContent value="reminders" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-end">
                  <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                    <PlusCircleIcon className="size-4 mr-2" />
                    {showCreateForm ? "Cancel" : "New Reminder"}
                  </Button>
                </div>

                {/* Create Reminder Form */}
                {showCreateForm && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Reminder</CardTitle>
                      <CardDescription>
                        Set up a new reminder for important tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleCreateReminder}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="title">Reminder Title *</Label>
                            <Input
                              id="title"
                              placeholder="e.g., Pay Credit Card Bill"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="type">Reminder Type *</Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value) =>
                                setFormData({ ...formData, type: value })
                              }
                            >
                              <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="payment">Payment</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="date">Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  date: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <Input
                              id="time"
                              type="time"
                              value={formData.time}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  time: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Add details about this reminder..."
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button type="submit">Create Reminder</Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowCreateForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Reminders List */}
                <div className="space-y-4">
                  {reminders.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <BellIcon className="size-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold mb-2">
                          No Reminders Yet
                        </p>
                        <p className="text-muted-foreground mb-4">
                          Create your first reminder to get started
                        </p>
                        <Button onClick={() => setShowCreateForm(true)}>
                          <PlusCircleIcon className="size-4 mr-2" />
                          Create Reminder
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    reminders.map((reminder: any) => (
                      <Card key={reminder.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CardTitle>{reminder.title}</CardTitle>
                                {getReminderTypeBadge(reminder.type)}
                              </div>
                              <CardDescription>
                                {reminder.description}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <EditIcon className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDeleteReminder(reminder.id)
                                }
                              >
                                <TrashIcon className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="size-4" />
                              <span>
                                {new Date(reminder.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="size-4" />
                              <span>{reminder.time}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-700"
                            >
                              {reminder.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
