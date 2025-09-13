import { useNavigate } from 'react-router-dom'; // Thư viện React Router DOM thay cho Next.js

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import type { Project } from "@/types";

// --- Các phần còn lại của code không thay đổi ---

interface Project {
  id: number
  name: string
  description: string
  thumbnail: string
  completedTasks: number
  pendingTasks: number
  finalDeadline: string
  status: string
}

interface ProjectCardProps {
  project: Project[]
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

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate(); // Sử dụng hook useNavigate từ React Router DOM

  const handleClick = () => {
    navigate(`/projects/${project.id}`); // Sử dụng navigate để điều hướng
  }

  const totalTasks = project.completedTasks + project.pendingTasks;
  const completionPercentage =
    totalTasks > 0
      ? Math.round((project.completedTasks / totalTasks) * 100)
      : 0;

  return (
    <Card
      className="rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              className="w-full md:w-48 h-40 md:h-32 object-cover rounded-xl"
            />
          </div>

          {/* Project Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Hoàn thành:</span>
                <span className="font-medium">{project.completedTasks}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-muted-foreground">Đang chờ:</span>
                <span className="font-medium">{project.pendingTasks}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-muted-foreground">Deadline:</span>
                <span className="font-medium">
                  {new Date(project.finalDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiến độ</span>
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
  );
}