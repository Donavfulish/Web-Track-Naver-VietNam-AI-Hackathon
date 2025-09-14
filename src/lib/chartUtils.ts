import type { Task, Project } from "@/types";

export function getCompletionDate(tasks: Task[]) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const grouped = tasks.reduce((acc, task) => {
    if (!task.completed_date) return acc;
    const date = new Date(task.completed_date as string);
    const month = date.getMonth();
    if (!acc[month]) acc[month] = { completed: 0, total: 0 };
    acc[month].total += 1;
    if (task.status === "Done") acc[month].completed += 1;
    return acc;
  }, {} as Record<number, { completed: number; total: number }>);

  return months.map((name, i) => ({
    name,
    completed: grouped[i]?.completed ?? 0,
    total: grouped[i]?.total ?? 0,
  }));
}

export function getTaskStatusData(tasks: Task[]){
  // Đếm số lượng mỗi loại
  const counts = tasks.reduce(
    (acc, task) => {
      switch (task.status) {
        case "Done":
          acc.done += 1
          break
        case "Miss":
          acc.miss += 1
          break
        case "Pending":
          acc.pending += 1
          break
        case "Todo":
          acc.todo += 1
          break
      }
      return acc
    },
    { done: 0, miss: 0, pending: 0, todo: 0 }
  )

  return [
    { name: "Done", value: counts.done, color: "#10B981" }, // xanh lá
    { name: "To do", value: counts.todo, color: "#2563EB" }, // xanh dương
    { name: "Pending", value: counts.pending, color: "#FBBF24" }, // vàng
    { name: "Miss", value: counts.miss, color: "#EF4444" }, // đỏ
  ]
}


export function getDeadlineData (tasks: Task[]){
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const weeks = [0, 0, 0, 0] // Week 1–4

  tasks.forEach((task) => {
    if (!task.deadline) return
    const d = new Date(task.deadline)

    // chỉ tính task deadline trong tháng/năm hiện tại
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear && task.status !== 'Done') {
      const day = d.getDate()
      if (day <= 7) weeks[0]++
      else if (day <= 14) weeks[1]++
      else if (day <= 21) weeks[2]++
      else weeks[3]++
    }
  })

  return [
    { name: "Week 1", remaining: weeks[0] },
    { name: "Week 2", remaining: weeks[1] },
    { name: "Week 3", remaining: weeks[2] },
    { name: "Week 4", remaining: weeks[3] },
  ]
}

export function getTaskProgressData(tasks: Task[], projectById: Project) {
  const projectStart = new Date(projectById.created_at);

  // Helper: tính số tuần kể từ ngày start
  function getWeekIndex(date: Date) {
    const diffMs = date.getTime() - projectStart.getTime();
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks; // 0-based (0 = Week 1)
  }

  // Gom nhóm tasks theo tuần
  const weekMap: Record<number, { completed: number; miss:number }> = {};

  tasks.forEach((task) => {
    const taskDate = task.completed_date
      ? new Date(task.completed_date)
      : new Date(task.deadline);

    const weekIndex = getWeekIndex(taskDate);

    if (!weekMap[weekIndex]) {
      weekMap[weekIndex] = { completed: 0, miss: 0};
    }

    if (task.status === "Done") {
      weekMap[weekIndex].completed += 1;
    } else if (task.status === "Miss"){
      weekMap[weekIndex].miss += 1;
    }
  });

  const taskProgressData = Object.keys(weekMap)
    .sort((a, b) => Number(a) - Number(b))
    .map((weekIndex) => ({
      week: `Week ${Number(weekIndex) + 1}`,
      completed: weekMap[Number(weekIndex)].completed,
      miss: weekMap[Number(weekIndex)].miss
    }));

  return taskProgressData;
}