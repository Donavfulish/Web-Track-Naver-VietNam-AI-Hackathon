import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import ProjectCard from "@/components/ProjectCard"
import NewProjectModal from "@/components/NewProjectModal"
import { useProjectStore } from "@/store/projectStore";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect } from "react"

// Mock project data
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience.",
    thumbnail: "/website-design-mockup.png",
    completedTasks: 12,
    pendingTasks: 8,
    finalDeadline: "2024-12-30",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement and service delivery.",
    thumbnail: "/mobile-app-interface.png",
    completedTasks: 5,
    pendingTasks: 15,
    finalDeadline: "2025-02-15",
    status: "Planning",
  },
  {
    id: 3,
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure with improved performance.",
    thumbnail: "/database-architecture-diagram.jpg",
    completedTasks: 18,
    pendingTasks: 0,
    finalDeadline: "2024-11-30",
    status: "Completed",
  },
]

export default function ProjectsPage() {
  const { projects, fetchProjects, loadingProjects } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects]);

    if (loadingProjects) {
    return <div>⏳ Đang tải dữ liệu...</div>;
  }
  const handleCreateProject = (projectData: any) => {
    console.log("[v0] Creating new project:", projectData)
    // Here you would typically add the project to your state/database
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 pt-22 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Projects</h1>
              <p className="text-muted-foreground">Manage all your projects and track their progress.</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateProject} />
    </div>
  )
}
