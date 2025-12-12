'use client';

import { useState } from 'react';
import {
  Home,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  List,
  Code,
} from 'lucide-react';
import Link from "next/link";
import {usePathname} from "next/navigation";


interface MenuItem {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  href : string;
  children?: {
    id: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    href : string;
  }[];
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['settings']); // 기본으로 설정 메뉴 열림

  const path = usePathname();

  const menuItems: MenuItem[] = [
    { id: 'all', label: '전체', Icon: Home, href:'/' },
    {
      id: 'settings',
      label: '설정',
      Icon: Settings,
      href:'',
      children: [
        { id: 'menu-manage', label: '메뉴관리', Icon: List ,href:'/menu-Manage'},
        { id: 'code-manage', label: '공통코드관리', Icon: Code ,href:'/commonCode'},
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
        prev.includes(menuId)
            ? prev.filter((id) => id !== menuId)
            : [...prev, menuId]
    );
  };


  return (
      <>
        {/* Mobile Menu Button */}
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        >
          {isCollapsed ? (
              <Menu className="w-6 h-6 text-gray-700" />
          ) : (
              <X className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Overlay for mobile */}
        {!isCollapsed && (
            <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setIsCollapsed(true)}
            />
        )}

        {/* Sidebar */}
        <aside
            className={`
          fixed lg:sticky top-0 left-0 h-screen z-40
          bg-white shadow-xl
          transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
        `}
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo/Header */}
            <div className="mb-8 flex items-center justify-between">
              {!isCollapsed && (
                  <h2 className="text-2xl font-bold text-indigo-600">
                    TodoApp
                  </h2>
              )}
              <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                    <Menu className="w-6 h-6 text-gray-700" />
                ) : (
                    <X className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* Main Menu Items */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const { Icon } = item;
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedMenus.includes(item.id);
                  const isActive = path === item.href;

                  return (
                      <li key={item.id}>
                        {/* 1depth 메뉴 */}
                        <button

                            className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200
                        ${isActive && !hasChildren
                                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                            }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                        >
                          <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                          {!isCollapsed && (
                              <>
                                <span className="text-sm flex-1 text-left">{item.label}</span>
                                {hasChildren && (
                                    isExpanded ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )
                                )}
                              </>
                          )}
                        </button>

                        {/* 2depth 메뉴 */}
                        {hasChildren && !isCollapsed && isExpanded && (
                            <ul className="mt-1 ml-4 space-y-1">
                              {item.children!.map((child) => {
                                const ChildIcon = child.Icon;
                                const isChildActive = path === child.href;

                                return (
                                    <li key={child.id}>
                                      <button

                                          className={`
                                  w-full flex items-center gap-3 px-4 py-2 rounded-lg
                                  transition-all duration-200
                                  ${isChildActive
                                              ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                              : 'text-gray-600 hover:bg-gray-50'
                                          }
                                `}
                                      >
                                        <ChildIcon className="w-4 h-4 flex-shrink-0" />
                                        <Link className="text-sm" href={child.href}>{child.label}</Link>
                                        {isChildActive && (
                                            <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                        )}
                                      </button>
                                    </li>
                                );
                              })}
                            </ul>
                        )}
                      </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
      </>
  );
}
