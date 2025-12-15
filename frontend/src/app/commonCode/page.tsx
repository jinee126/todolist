'use client';

import {useEffect, useState, useCallback} from 'react';

interface CommonCode {
    commonCodeSeq?: number;
    codeId: string;
    codeNm: string;
    upperCode: string;
    codeUseYn: string;
    codeOrder: number;
}


export default function Home() {
    const [codes, setCodes] = useState<CommonCode[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<CommonCode | null>(null);

    const fetchCommonList = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/commonCode');
            const data = await response.json();
            console.log(data);
            setCodes(data);
        } catch (error) {
            console.error('공통코드 조회 실패:', error);
        }
    }, []);

    // 컴포넌트 마운트 시 목록 조회
    useEffect(() => {
        (async () => {
            await fetchCommonList();
        })();
    }, [fetchCommonList]);


    const addLayer = () => {
        const newRow: CommonCode = {
            codeId: '',
            codeNm: '',
            upperCode: '',
            codeOrder: 0,
            codeUseYn: 'Y',
        };
        setCodes([...codes, newRow]);
    };

    const updateCode = (index: number, field: keyof CommonCode, value: string | number) => {
        const updatedCodes = codes.map((code, i) => {
            if (i === index) {
                return { ...code, [field]: value };
            }
            return code;
        });
        setCodes(updatedCodes);
    };

    const saveCode = async (index: number) => {
        const code = codes[index];
        
        if (!code.codeId || !code.codeNm) {
            alert('공통코드 ID와 코드명은 필수입니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/commonCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(code),
            });

            if (response.ok) {
                alert('저장되었습니다.');
                await fetchCommonList();
            } else {
                alert('저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('저장 실패:', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };
    const updateBtn = async (code: CommonCode) => {
        setEditingId(code.commonCodeSeq || null);
        setEditData({ ...code });
    }

    const cancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    }

    const saveEdit = async () => {
        if (!editData) return;

        if (!editData.codeId || !editData.codeNm) {
            alert('공통코드 ID와 코드명은 필수입니다.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/commonCode`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                alert('수정되었습니다.');
                await fetchCommonList();
                setEditingId(null);
                setEditData(null);
            } else {
                alert('수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('수정 실패:', error);
            alert('수정 중 오류가 발생했습니다.');
        }
    }

    const updateEditData = (field: keyof CommonCode, value: string | number) => {
        if (!editData) return;
        setEditData({ ...editData, [field]: value });
    }

    // ✅ 삭제 함수 수정
    const deleteCode = async (index: number) => {
        const code = codes[index];
        
        // seq가 있으면 서버에서 삭제
        if (code.commonCodeSeq) {
            if (!confirm('삭제하시겠습니까?')) {
                return;
            }
            
            try {
                const response = await fetch(`http://localhost:8080/api/commonCode/${code.commonCodeSeq}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('삭제되었습니다.');
                    await fetchCommonList();
                } else {
                    alert('삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        } else {
            // seq가 없으면 로컬에서만 삭제
            const updatedCodes = codes.filter((_, i) => i !== index);
            setCodes(updatedCodes);
        }
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">공통코드 관리</h2>
                <p className="text-sm text-gray-600 mt-1">공통코드를 추가하고 관리합니다.</p>
            </div>

            {/* 추가 버튼 */}
            <div className="mb-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => addLayer()}
                >
                    + 코드 추가
                </button>
            </div>

            {/* 테이블 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                공통코드 ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                공통코드 명
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상위코드
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                순서
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                사용여부
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {codes.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    등록된 공통코드가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            codes.map((code, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {!code.commonCodeSeq ? (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <input
                                                    type="text"
                                                    value={code.codeId}
                                                    onChange={(e) => updateCode(index, 'codeId', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="ID 입력"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <input
                                                    type="text"
                                                    value={code.codeNm}
                                                    onChange={(e) => updateCode(index, 'codeNm', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="코드명 입력"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="text"
                                                    value={code.upperCode}
                                                    onChange={(e) => updateCode(index, 'upperCode', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="상위코드"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <input
                                                    type="number"
                                                    value={code.codeOrder}
                                                    onChange={(e) => updateCode(index, 'codeOrder', parseInt(e.target.value) || 0)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <select
                                                    value={code.codeUseYn}
                                                    onChange={(e) => updateCode(index, 'codeUseYn', e.target.value)}
                                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    <option value="Y">Y</option>
                                                    <option value="N">N</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button onClick={() => saveCode(index)} className="text-green-600 hover:text-green-900 mr-3">
                                                    저장
                                                </button>
                                                <button  onClick={() => deleteCode(index)}  className="text-red-600 hover:text-red-900">
                                                    삭제
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            {editingId === code.commonCodeSeq ? (
                                                // 편집 모드
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <input
                                                            type="text"
                                                            value={editData?.codeId || ''}
                                                            onChange={(e) => updateEditData('codeId', e.target.value)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <input
                                                            type="text"
                                                            value={editData?.codeNm || ''}
                                                            onChange={(e) => updateEditData('codeNm', e.target.value)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <input
                                                            type="text"
                                                            value={editData?.upperCode || ''}
                                                            onChange={(e) => updateEditData('upperCode', e.target.value)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <input
                                                            type="number"
                                                            value={editData?.codeOrder || 0}
                                                            onChange={(e) => updateEditData('codeOrder', parseInt(e.target.value) || 0)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <select
                                                            value={editData?.codeUseYn || 'Y'}
                                                            onChange={(e) => updateEditData('codeUseYn', e.target.value)}
                                                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <button onClick={saveEdit} className="text-green-600 hover:text-green-900 mr-3">
                                                            저장
                                                        </button>
                                                        <button onClick={cancelEdit} className="text-gray-600 hover:text-gray-900">
                                                            취소
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                // 일반 모드
                                                <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {code.codeId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {code.codeNm}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {code.upperCode || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {code.codeOrder}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                <span className={`px-2 py-1 rounded ${code.codeUseYn === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {code.codeUseYn}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button onClick={()=> updateBtn(code)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    수정
                                                </button>
                                                <button onClick={() => deleteCode(index)} className="text-red-600 hover:text-red-900">
                                                    삭제
                                                </button>
                                            </td>
                                                </>
                                            )}
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}