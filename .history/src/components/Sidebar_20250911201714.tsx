import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Home, FolderOpen } from "lucide-react"

const navigationItems = [
  {
    name: "For You",
    href: "/for-you",
    icon: Home,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
]

export default function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 z-40 w-64 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border">
        <div className="flex">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
