import { apiClient } from './client';
import { Todo, TodoRequest } from '@/types/todo';

export const todoApi = {
  // 모든 Todo 조회
  getAllTodos: () => apiClient.get<Todo[]>('/todos'),

  // 특정 Todo 조회
  getTodoById: (id: number) => apiClient.get<Todo>(`/todos/${id}`),

  // Todo 생성
  createTodo: (data: TodoRequest) => apiClient.post<Todo>('/todos', data),

  // Todo 수정
  updateTodo: (id: number, data: TodoRequest) => 
    apiClient.put<Todo>(`/todos/${id}`, data),

  // Todo 삭제
  deleteTodo: (id: number) => apiClient.delete(`/todos/${id}`),
};
