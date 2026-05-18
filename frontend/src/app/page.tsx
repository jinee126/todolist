'use client';

import { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import Sidebar from '@/components/Sidebar';
import { geminiApi } from '@/lib/api';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [recLoading, setRecLoading] = useState(true);
  const [recError, setRecError] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setRecLoading(true);
        const result = await geminiApi.getRecommendations();
        setRecommendations(result);
      } catch {
        setRecError(true);
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex-1 overflow-auto">
        <div className="py-8 px-4 lg:px-8">

          <div className="max-w-2xl mx-auto mb-6 p-5 bg-white rounded-2xl shadow-sm border border-indigo-100">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">✨ Gemini 추천 목록</h2>
            {recLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400" />
                추천 목록을 불러오는 중...
              </div>
            )}
            {!recLoading && recError && (
              <p className="text-sm text-red-400">추천 목록을 불러오지 못했습니다.</p>
            )}
            {!recLoading && !recError && recommendations && (
              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {recommendations}
              </pre>
            )}
          </div>

          <TodoList filter={filter} />
        </div>
      </main>
    </div>
  );
}
