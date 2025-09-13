import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import ProjectCard from "@/components/ProjectCard"
import NewProjectModal from "@/components/NewProjectModal"
import { useProjectStore } from "@/store/projectStore";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect } from "react"


export default function ProjectsPage() {
  const { projects, fetchProjects, loadingProjects } = useProjectStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects]);

  if (loadingProjects) {
    return <div>⏳ Đang tải dữ liệu...</div>;
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
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
