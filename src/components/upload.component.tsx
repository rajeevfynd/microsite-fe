import * as React from 'react';
import { Upload as AntUpload, UploadProps as AntUploadProps, message, UploadFile } from 'antd';
import { UploadProps } from '../models/upload-props';
import { PlusOutlined } from '@ant-design/icons';
import { formatBase64 } from '../utility/image-utils';


export const Upload = (props: UploadProps) => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    React.useEffect(() => {
        if (props.file) {
            setFileList([{
                uid: `${Math.random()}`,
                name: 'thumbnail',
                status: 'done',
                url: formatBase64(props.file),
            }])
        }
    }, [props.file]);

    const prop: AntUploadProps = {
        name: 'file',
        action: "/microsite/document/upload",
        onChange(info) {
            setFileList(info.fileList);
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                props.onDone({
                    documentId: info.file.response.data.id,
                    thumbnailUrl: info.file.response.data.thumbnail
                });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
            }
        },
        onRemove(info) {
            props.onRemove({});
        }
    };


    return (
        <AntUpload listType="picture-card" {...prop} maxCount={1} fileList={fileList}>
            {
                fileList.length > 0
                    ? null
                    : (<div>
                        <PlusOutlined />
                        <div>Upload</div>
                    </div>)
            }
        </ AntUpload>
    )
}