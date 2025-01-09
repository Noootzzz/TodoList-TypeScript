export interface User {
    username: string;
    password: string;
}

export interface Task {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: boolean;
    deadline: string;
}