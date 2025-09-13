import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProjectStore } from "@/store/projectStore"
import { useEffect } from "react"
import timeAgo from "@/lib/time"

// const projects = [
//   {
//     id: 1,
//     name: "Website Redesign",
//     status: "In Progress",
//     lastUpdated: "2 hours ago",
//     progress: 75,
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     status: "Planning",
//     lastUpdated: "1 day ago",
//     progress: 25,
//   },
//   {
//     id: 3,
//     name: "Database Migration",
//     status: "Completed",
//     lastUpdated: "3 days ago",
//     progress: 100,
//   },
//   {
//     id: 4,
//     name: "API Integration",
//     status: "In Progress",
//     lastUpdated: "5 hours ago",
//     progress: 60,
//   },
// ]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-300 text-green-800"
    case "miss":
      return "bg-red-200 text-red-800"
    case "active":
      return "bg-yellow-200 text-yellow-900"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function RecentProjects() {
  const {projects, fetchProjects, loadingProjects} = useProjectStore();
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects]);

  
  if (loadingProjects) {
    return <div>⏳ Đang tải dữ liệu...</div>;
  }
  console.log(projects);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-card-foreground line-clamp-2">{project.name}</h3>
                  <Badge className={getStatusColor(project.status ?? "unknown")}>{project.status ?? "Unknown"}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">Updated {timeAgo(projects.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
