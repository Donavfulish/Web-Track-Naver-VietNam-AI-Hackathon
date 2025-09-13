import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import RecentProjects from "@/components/RecentProjects"
import ComingDeadlines from "@/components/ComingDeadlines"
import ChartsSection from "@/components/ChartsSection"
import { useProjectStore } from "@/store/projectStore";
import { useEffect } from "react"

export default function ForYouPage() {
  const { projects, fetchProjects, loadingProjects } = useProjectStore();
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects]);


  if (loadingProjects) {
    return <div>⏳ Đang tải dữ liệu...</div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 pt-22 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">For You</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your projects and upcoming deadlines.
            </p>
          </div>

          {/* Recent Projects Section */}
          <RecentProjects projects={projects}/>

          {/* Coming Deadlines Section */}
          <ComingDeadlines />

          {/* Charts Section */}
          <ChartsSection />
        </div>
      </main>
    </div>
  )
}
