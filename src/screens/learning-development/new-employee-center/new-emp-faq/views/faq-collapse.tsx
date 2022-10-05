import * as React from 'react'
import {Row, Collapse, Modal} from 'antd';
import EditQNAButton from './edit-qna-modal';
// import DeleteButton from './delete-confirm-modal';


interface qaList{
    id : number,
    question : string,
    answer : string,
    updated_at : string
}

const { confirm } = Modal;


const { Panel } = Collapse;

const onChange = (key: any) => {
    console.log(key);
};


export const FAQCollapse = () => {

    const editOptions = () => (
        <div>
            <Row justify='end'>
                <EditQNAButton></EditQNAButton>
                &nbsp;&nbsp;
                {/* <DeleteButton></DeleteButton> */}
            </Row>
        </div>
      );


      const quesAns: qaList[] = [
        {
            id:1,
            question : "Question 1",
            answer : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
            updated_at : "12 Sep 2022"
        },
        {
            id:2,
            question : "Question 2",
            answer : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
            updated_at : "13 Sep 2022"
        },
        {
            id:3,
            question : "Question 3",
            answer : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, delectus? Id error illo delectus nihil facilis quasi natus voluptatem libero? Alias nam praesentium nihil ipsum perferendis libero hic saepe vel.",
            updated_at : "14 Sep 2022"
        }
      ]

    return (
          <div>
              <Collapse defaultActiveKey={[1, 2, 3, 4]} onChange={onChange}>
                {quesAns.map((quesAns: qaList) => (

                <Panel header={quesAns.question} key= {quesAns.id} extra={editOptions()}>
                        <div>
                            <Row>
                                {quesAns.answer}
                            </Row>
                            <p></p>
                            <Row justify="end">
                                Updated at {quesAns.updated_at}
                            </Row>
                        </div>
                </Panel>

                    ))}

              </Collapse>
  
          </div>
    )
  }
  