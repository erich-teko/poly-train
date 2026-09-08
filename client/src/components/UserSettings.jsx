import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "/context/AuthContext"
import UserAvatar, { avatarStyles } from "./userAvatar"

function UserSettings({ open, onOpenChange }) {
  const { username, avatarStyle, updateAvatarStyle } = useAuth()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Einstellungen</DialogTitle>
          <DialogDescription>
            Verwalte hier deine Kontoeinstellungen und Praeferenzen.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm font-medium">Avatar</p>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(avatarStyles).map(([styleName, style]) => (
              <Button
                key={styleName}
                type="button"
                variant={avatarStyle === styleName ? "outline" : "ghost"}
                className="h-auto flex-col gap-1 p-2"
                onClick={() => updateAvatarStyle(styleName)}
              >
                <UserAvatar
                  username={username}
                  avatarStyle={styleName}
                  size="lg"
                />
                <span className="text-xs">{style.label}</span>
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Schliessen</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserSettings
