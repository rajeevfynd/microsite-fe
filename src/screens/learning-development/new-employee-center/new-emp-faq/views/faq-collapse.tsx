import * as React from 'react'
import {Row, Collapse, Modal} from 'antd';
import EditQNAButton from './edit-qna-modal';
import DeleteButton from './delete-confirm-modal';

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
                <DeleteButton></DeleteButton>
            </Row>
        </div>

        
      );

    return (
          <div>
              <Collapse  onChange={onChange}>

                  <Panel header="Question 1" key="1" extra={editOptions()}>
                      <div>
                        <Row>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque blanditiis dicta ea commodi, voluptate itaque voluptas inventore dignissimos odit et impedit minima quasi perferendis eligendi recusandae error fugiat rerum tempora.

                        </Row>
                        <p></p>
                        <Row justify="end">
                            Updated two days ago
                        </Row>
                      </div>
                  </Panel>

                  <Panel header="Question 2" key="2" extra={editOptions()}>
                      <div>
                        <Row>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque blanditiis dicta ea commodi, voluptate itaque voluptas inventore dignissimos odit et impedit minima quasi perferendis eligendi recusandae error fugiat rerum tempora.

                        </Row>
                        <p></p>
                        <Row justify="end">
                            Updated a week ago
                        </Row>
                      </div>
                  </Panel>

                  <Panel header="Question 3" key="3" extra={editOptions()}>
                  <div>
                        <Row>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque blanditiis dicta ea commodi, voluptate itaque voluptas inventore dignissimos odit et impedit minima quasi perferendis eligendi recusandae error fugiat rerum tempora.

                        </Row>
                        <p></p>
                        <Row justify="end">
                            Updated a month ago
                        </Row>
                      </div>
                  </Panel>

                  <Panel header="Question 4" key="4" extra={editOptions()}>
                  <div>
                        <Row>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque blanditiis dicta ea commodi, voluptate itaque voluptas inventore dignissimos odit et impedit minima quasi perferendis eligendi recusandae error fugiat rerum tempora.

                        </Row>
                        <p></p>
                        <Row justify="end">
                            Updated a month ago
                        </Row>
                      </div>
                  </Panel>

              </Collapse>
  
          </div>
    )
  }
  