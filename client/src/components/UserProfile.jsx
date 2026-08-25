"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar as DicebearAvatar, Style } from "@dicebear/core"
import identicon from "@dicebear/styles/identicon.json" with { type: "json" }
import { useAuth } from "/context/AuthContext"

function UserProfile() {
  const { username, logout } = useAuth()
  const style = new Style(identicon)
  const avatar = new DicebearAvatar(style, {
    seed: username ?? "John",
    // ... other options
  })

  const dataUri = avatar.toDataUri()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2">
            <span className="text-sm font-medium">{username}</span>
            <Avatar>
              <AvatarImage src={dataUri} alt={username?.[0] ?? "U"} />
              <AvatarFallback>{username?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>Einstellungen</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={logout}>
            Abmelden
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
