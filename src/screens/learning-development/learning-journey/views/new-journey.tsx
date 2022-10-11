import { Button, Form, Input, message, Select, Switch } from 'antd';
import {  PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { JourneyCategory } from '../../../../models/enums/journey-category';
import { SortableElement,SortableContainer, SortableContainerProps, SortableElementProps } from 'react-sortable-hoc'
import { handleFormSubmit, onSelectHandler, removeProgramHadler, setJourney, sortEndHandler } from '../../../../service/journey-service';
import { ProgramMapType } from '../../../../models/program-map-type';
import { SearchInput } from '../../../../components/select-search/select-input';

export const NewJourney: React.FC = () => {

  const navigate = useNavigate()
  const [programs, setPrograms] = React.useState<ProgramMapType[]>([])

  const { Option } = Select;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = (values: any) => {
    handleFormSubmit(values,programs).then(resp => {
      if(resp.data){
        message.success('Journey added successfully');
      }
    })
  };

  const addProgram = () =>{
    setPrograms([...programs, {index:programs.length, rruProgramID: undefined}])
  }

  const onSortEnd = ( index: {oldIndex:any, newIndex:any} ) =>{
    setPrograms(sortEndHandler(index, programs))
  }

  const removeProgram = (index: number) =>{
    setPrograms(removeProgramHadler(index, programs))
  }

  const handleOnSelect = (e:any,index:number) =>{
    setPrograms(onSelectHandler(index,e,programs))
  }

  const SortableItem : any = SortableElement( (data: { item: ProgramMapType}) => {return (
  <li key={data.item.index}>
    <HolderOutlined style={{width:50, cursor: 'grab'}}/>
    <SearchInput 
      defaultValue={data.item.rruProgramID}
      onSelect={(e: any) => { handleOnSelect(e,data.item.index) }}
      placeholder='Select Program [RRU Program Id]' 
      style={{ width: 250 }} 
    />
    <Button danger className='remove-btn' type='primary' onClick={() =>{removeProgram(data.item.index)}}>-</Button>
    </li>
  )})

  const SortableList : any = SortableContainer( (data: {programs: ProgramMapType[]}) => (<div>
    {data.programs
      .sort( (a:ProgramMapType ,b:ProgramMapType) => { return a.index - b.index;} )
      .map( (program:ProgramMapType, index:number) => (
         <div><SortableItem item={program} index={index} key={program.index}/></div>
      ))}
  </div>) );

  return (    <>
    <React.Fragment>
      <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>

      <h4>Create New Journey</h4>

      <div className='scroll-container'>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

          <Form.Item name={['journey', 'title']} label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={['journey', 'description']} label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name={['journey', 'thumbnailLink']} label="Thumbnail URL">
            <Input />
          </Form.Item>

          <Form.Item name={['journey', 'category']} label="Category" rules={[{ required: true }]}>
            <Select
              placeholder="Select Journey Category"
              allowClear
            >
              <Option value={JourneyCategory.GENERAL}>General</Option>
              <Option value={JourneyCategory.INDUCTION}>Induction</Option>
            </Select>
          </Form.Item>

          <Form.Item name={['journey','sequencial']} label="Sequencial Journey">
            <Switch/>
          </Form.Item>

          <Form.Item label="Programs">
            <SortableList 
            helperClass="helper"
            programs={programs} 
            axis='y' 
            onSortEnd={onSortEnd} />
            <Button type='dashed' 
              onClick={()=> {addProgram()}
            }> 
            <PlusOutlined /> Add Program
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Create Journey
            </Button>
          </Form.Item>

        </Form>
      </div>
      </React.Fragment>
    </>
  );
};