import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Avatar as DicebearAvatar, Style } from "@dicebear/core"
import adventurerNeutral from "@dicebear/styles/adventurer-neutral.json" with { type: "json" }
import bottts from "@dicebear/styles/bottts.json" with { type: "json" }
import croodles from "@dicebear/styles/croodles.json" with { type: "json" }
import identicon from "@dicebear/styles/identicon.json" with { type: "json" }
import loops from "@dicebear/styles/loops.json" with { type: "json" }
import pixelbot from "@dicebear/styles/pixelbot.json" with { type: "json" }
import sprouts from "@dicebear/styles/sprouts.json" with { type: "json" }
import voxelArt from "@dicebear/styles/voxel-art.json" with { type: "json" }

export const avatarStyles = {
  identicon: { label: "Identicon", style: identicon },
  sprouts: { label: "Sprouts", style: sprouts },
  adventurerNeutral: { label: "Adventurer", style: adventurerNeutral },
  voxelArt: { label: "Voxel Art", style: voxelArt },
  loops: { label: "Loops", style: loops },
  bottts: { label: "Bottts", style: bottts },
  pixelbot: { label: "Pixelbot", style: pixelbot },
  croodles: { label: "Croodles", style: croodles },
}

function UserAvatar({ username, avatarStyle = "identicon", className, size }) {
  const selectedStyle = avatarStyles[avatarStyle] ?? avatarStyles.identicon
  const avatar = new DicebearAvatar(new Style(selectedStyle.style), {
    seed: username ?? "John",
  })

  return (
    <Avatar className={className} size={size}>
      <AvatarImage src={avatar.toDataUri()} alt={username?.[0] ?? "U"} />
      <AvatarFallback>{username?.[0] ?? "U"}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
