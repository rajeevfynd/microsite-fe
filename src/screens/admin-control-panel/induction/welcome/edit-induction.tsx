import { Button, Form, Input, message, Select, Switch, Upload, UploadProps } from 'antd';
import {  PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { SortableElement,SortableContainer, SortableContainerProps, SortableElementProps } from 'react-sortable-hoc'
import { getJourneyDetails, handleFormSubmit, onSelectHandler, removeProgramHadler, setJourney, sortEndHandler } from '../../../../service/journey-service';
import { ProgramMapType } from '../../../../models/journey-details';
import { SearchInput } from '../../../../components/search-input/search-input';
import { Flow } from '../../../../models/enums/flow';
import { getActiveInductionJourney } from '../../../../service/induction-service';

type editInductionJourneyDetails = {
    title ?: string,
    description ?: string,
    sequence?: boolean,
    id?: string
}

export const EditInduction = () => {
    const [programs, setPrograms] = React.useState<ProgramMapType[]>([])
    const [thumbnail, setThumbnail] = React.useState('')
    const [journey, setJourney] = React.useState<editInductionJourneyDetails>({sequence:true})
    const { Option } = Select;

  React.useEffect( ()=>
  {   
      getActiveInductionJourney().then( res => {
          processPrograms(res.data.programs);
          processJourneys(res.data);
      })
  },[])

  const processJourneys = (data: any) => {
    setJourney({
      title: data.title,
      description: data.description,
      sequence: data.flow == Flow.SEQUENCE,
      id : data.id
    })
  }

  const processPrograms = (programs: any[]) =>{
    let processedPrograms : ProgramMapType[] = []
    programs.forEach( (p: any,index:number) => {
      processedPrograms = [ ...processedPrograms, {
        program : p.program.id.toString(),
        programName : p.program.title,
        index: index
      }]
    })
    setPrograms(processedPrograms) }

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = () => {
    handleFormSubmit(journey, programs,thumbnail, 'INDUCTION', journey.id).then(resp => {
      if(resp.data){
        message.success('Journey updated successfully');
      }
    })
  };

  const addProgram = () =>{
    setPrograms([...programs, {index:programs.length, program: undefined, programName: undefined}])
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
  const prop: UploadProps = {
    name: 'file',
    action: "/microsite/document/upload",
    onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setThumbnail(info.file.response.data.id)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
        }
    },
};

  const SortableItem : any = SortableElement( (data: { item: ProgramMapType}) => {return (
  <li key={data.item.index}>
    <HolderOutlined style={{width:50, cursor: 'grab'}}/>
    <SearchInput 
      defaultValue={data.item.programName}
      onSelect={(e: any) => { handleOnSelect(e,data.item.index) }}
      placeholder='Select Program' 
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

      <div className='scroll-container'>
        <Form onFinish={onFinish} validateMessages={validateMessages}>
            
          <Form.Item>
            Thumbnail
            <Upload  listType="picture-card" {...prop} maxCount = {1} onRemove={()=>setThumbnail('')}>
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>

          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            Title
            <Input value={journey.title} onChange={ (e)=>{
                setJourney({
                    id : journey.id,
                    title: e.target.value,
                    description: journey.description,
                    sequence: journey.sequence
                })
            } }/>
          </Form.Item>

          <Form.Item>
            Description
            <Input.TextArea value={journey.description} onChange={ (e)=>{
                setJourney({
                    id : journey.id,
                    title: journey.title,
                    description: e.target.value,
                    sequence: journey.sequence
                })
            } }/>
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={journey.sequence} onClick={ ()=>{
                setJourney({
                    id: journey.id,
                    title: journey.title,
                    description: journey.description,
                    sequence: !journey.sequence
                })
            } }/>
          </Form.Item>

          <Form.Item >
            Programs
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol}}>
            <Button type="primary" htmlType="submit">
              Edit Induction
            </Button>
          </Form.Item>

        </Form>
      </div>
      </React.Fragment>
    </>
  );
};
function validateJourney(value: any) {
  throw new Error('Function not implemented.');
}

