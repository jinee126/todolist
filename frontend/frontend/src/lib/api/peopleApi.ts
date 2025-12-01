import { apiClient } from './client';

// People 관련 타입 (예시)
export interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface PersonRequest {
  name: string;
  email: string;
  age: number;
}

// People API
export const peopleApi = {
  // 모든 사람 조회
  getAll: () => apiClient.get<Person[]>('/people'),

  // 특정 사람 조회
  getById: (id: number) => apiClient.get<Person>(`/people/${id}`),

  // 사람 생성
  create: (data: PersonRequest) => apiClient.post<Person>('/people', data),

  // 사람 수정
  update: (id: number, data: PersonRequest) => 
    apiClient.put<Person>(`/people/${id}`, data),

  // 사람 삭제
  delete: (id: number) => apiClient.delete(`/people/${id}`),

  // 이메일로 검색
  searchByEmail: (email: string) => 
    apiClient.get<Person[]>(`/people/search?email=${email}`),
};
