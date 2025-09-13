// src/types/index.ts

export type ProjectStatus = 'active' | 'archived' | 'completed'; // Ví dụ thêm status cho project
export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskTopic = 'Study' | 'Teamwork' | 'Learning' | 'Work' | 'Other' | 'AI_Generated'; // Thêm AI_Generated

export interface UserProfile {
    id: string; // auth.users.id
    email: string;
    name?: string;
    avatar_url?: string;
}

export interface Project {
    id: string;
    user_id: string; // references profiles.id
    name: string;
    description: string;
    final_deadline: string; // ISO date string 'YYYY-MM-DD'
    created_at: string; // ISO timestamp
    status?: ProjectStatus;
}

export interface Task {
    id: string;
    project_id: string; // references projects.id
    title: string;
    description: string;
    deadline: string; // ISO date string 'YYYY-MM-DD'
    status: TaskStatus;
    assignee_id?: string; // optional, references profiles.id
    topic: TaskTopic;
    created_at: string; // ISO timestamp
}