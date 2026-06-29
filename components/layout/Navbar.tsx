"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          placeholder="Search employees, teams, reports..."
          className="pl-10"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>

        <Avatar>
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}