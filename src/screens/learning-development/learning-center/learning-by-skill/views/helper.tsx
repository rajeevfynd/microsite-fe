import type { MenuProps } from 'antd';


export const getFormattedDataForMenuItems = (apiData: { id: number; name: string }[]) => {
    const items: MenuProps['items'] = apiData.map((data: { id: number; name: string; }, index: any) => ({
        key: String(data.id),
        label: `${data.name}`,
    }));

    return items
}