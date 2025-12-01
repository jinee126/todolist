'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { todoApi } from '@/lib/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Todo 목록 조회
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAllTodos();
      console.log(data);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 Todo 목록 조회
  useEffect(() => {
    fetchTodos();
  }, []);

  // Todo 추가
  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await todoApi.createTodo({ title, completed: false });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  // Todo 완료 상태 토글
  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = await todoApi.updateTodo(id, {
        title: todo.title,
        completed: !todo.completed,
      });

      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Todo 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  // Todo 제목 수정
  const handleEditTodo = async (id: number, newTitle: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = await todoApi.updateTodo(id, {
        title: newTitle,
        completed: todo.completed,
      });

      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      setError('Failed to edit todo');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Todo List
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <TodoForm onAddTodo={handleAddTodo} />

      <div className="mt-6 space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
      </div>
    </div>
  );
}
