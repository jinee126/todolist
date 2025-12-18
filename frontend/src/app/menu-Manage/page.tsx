'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Menu as MenuIcon, Save, X } from 'lucide-react';

// 타입 정의
interface MenuDto {
    menuSeq: number;
    parentMenuSeq: number | null;
    name: string;
    depth: number;
    menuUrl: string;
    menuOrder: number;
    iconClass: string;
    description: string;
    useYn: 'Y' | 'N';
    children: MenuDto[];
}

interface MenuFormData {
    parentMenuSeq: number | null;
    name: string;
    menuUrl: string;
    menuOrder: number;
    iconClass: string;
    description: string;
    useYn: 'Y' | 'N';
}



export default function MenuManagePage() {
    const [menuData, setMenuData] = useState<MenuDto[]>(sampleMenuData);
    const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set([1, 4]));
    const [selectedMenu, setSelectedMenu] = useState<MenuDto | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<MenuFormData>({
        parentMenuSeq: null,
        name: '',
        menuUrl: '',
        menuOrder: 1,
        iconClass: '',
        description: '',
        useYn: 'Y'
    });

    // TODO: 메뉴 트리 조회 API
    const fetchMenuTree = () => {
        // API 호출 로직
    };

    // TODO: 메뉴 펼치기/접기
    const toggleMenu = (menuSeq: number) => {
        // 구현 필요
    };

    // TODO: 메뉴 선택
    const handleSelectMenu = (menu: MenuDto) => {
        // 구현 필요
    };

    // TODO: 신규 메뉴 추가 모드
    const handleCreateNew = (parentMenu?: MenuDto) => {
        // 구현 필요
    };

    // TODO: 수정 모드
    const handleEdit = (menu: MenuDto) => {
        // 구현 필요
    };

    // TODO: 취소
    const handleCancel = () => {
        // 구현 필요
    };

    // TODO: 저장 (생성/수정)
    const handleSave = () => {
        // API 호출 로직
    };

    // TODO: 삭제
    const handleDelete = (menu: MenuDto) => {
        // API 호출 로직
    };

    // 재귀적으로 메뉴 트리 렌더링
    const renderMenuTree = (menus: MenuDto[], level: number = 0) => {
        return menus.map((menu) => {
            const isExpanded = expandedMenus.has(menu.menuSeq);
            const isSelected = selectedMenu?.menuSeq === menu.menuSeq;
            const hasChildren = menu.children && menu.children.length > 0;

            return (
                <div key={menu.menuSeq}>
                    <div
                        className={`
                            flex items-center gap-2 px-3 py-2 cursor-pointer
                            hover:bg-gray-50 transition-colors
                            ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                        `}
                        style={{ paddingLeft: `${level * 24 + 12}px` }}
                    >
                        {/* 펼치기/접기 아이콘 */}
                        <div
                            className="flex-shrink-0 w-5 h-5"
                            onClick={() => hasChildren && toggleMenu(menu.menuSeq)}
                        >
                            {hasChildren ? (
                                isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                )
                            ) : (
                                <div className="w-5 h-5" />
                            )}
                        </div>

                        {/* 메뉴 정보 */}
                        <div
                            className="flex-1 flex items-center gap-3"
                            onClick={() => handleSelectMenu(menu)}
                        >
                            <MenuIcon className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-800">{menu.name}</span>
                            <span className="text-sm text-gray-500">{menu.menuUrl}</span>
                            {menu.useYn === 'N' && (
                                <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                                    미사용
                                </span>
                            )}
                        </div>

                        {/* 액션 버튼 */}
                        <div className="flex items-center gap-1">
                            {menu.depth < 3 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCreateNew(menu);
                                    }}
                                    className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                    title="하위 메뉴 추가"
                                >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(menu);
                                }}
                                className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                                title="수정"
                            >
                                <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(menu);
                                }}
                                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                                title="삭제"
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </div>
                    </div>

                    {/* 하위 메뉴 렌더링 */}
                    {hasChildren && isExpanded && renderMenuTree(menu.children, level + 1)}
                </div>
            );
        });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* 왼쪽 메뉴 트리 영역 */}
            <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
                {/* 헤더 */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-800">메뉴 관리</h1>
                        <button
                            onClick={() => handleCreateNew()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            최상위 메뉴 추가
                        </button>
                    </div>
                </div>

                {/* 메뉴 트리 */}
                <div className="flex-1 overflow-y-auto">
                    {renderMenuTree(menuData)}
                </div>
            </div>

            {/* 오른쪽 상세 정보/수정 영역 */}
            <div className="w-1/2 bg-white flex flex-col">
                {/* 헤더 */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isCreating ? '메뉴 추가' : isEditing ? '메뉴 수정' : '메뉴 상세'}
                    </h2>
                </div>

                {/* 내용 */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!selectedMenu && !isCreating && !isEditing ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            메뉴를 선택하거나 추가해주세요
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* 상위 메뉴 (읽기 전용) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    상위 메뉴
                                </label>
                                <input
                                    type="text"
                                    value={formData.parentMenuSeq ? `메뉴 ID: ${formData.parentMenuSeq}` : '최상위 메뉴'}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                />
                            </div>

                            {/* 메뉴명 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    메뉴명 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={isEditing || isCreating ? formData.name : selectedMenu?.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    placeholder="메뉴명을 입력하세요"
                                />
                            </div>

                            {/* 메뉴 URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    메뉴 URL
                                </label>
                                <input
                                    type="text"
                                    value={isEditing || isCreating ? formData.menuUrl : selectedMenu?.menuUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, menuUrl: e.target.value })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    placeholder="/path/to/page"
                                />
                            </div>

                            {/* 메뉴 순서 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    메뉴 순서 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={isEditing || isCreating ? formData.menuOrder : selectedMenu?.menuOrder || 1}
                                    onChange={(e) => setFormData({ ...formData, menuOrder: parseInt(e.target.value) || 1 })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    min="1"
                                />
                            </div>

                            {/* 아이콘 클래스 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    아이콘 클래스
                                </label>
                                <input
                                    type="text"
                                    value={isEditing || isCreating ? formData.iconClass : selectedMenu?.iconClass || ''}
                                    onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                    placeholder="icon-name"
                                />
                            </div>

                            {/* 설명 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    설명
                                </label>
                                <textarea
                                    value={isEditing || isCreating ? formData.description : selectedMenu?.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    disabled={!isEditing && !isCreating}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none"
                                    placeholder="메뉴에 대한 설명을 입력하세요"
                                />
                            </div>

                            {/* 사용여부 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    사용여부
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Y"
                                            checked={(isEditing || isCreating ? formData.useYn : selectedMenu?.useYn) === 'Y'}
                                            onChange={(e) => setFormData({ ...formData, useYn: e.target.value as 'Y' | 'N' })}
                                            disabled={!isEditing && !isCreating}
                                            className="mr-2"
                                        />
                                        사용
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="N"
                                            checked={(isEditing || isCreating ? formData.useYn : selectedMenu?.useYn) === 'N'}
                                            onChange={(e) => setFormData({ ...formData, useYn: e.target.value as 'Y' | 'N' })}
                                            disabled={!isEditing && !isCreating}
                                            className="mr-2"
                                        />
                                        미사용
                                    </label>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            {(isEditing || isCreating) && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        저장
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        취소
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
