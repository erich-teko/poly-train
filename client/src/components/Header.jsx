import { Avatar } from "@dicebear/core"
import ThemeToggle from "./ThemeToggle"
import UserProfile from "./UserProfile"
import Logo from "./Logo"

function Header({ projectName }) {
  return (
    <header>
      <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
        <div className="flex items-center gap-4">
          <Logo size={40} />
          <h1>{projectName}</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}

export default Header
