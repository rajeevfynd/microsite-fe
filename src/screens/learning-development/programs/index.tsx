import { Result, Typography } from 'antd';
import Button from 'antd/lib/button';
import * as React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { ProgramDetail } from '../../../components/program-detail/program-detail';

const { Text } = Typography;
export const ProgramDetailsView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ isExists, setIsExists ] = React.useState(true)
    
  return (
    <>
        <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>
        {isExists &&
        <>
            <ProgramDetail 
                details= { {
                    id: 1,
                    title : 'Program title',
                    description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ligula at consectetur convallis. Morbi efficitur ac velit nec venenatis. Curabitur volutpat porttitor quam, ut dapibus lorem finibus eu. Phasellus non urna diam. Aliquam semper velit at purus aliquam, ut porttitor eros volutpat.',
                    thumbnailLink : 'https://picsum.photos/300/200',
                    flow : 'SEQUENCE',
                    courses : [
                        {
                            course : {
                                title : 'Course 1',
                                description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ligula at consectetur convallis. Morbi efficitur ac velit nec venenatis. Curabitur volutpat porttitor quam, ut dapibus lorem finibus eu. Phasellus non urna diam. Aliquam semper velit at purus aliquam, ut porttitor eros volutpat.',
                                thumbnailLink : 'https://picsum.photos/300/200',
                                duration : '180'
                            },
                            isActive : true,
                            status : 'INCOMPLETE'
                        },
                        {
                            course : {
                                title : 'Course 2',
                                description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra ligula at consectetur convallis. Morbi efficitur ac velit nec venenatis. Curabitur volutpat porttitor quam, ut dapibus lorem finibus eu. Phasellus non urna diam. Aliquam semper velit at purus aliquam, ut porttitor eros volutpat.',
                                thumbnailLink : 'https://picsum.photos/300/200',
                                duration : '120'
                            },
                            isActive : false,
                            status : 'INCOMPLETE'
                        }
                    ]
                }
            }
            />
        </>
          
        }
        {
          !isExists &&
          <Result
            status="404"
            title={<Text type='secondary'>No Details Found</Text>}
          />
        }
    </>
  )
}
