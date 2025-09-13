import { useState } from "react"
import { useParams } from "react-router-dom"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, ArrowLeft, Calendar, CheckCircle, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import TaskListView from "@/components/TaskListView"
import TaskCalendarView from "@/components/TaskCalendarView"
import TaskAnalyticsView from "@/components/TaskAnalyticsView"
import NewTaskModal from "@/components/NewTaskModal"

// Mock project data
const projectData = {
  1: {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience.",
    completedTasks: 12,
    pendingTasks: 8,
    finalDeadline: "2024-12-30",
    status: "In Progress",
  },
  2: {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement and service delivery.",
    completedTasks: 5,
    pendingTasks: 15,
    finalDeadline: "2025-02-15",
    status: "Planning",
  },
  3: {
    id: 3,
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure with improved performance.",
    completedTasks: 18,
    pendingTasks: 0,
    finalDeadline: "2024-11-30",
    status: "Completed",
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Planning":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string;
  const project = projectData[projectId as keyof typeof projectData]

  console.log(projectId, "gap", project)
  const [activeTab, setActiveTab] = useState("list")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalTasks = project.completedTasks + project.pendingTasks
  const completionPercentage = totalTasks > 0 ? Math.round((project.completedTasks / totalTasks) * 100) : 0

  const handleCreateTask = (taskData: any) => {
    console.log("[v0] Creating new task:", taskData)
    setIsTaskModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 pt-24 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <Card className="rounded-2xl shadow-md mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Tasks</p>
                    <p className="text-2xl font-bold">{project.completedTasks}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Tasks</p>
                    <p className="text-2xl font-bold">{project.pendingTasks}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Final Deadline</p>
                    <p className="text-lg font-semibold">{new Date(project.finalDeadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Progress</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList className="grid w-full sm:w-fit grid-cols-3">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="analytics">Analytics View</TabsTrigger>
              </TabsList>

              {activeTab === "list" && (
                <Button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="bg-primary text-primary-foreground w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              )}
            </div>

            <TabsContent value="list">
              <TaskListView projectId={projectId} />
            </TabsContent>

            <TabsContent value="calendar">
              <TaskCalendarView projectId={projectId} />
            </TabsContent>

            <TabsContent value="analytics">
              <TaskAnalyticsView projectId={projectId} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* New Task Modal */}
      <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onSubmit={handleCreateTask} />
    </div>
  )
}
