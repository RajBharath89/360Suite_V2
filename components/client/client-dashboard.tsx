"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  Layers,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, subMonths } from "date-fns";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

interface ClientDashboardProps {
  onServiceClick: (serviceName: string) => void;
  onNavigate: (page: string) => void;
  onScopeClick?: (serviceName: string, scopeId: string) => void;
}

interface NewsItem {
  id: number;
  title: string;
  url: string;
}

const defaultNewsItems: NewsItem[] = [
  {
    id: 1,
    title:
      "India orders smartphone makers to preload state-owned cyber safety app. 02 Dec, 25",
    url: "https://example.com/news/1",
  },
  {
    id: 2,
    title:
      "India's telecoms ministry has privately asked smartphone makers to preload all the security applications",
    url: "https://example.com/news/2",
  },
  {
    id: 3,
    title:
      "New ransomware group targets healthcare sector with sophisticated attacks",
    url: "https://example.com/news/3",
  },
];

const servicesData = [
  {
    name: "RED Teaming Assessment",
    score: 8.5,
    frequency: "Quarterly",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
  {
    name: "Cyber Consulting And Advisory",
    score: null,
    frequency: null,
    scope: null,
    findings: null,
    status: "inactive" as const,
  },
  {
    name: "Cloud Security Assessment And Planning",
    score: 10,
    frequency: "Half Yearly",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
  {
    name: "Cyber Security Assessment on API's",
    score: 9.1,
    frequency: "Annually",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
  {
    name: "Firewall and Hardware Configuration Review",
    score: null,
    frequency: null,
    scope: null,
    findings: null,
    status: "inactive" as const,
  },
  {
    name: "Email Phishing Assessment & Training",
    score: 5.8,
    frequency: "Quarterly",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
  {
    name: "External Attack Surface Monitoring Solution",
    score: 6.2,
    frequency: "Annually",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
  {
    name: "Breach Monitoring",
    score: null,
    frequency: null,
    scope: null,
    findings: null,
    status: "inactive" as const,
  },
  {
    name: "Server Hardening",
    score: 2.4,
    frequency: "Quarterly",
    scope: 20,
    findings: 8,
    status: "active" as const,
  },
];

const servicesOptedPieData = [
  { name: "RED Teaming Assessment", value: 20, color: "#0891b2" },
  { name: "Cloud Security Assessment", value: 15, color: "#22c55e" },
  { name: "API Security Assessment", value: 18, color: "#3b82f6" },
  { name: "Email Phishing Assessment", value: 12, color: "#f59e0b" },
  { name: "Server Hardening", value: 10, color: "#ef4444" },
  { name: "External Attack Surface", value: 8, color: "#8b5cf6" },
];

const severityDistributionData = [
  { name: "Critical", value: 534, color: "#ef4444" },
  { name: "High", value: 279, color: "#f59e0b" },
  { name: "Medium", value: 178, color: "#3b82f6" },
  { name: "Low", value: 559, color: "#22c55e" },
];

const assetDistributionData = [
  { name: "Windows", value: 713, color: "#0891b2" },
  { name: "Network", value: 166, color: "#22c55e" },
  { name: "Apps", value: 258, color: "#f59e0b" },
  { name: "Cloud", value: 95, color: "#8b5cf6" },
];

const remediationStatusData = [
  { name: "Opened", value: 650, color: "#3b82f6" },
  { name: "In Progress", value: 568, color: "#f59e0b" },
  { name: "Closed", value: 628, color: "#22c55e" },
];

const securityScoreProgressData = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 82 },
  { week: "Week 5", score: 86 },
];

const vulnerabilityTrendsData = [
  { month: "Jul", critical: 25, high: 45, medium: 60, low: 80 },
  { month: "Aug", critical: 30, high: 50, medium: 55, low: 75 },
  { month: "Sep", critical: 20, high: 40, medium: 65, low: 85 },
  { month: "Oct", critical: 35, high: 55, medium: 50, low: 70 },
  { month: "Nov", critical: 28, high: 48, medium: 58, low: 78 },
];

const threatDetectionData = [
  { day: "Sun", detected: 85, resolved: 60 },
  { day: "Mon", detected: 95, resolved: 70 },
  { day: "Tue", detected: 78, resolved: 55 },
  { day: "Wed", detected: 45, resolved: 30 },
  { day: "Thu", detected: 55, resolved: 40 },
  { day: "Fri", detected: 72, resolved: 50 },
  { day: "Sat", detected: 88, resolved: 65 },
];

const auditSchedule = [
  {
    day: 8,
    service: "Network Red Teaming",
    color: "#0891b2",
    frequency: "Quarterly",
    assets: 20,
  },
  {
    day: 10,
    service: "Cloud Security",
    color: "#ef4444",
    frequency: "Half Yearly",
    assets: 15,
  },
  {
    day: 17,
    service: "Web Application Security",
    color: "#f59e0b",
    frequency: "Quarterly",
    assets: 5,
  },
  {
    day: 21,
    service: "Phishing Simulation",
    color: "#22c55e",
    frequency: "Quarterly",
    assets: 20,
  },
  {
    day: 30,
    service: "Server Hardening",
    color: "#3b82f6",
    frequency: "Monthly",
    assets: 10,
  },
];

function getScoreColor(score: number) {
  if (score >= 8) return "bg-green-600 text-white";
  if (score >= 5) return "bg-amber-500 text-white";
  return "bg-red-500 text-white";
}

function getScoreBorderColor(score: number) {
  if (score >= 8) return "border-l-green-600";
  if (score >= 5) return "border-l-amber-500";
  return "border-l-red-500";
}

export default function ClientDashboard({
  onServiceClick,
  onNavigate,
  onScopeClick,
}: ClientDashboardProps) {
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [selectedAuditDay, setSelectedAuditDay] = useState<number>(8);
  const [isPaused, setIsPaused] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getDateText = (date: Date) => {
    return format(date, "MMM d, yyyy");
  };

  useEffect(() => {
    const storedNews = localStorage.getItem("newsFeeds");
    if (storedNews) {
      try {
        const parsed = JSON.parse(storedNews);
        if (parsed.length > 0) {
          setNewsItems(parsed);
        }
      } catch (e) {
        console.error("Error parsing news feeds");
      }
    }
  }, []);

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
    setSelectedAuditDay(0);
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
    setSelectedAuditDay(0);
  };

  const isDecember2025 =
    currentMonth.getMonth() === 11 && currentMonth.getFullYear() === 2025;

  const selectedAudit =
    isDecember2025 && selectedAuditDay > 0
      ? auditSchedule.find((a) => a.day === selectedAuditDay) ||
        auditSchedule[0]
      : auditSchedule[0];

  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const audit = auditSchedule.find((a) => a.day === day);
    return {
      day,
      hasAudit: !!audit,
      color: audit?.color,
      service: audit?.service,
    };
  });

  const handleNewsClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDate = () => {
    return getDateText(selectedDate);
  };

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-shrink-0 news-ticker-container bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-primary py-2 px-4 flex items-center gap-3 text-sm">
          <span className="bg-[#ffffff] font-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap flex-shrink-0">
            Cyber Threat Bulletin
          </span>
          <div className="flex-1 overflow-hidden relative">
            <div className="news-ticker-content whitespace-nowrap flex items-center">
              {newsItems.map((item, index) => (
                <span
                  key={item.id}
                  className="cursor-pointer hover:underline inline-flex items-center"
                  onClick={() => handleNewsClick(item.url)}
                >
                  {item.title}
                  {index < newsItems.length - 1 && (
                    <span className="mx-4">•</span>
                  )}
                </span>
              ))}
              <span className="mx-8"></span>
              {newsItems.map((item, index) => (
                <span
                  key={`dup-${item.id}`}
                  className="cursor-pointer hover:underline inline-flex items-center"
                  onClick={() => handleNewsClick(item.url)}
                >
                  {item.title}
                  {index < newsItems.length - 1 && (
                    <span className="mx-4">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .news-ticker-content {
            animation: marquee 5s linear infinite;
          }
          .news-ticker-container:hover .news-ticker-content {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex-1 overflow-y-auto">
          <Card className="mx-4 md:mx-6 mt-4 bg-gradient-to-r from-cyan-50 via-teal-50 to-green-50 border-cyan-200 shadow-lg">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 md:h-14 md:w-14 border-2 border-white shadow-md rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 md:h-7 md:w-7 text-cyan-600" />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                      Welcome,{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-cyan-700 cursor-default">Pon Pure Chemicals India...</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pon Pure Chemicals India Pvt Ltd</p>
                        </TooltipContent>
                      </Tooltip>
                    </h1>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Access your detailed security insights instantly
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 md:gap-3">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-[260px] h-9 justify-start text-left font-normal border-gray-200 bg-white shadow-sm"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {formatDate()}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            setSelectedDate(date);
                            setIsCalendarOpen(false);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-white border border-cyan-600 text-cyan-600 hover:bg-cyan-50 gap-2 shadow-sm">
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download security report as PDF</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm cursor-pointer hover:border-cyan-300 transition-colors"
                        onClick={() => onNavigate("licenses")}
                      >
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-xs">
                          <div className="font-semibold text-green-700">
                            License
                          </div>
                          <div className="text-gray-500">
                            Active | Enterprise
                          </div>
                          <div className="text-gray-400">
                            Renews on 02/11/26
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View license details</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-700 transition-colors shadow-sm"
                        onClick={() => onNavigate("support-tickets")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <div className="text-xs">
                          <div className="font-semibold">Need Help?</div>
                          <div className="text-cyan-100">
                            Submit a ticket and our
                          </div>
                          <div className="text-cyan-100">
                            support team will help.
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a support ticket</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Services Opted{" "}
                <span className="text-cyan-600 text-sm font-normal ml-2">
                  {servicesData.length} Services (
                  {servicesData.filter((s) => s.status === "active").length}{" "}
                  Active)
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show Analytics</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Switch
                        checked={showAnalytics}
                        onCheckedChange={setShowAnalytics}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle analytics charts visibility</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[...servicesData]
                .sort((a, b) => {
                  if (a.status === "active" && b.status === "inactive")
                    return -1;
                  if (a.status === "inactive" && b.status === "active")
                    return 1;
                  return 0;
                })
                .map((service, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {service.status === "inactive" ? (
                        <Card className="border-l-4 border-l-gray-300 bg-gray-50 opacity-60 cursor-not-allowed">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-500">
                                  {service.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
                                    Inactive
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card
                          className={`border-l-4 ${getScoreBorderColor(service.score!)} hover:shadow-lg transition-all cursor-pointer`}
                          onClick={() => onServiceClick(service.name)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-12 h-12 rounded-lg ${getScoreColor(service.score!)} flex items-center justify-center text-lg font-bold shadow-sm`}
                                >
                                  {service.score}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-800">
                                    {service.name}
                                  </h3>
                                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />{" "}
                                      {service.frequency}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Shield className="h-3 w-3" />{" "}
                                      {service.scope} Scope
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-600 text-xs font-medium">
                                      {Math.floor(Math.random() * 5)}
                                    </span>
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                                    <span className="text-amber-600 text-xs font-medium">
                                      {Math.floor(Math.random() * 10)}
                                    </span>
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center">
                                    <span className="text-cyan-600 text-xs font-medium">
                                      {service.findings}
                                    </span>
                                  </div>
                                </div>
                                <Info className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            <div className="text-xs text-cyan-600 mt-2 font-medium">
                              {service.findings} Findings
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {service.status === "inactive"
                          ? `${service.name} - Service not active`
                          : `Click to view ${service.name} details`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Security Score
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-cyan-600" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-cyan-700">86</span>
                    <span className="text-lg text-gray-500">/100</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">+13.5%</span>
                    <span className="text-gray-500">vs Last Month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Vulnerabilities
                    </span>
                    <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-red-700">18</div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">-24.0%</span>
                    <span className="text-gray-500">vs Last Month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Unfixed Vulnerabilities
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-amber-700">08</div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <span className="text-red-600 font-medium">+10.0%</span>
                    <span className="text-gray-500">vs Last Month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Total High Risks
                    </span>
                    <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-orange-700">28</div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <span className="text-red-600 font-medium">+12</span>
                    <span className="text-gray-500">vs Last Month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {showAnalytics && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Services Opted
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={servicesOptedPieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={false}
                          >
                            {servicesOptedPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {servicesOptedPieData.slice(0, 4).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-xs"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600">
                              {item.name.split(" ")[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Upcoming Audits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-cyan-600 font-medium">
                              {getMonthName(currentMonth)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 hover:bg-cyan-50"
                                onClick={goToPreviousMonth}
                              >
                                <ChevronLeft className="h-4 w-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 hover:bg-cyan-50"
                                onClick={goToNextMonth}
                              >
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                              (day) => (
                                <div
                                  key={day}
                                  className="font-medium text-gray-500 py-1"
                                >
                                  {day}
                                </div>
                              ),
                            )}
                            {Array.from(
                              { length: getFirstDayOfMonth(currentMonth) },
                              (_, i) => (
                                <div key={`empty-${i}`} />
                              ),
                            )}
                            {Array.from(
                              { length: getDaysInMonth(currentMonth) },
                              (_, i) => {
                                const day = i + 1;
                                const audit = isDecember2025
                                  ? auditSchedule.find((a) => a.day === day)
                                  : null;
                                const isToday =
                                  new Date().getDate() === day &&
                                  new Date().getMonth() ===
                                    currentMonth.getMonth() &&
                                  new Date().getFullYear() ===
                                    currentMonth.getFullYear();
                                return (
                                  <div
                                    key={day}
                                    className={`py-2 rounded-full cursor-pointer transition-all ${
                                      audit
                                        ? "text-white font-medium hover:opacity-80"
                                        : "text-gray-700 hover:bg-gray-100"
                                    } ${selectedAuditDay === day && isDecember2025 ? "ring-2 ring-offset-1 ring-cyan-400" : ""} ${isToday && !audit ? "bg-cyan-100 text-cyan-700 font-medium" : ""}`}
                                    style={{
                                      backgroundColor: audit
                                        ? audit.color
                                        : undefined,
                                    }}
                                    onClick={() =>
                                      audit && setSelectedAuditDay(day)
                                    }
                                  >
                                    {day}
                                  </div>
                                );
                              },
                            )}
                          </div>
                          {isDecember2025 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {auditSchedule.map((audit) => (
                                <div
                                  key={audit.day}
                                  className="flex items-center gap-1 text-xs cursor-pointer hover:opacity-70"
                                  onClick={() => setSelectedAuditDay(audit.day)}
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: audit.color }}
                                  />
                                  <span className="text-gray-600">
                                    {audit.service.split(" ")[0]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-64 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-cyan-600 flex flex-col items-center justify-center text-white">
                              <span className="text-lg font-bold leading-none">
                                {selectedAudit.day}
                              </span>
                              <span className="text-[10px]">
                                {isDecember2025
                                  ? "Dec"
                                  : getMonthName(currentMonth).slice(0, 3)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800 text-sm">
                                {selectedAudit.service}
                              </h3>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Audit Scope:
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Comprehensive security assessment including
                              vulnerability scanning, penetration testing, and
                              compliance verification.
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3 text-cyan-600" />
                              <span>{selectedAudit.frequency}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Layers className="h-3 w-3 text-cyan-600" />
                              <span>{selectedAudit.assets} Assets</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Severity Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={severityDistributionData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label={({ value }) => value}
                          >
                            {severityDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        {severityDistributionData.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-xs"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Asset Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={assetDistributionData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label={({ value }) => value}
                          >
                            {assetDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        {assetDistributionData.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-xs"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Remediation Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={remediationStatusData}
                          layout="vertical"
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                          />
                          <XAxis type="number" />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={80}
                            tick={{ fontSize: 12 }}
                          />
                          <RechartsTooltip />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {remediationStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        {remediationStatusData.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-xs"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Security Score Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={securityScoreProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                          <RechartsTooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center mt-2">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-gray-600">Score</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        Vulnerability Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={vulnerabilityTrendsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <RechartsTooltip />
                          <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                          <Bar dataKey="high" stackId="a" fill="#f59e0b" />
                          <Bar dataKey="medium" stackId="a" fill="#3b82f6" />
                          <Bar dataKey="low" stackId="a" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-gray-600">Critical</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-gray-600">High</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-gray-600">Medium</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-gray-600">Low</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">
                      Threat Detection Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={threatDetectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <RechartsTooltip />
                        <Bar
                          dataKey="detected"
                          fill="#0891b2"
                          radius={[4, 4, 0, 0]}
                          name="Threats Detected"
                        />
                        <Bar
                          dataKey="resolved"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                          name="Threats Resolved"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-4 justify-center mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 rounded-full bg-cyan-600" />
                        <span className="text-gray-600">Threats Detected</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-gray-600">Threats Resolved</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        <footer className="flex-shrink-0 bg-gray-100 border-t py-4 px-6 flex justify-between items-center text-sm text-gray-500">
          <span>Copyright. 2025. Necurity Solutions.</span>
          <span>Version 1.0.0</span>
        </footer>
      </div>
    </TooltipProvider>
  );
}
