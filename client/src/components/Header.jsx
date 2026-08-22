import UserProfile from "./UserProfile"

function Header({projectName}) {
    return (
        <header>
        <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
            <h1>{projectName}</h1>
            <UserProfile />
        </div>
        </header>
    )

}

export default Header


