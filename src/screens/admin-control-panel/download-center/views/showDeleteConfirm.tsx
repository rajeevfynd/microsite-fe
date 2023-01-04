import { Button, message, Modal } from "antd"
import * as React from "react"
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { deleteDownloads } from "../../../../service/download-center-service";

const { confirm } = Modal;

export const ShowDeleteConfirm = (props : {deleteUrl : string, id : string, onDeleteConfirm : any}) => {

    const deleteConfirm = () => {
        deleteDownloads(props.deleteUrl, props.id)
        .then((response) => {
            console.log("deleted ")
            props.onDeleteConfirm()
        })
        .catch((error) => {
            message.error(error);
        });
    }

    const showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure delete this?',
          icon: <ExclamationCircleFilled />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
            deleteConfirm()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      React.useEffect(() => {
        console.log("hi there")
    }, [])

    return (
        <>  
            <Button type="text" onClick={showDeleteConfirm}><DeleteFilled /></Button>
        </>
    )

}