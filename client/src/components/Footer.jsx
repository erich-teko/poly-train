function Footer({year, projectName}) {
  return (
    <footer className="flex items-center justify-center gap-2 p-4 text-sm text-gray-500">
      <span>© {year} {projectName}</span>
    </footer>
  )
}

export default Footer
