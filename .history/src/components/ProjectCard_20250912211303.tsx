import { useNavigate } from 'react-router-dom'; // Thư viện React Router DOM thay cho Next.js

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Trash, Pencil } from "lucide-react";
import { Button } from './ui/button';


const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-300 text-green-900"
    case "Active":
      return "bg-blue-300 text-blue-900"
    case "Pending":
      return "bg-yellow-300 text-yellow-900"
    default:
      return "bg-red-300 text-red-900"
  }
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate(); // Sử dụng hook useNavigate từ React Router DOM

  const handleClick = () => {
    navigate(`/projects/${project.id}`); // Sử dụng navigate để điều hướng
  }

  const totalTasks = project.num_done + project.num_pending + project.num_to_do;
  const completionPercentage =
    totalTasks > 0
      ? Math.round(project.progress)
      : 0;

  return (
    <Card
      className="rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="px-6 py-4">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-shrink-0">
            <LazyLoadImage
              alt={project.name}
              src={project.img_src || "/placeholder.svg"} // full URL
              className="w-full md:w-48 h-40 md:h-38 object-cover rounded-xl"
            />
          </div>

          {/* Project Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed break-word">
                  {project.description}
                </p>
              </div>
                <div className="flex items-center gap-2">
              <Badge
                className={cn(
                  getStatusColor(project.status ?? ""),
                  "px-1 py-1 text-sm font-semibold" // tăng padding và font-size
                )}
              >
                {project.status}
              </Badge>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => console.log('delete')}
              >
                <Trash className="w-2 h-2" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => console.log('update')}
              >
                <Pencil className="w-2 h-" />
              </Button>
              </div>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Hoàn thành:</span>
                <span className="font-medium">{project.num_done}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-muted-foreground">Đang chờ:</span>
                <span className="font-medium">{project.num_pending}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-muted-foreground">Deadline:</span>
                <span className="font-medium">
                  {new Date(project.final_deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiến độ</span>
                <span className="text-medium">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
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