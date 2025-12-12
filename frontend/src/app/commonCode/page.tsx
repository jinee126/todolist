'use client';

import {useEffect, useState, useCallback} from 'react';

interface CommonCode {
    seq?: number;
    commonCodeId: string;
    commonCodeNm: string;
    upperCode: string;
    order: number;
    useYn: string;
}


export default function Home() {
    const [codes, setCodes] = useState<CommonCode[]>([]);

    const fetchCommonList = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/commonCode');
            const data = await response.json();
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
            commonCodeId: '',
            commonCodeNm: '',
            upperCode: '',
            order: 0,
            useYn: 'Y',
        };
        setCodes([...codes, newRow]);
    };

    // ✅ updateCode 함수 추가
    const updateCode = (index: number, field: keyof CommonCode, value: string | number) => {
        const updatedCodes = codes.map((code, i) => {
            if (i === index) {
                return { ...code, [field]: value };
            }
            return code;
        });
        setCodes(updatedCodes);
    };

    // ✅ 저장 함수 추가
    const saveCode = async (index: number) => {
        const code = codes[index];
        
        // 유효성 검사
        if (!code.commonCodeId || !code.commonCodeNm) {
            alert('공통코드 ID와 코드명은 필수입니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/common-codes', {
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

    // ✅ 삭제 함수 수정
    const deleteCode = async (index: number) => {
        const code = codes[index];
        
        // seq가 있으면 서버에서 삭제
        if (code.seq) {
            if (!confirm('삭제하시겠습니까?')) {
                return;
            }
            
            try {
                const response = await fetch(`http://localhost:8080/api/common-codes/${code.seq}`, {
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
                                    {!code.seq ? (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <input
                                                    type="text"
                                                    value={code.commonCodeId}
                                                    onChange={(e) => updateCode(index, 'commonCodeId', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="ID 입력"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <input
                                                    type="text"
                                                    value={code.commonCodeNm}
                                                    onChange={(e) => updateCode(index, 'commonCodeNm', e.target.value)}
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
                                                    value={code.order}
                                                    onChange={(e) => updateCode(index, 'order', parseInt(e.target.value) || 0)}
                                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <select
                                                    value={code.useYn}
                                                    onChange={(e) => updateCode(index, 'useYn', e.target.value)}
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {code.commonCodeId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {code.commonCodeNm}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {code.upperCode || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {code.order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                <span className={`px-2 py-1 rounded ${code.useYn === 'Y' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {code.useYn}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    수정
                                                </button>
                                                <button onClick={() => deleteCode(index)} className="text-red-600 hover:text-red-900">
                                                    삭제
                                                </button>
                                            </td>
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