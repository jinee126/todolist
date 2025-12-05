'use client';

import { useState } from 'react';
import TodoList from '@/components/TodoList';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      
      <main className="flex-1 overflow-auto">
        <div className="py-8 px-4 lg:px-8">
          <TodoList filter={filter} />
        </div>
      </main>
    </div>
  );
}
