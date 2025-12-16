"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Star,
  Lock,
  LogOut,
  User,
  MessageCircle,
  BotMessageSquare,
  ChevronRight,
  Ticket,
} from "lucide-react";
import Image from "next/image";

interface ClientHeaderProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const notifications = [
  {
    id: 1,
    title: "Security scan completed",
    message: "Network Red Teaming scan finished",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New vulnerability found",
    message: "Critical vulnerability detected in API",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Audit scheduled",
    message: "Cloud Security audit on Dec 15",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Report available",
    message: "Monthly security report ready",
    time: "2 days ago",
    read: true,
  },
];

export default function ClientHeader({
  onLogout,
  onNavigate,
}: ClientHeaderProps) {
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRating = () => {
    setSubmitted(true);
    setTimeout(() => {
      setRatingDialogOpen(false);
      setSubmitted(false);
      setRating(0);
      setFeedback("");
    }, 2000);
  };

  return (
    <TooltipProvider>
      <header className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#fefefe] via-[#3EB1CE] to-[#AFCA25] text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Necurity Logo"
              width={100}
              height={25}
            />
          </div>
          <div className="h-6 w-px bg-primary mx-2" />
          <span className="text-md font-medium text-black">
            Tech Corp Solutions, Chennai
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-white/20 transition-colors  cursor-pointer"
                onClick={() => onNavigate("support-tickets")}
              >
                <Ticket className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create support ticket</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-white/20 transition-colors  cursor-pointer"
                onClick={() => setRatingDialogOpen(true)}
              >
                <Star className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rate this application</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>View notifications</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-xs text-cyan-600 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.slice(0, 4).map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    )}
                    <span className="font-medium text-sm">{notif.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 pl-4">
                    {notif.message}
                  </span>
                  <span className="text-xs text-gray-400 pl-4">
                    {notif.time}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center text-cyan-600 font-medium cursor-pointer"
                onClick={() => onNavigate("notifications")}
              >
                View All Notifications
                <ChevronRight className="h-4 w-4 ml-1" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-9 h-9 rounded-full bg-white text-cyan-600 flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-white/50 transition-all cursor-pointer">
                TC
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Tech Corp Solutions</span>
                  <span className="text-xs text-gray-500 font-normal">
                    client@techcorp.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => onNavigate("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile & Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Rate Our Application
            </DialogTitle>
            <DialogDescription className="text-center">
              How would you rate your experience with 360° Security Platform?
            </DialogDescription>
          </DialogHeader>

          {!submitted ? (
            <div className="space-y-6 py-4">
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    className="p-1 transition-transform hover:scale-110"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center text-sm text-gray-500">
                {rating > 0
                  ? `You selected ${rating} out of 10`
                  : "Click to rate"}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Additional feedback (optional)
                </label>
                <Textarea
                  placeholder="Tell us more about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button
                className="w-full bg-cyan-600 hover:bg-cyan-700"
                onClick={handleSubmitRating}
                disabled={rating === 0}
              >
                Submit Rating
              </Button>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg font-medium text-gray-800">
                Thank you for your feedback!
              </div>
              <p className="text-sm text-gray-500">
                Your rating helps us improve our platform.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
