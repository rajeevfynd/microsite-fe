import type { MenuProps } from 'antd';



export const itemList: { id: number, name: string, isCompleted: boolean }[] = new Array(50);

for (let i = 0; i < itemList.length; i++) {
    itemList[i] = {
        id: i + 1,
        name: 'Skill',
        isCompleted: i % 2 === 0 ? true : false
    }
};


export const getFormattedDataForMenuItems = (apiData: { id: number; name: string }[]) => {
    const items: MenuProps['items'] = apiData.map((data: { id: number; name: string; }, index: any) => ({
        key: String(data.id),
        label: `${data.name}`,
    }));

    return items
}