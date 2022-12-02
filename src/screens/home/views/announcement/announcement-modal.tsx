import { Card, Divider, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { announcementType } from '../../../../models/announcementType';
import { getAnnouncementDoc } from '../../../../service/announcment-service';
import './index.css'


function AnnouncementModal(props: announcementType) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [doc,setdoc] = React.useState();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const fetchAnnouncmentDoc= React.useCallback(async (props: announcementType) =>{
        let resp = await getAnnouncementDoc(props)
        console.log(resp.data.url)
        setdoc(resp.data.url);
    },[])
    // if(props){
    //     fetchAnnouncmentDoc
    // }
    React.useEffect(()=>{
        fetchAnnouncmentDoc(props)
    },[props,fetchAnnouncmentDoc(props)])

    return (<>
        <div>
            <span>
            <a  onClick={showModal}>
                <h6 style={{fontWeight:'540'}} className='inline'>
                    {props.title}
                </h6>
            </a>
            
            <p className='float-right'>{props.createdAt} </p>
            </span>
            { props.description !== '' &&
                <p className='truncated'>{props.description}</p>
            }
            <Divider />
        </div>
        <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer = {[]}>
            { props.description == null &&
                <div>
                    <iframe src={doc} height={'740px'} width={'470px'} ></iframe>
                </div>
            }
            { props.description !== '' &&
                <p>{props.description}</p>
            }
        </Modal>

    </>
    )

}

export default AnnouncementModal;