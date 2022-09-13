import * as React from 'react'
import {Row, Col, Collapse} from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';


const { Panel } = Collapse;

const onChange = (key: any) => {
    console.log(key);
};


export const FAQCollapse = () => {

    const editOptions = () => (
        <div>
            <EditTwoTone 
                onClick={event => {
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                    console.log("Edit Clicked")
                }}
            />
            &nbsp;&nbsp;
            <DeleteTwoTone 
                onClick={event => {
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                    console.log("Delete Clicked")
                }}
            />

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
  