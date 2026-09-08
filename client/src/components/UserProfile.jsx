"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SettingsIcon, LogOutIcon } from "lucide-react"
import UserSettings from "./UserSettings"
import UserAvatar from "./userAvatar"
import { useAuth } from "/context/AuthContext"

function UserProfile() {
  const { username, avatarStyle, logout } = useAuth()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto items-center gap-2 rounded-full py-1 pr-1 pl-3 hover:bg-transparent hover:text-inherit active:translate-y-0 aria-expanded:bg-transparent aria-expanded:text-inherit"
          >
            <span className="text-sm font-medium">{username}</span>
            <UserAvatar
              username={username}
              avatarStyle={avatarStyle}
              className="transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background"
            />
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
            Einstellungen
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOutIcon />
            Abmelden
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <UserSettings
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </DropdownMenu>
  )
}

export default UserProfile
