import { useEffect } from "react";
import { useProjectStore } from "@/store/projectStore";

export default function TestProject() {
  const { projects, fetchProjects, addProject, updateProject, deleteProject } = useProjectStore();

  useEffect(() => {
    const test = async () => {
      try {
        // Test fetch
        await fetchProjects("user-123");

        // Test insert
        const newProject = await addProject({
          user_id: "user-123",
          name: "Test Project",
          description: "Just testing",
        });
        console.log("Inserted:", newProject);

        // Test update
        const updated = await updateProject(newProject.id, { name: "Updated Name" });
        console.log("Updated:", updated);

        // Test delete
        await deleteProject(newProject.id);
        console.log("Deleted:", newProject.id);
      } catch (err) {
        console.error("API Test Error:", err);
      }
    };
    test();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  );
}
