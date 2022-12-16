import { Button, Form, Input, List, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getJourneyDetails, handleFormSubmit, onSelectHandler, removeProgramHadler } from '../../../../service/journey-service';
import { ProgramMapType } from '../../../../models/journey-details';
import { SearchInput } from '../../../../components/search-input/search-input';
import { Flow } from '../../../../models/enums/flow';
import { Upload } from '../../../../components/upload.component';
import ReactDragListView from "react-drag-listview";
import { arrayMove } from '../../../../utility/array-utils';

type editJourneyDetails = {
  title?: string,
  description?: string,
  sequence?: boolean,
}

export const EditJourney = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [programs, setPrograms] = React.useState<ProgramMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')
  const [journey, setJourney] = React.useState<editJourneyDetails>({})
  const [category, setCategory] = React.useState('');
  const { Option } = Select;

  React.useEffect(() => {
    if(id) {
    getJourneyDetails(id).then(res => {
      processPrograms(res.data.programs);
      processJourneys(res.data);
    })
    }
  }, [])

  const processJourneys = (data: any) => {
    setJourney({
      title: data.title,
      description: data.description,
      sequence: data.flow == Flow.SEQUENCE
    })
    setCategory(data.category);
    setThumbnailUrl(data.thumbnailLink);
    setThumbnail(data.thumbnailId);
  }

  const processPrograms = (programs: any[]) => {
    let processedPrograms: ProgramMapType[] = []
    programs.forEach((p: any, index: number) => {
      processedPrograms = [...processedPrograms, {
        program: p.program.id.toString(),
        programName: p.program.title,
      }]
    })
    setPrograms(processedPrograms)
  }

  const onFinish = () => {
    if(journey.title != null && journey.title.trim() != '') {
    let data = handleFormSubmit(journey, programs, thumbnail, category, id)
    if(data){
      data.then(resp => {
        if (resp.data) {
          message.success('Journey updated successfully');
          navigate("/admin/journeys");
        }
      })
    }
  }
  else{
    setJourney({
      title: '',
      description : journey.description,
      sequence : journey.sequence
    })
  }
  };

  const addProgram = () => { 
    setPrograms([...programs, { program: null , programName: undefined }])
  }

  const removeProgram = (index: number) => {
    setPrograms(removeProgramHadler(index, programs))
  }

  const handleOnSelect = (e: any, index: number) => {
    setPrograms(onSelectHandler(index, e, programs))
  }

  const onDragEnd = (fromIndex: number, toIndex: number) => {
    console.log(`Dragged from ${fromIndex} to ${toIndex}`)
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    let sortedPrograms = arrayMove(programs, fromIndex, toIndex);
    return setPrograms(sortedPrograms);
  };

  return (<>
    <React.Fragment>
      <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Back</Button></div>

      <h4>Edit Journey</h4>

      <div className='scroll-container' style={{width:'60%'}}>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item>
            Thumbnail
            <Upload
              fileType='image'
              onDone={(info) => setThumbnail(info.documentId)}
              onRemove={() => setThumbnail('')}
              file={thumbnailUrl}
              accept="image/png, image/jpeg, image/jpg"  />
          </Form.Item>

          <Form.Item>
            Title<span style={{color: 'red'}}>* { journey.title != undefined && journey.title.trim() == '' && <>Title Cannot be Blank</>}</span>
            <Input value={journey.title} onChange={(e) => {
              setJourney({
                title: e.target.value,
                description: journey.description,
                sequence: journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item>
            Description
            <Input.TextArea value={journey.description} onChange={(e) => {
              setJourney({
                title: journey.title,
                description: e.target.value,
                sequence: journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={journey.sequence} onClick={() => {
              setJourney({
                title: journey.title,
                description: journey.description,
                sequence: !journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item >
            Programs
            <div style={{ width: "325px" }}>
              <ReactDragListView
                nodeSelector=".ant-list-item.draggable-item"
                lineClassName="dragLine"
                onDragEnd={(fromIndex, toIndex) =>
                  onDragEnd(fromIndex, toIndex)
                }
              >
                {programs
                  .map((program: ProgramMapType, index) => (
                    <List.Item key={program.programName ? index+program.programName : index} className="draggable-item">
                      <div>
                        <HolderOutlined style={{ cursor: 'grab' }} />
                        <SearchInput
                          defaultValue={program.programName}
                          onSelect={(e: any) => { handleOnSelect(e, index) }}
                          placeholder='Select Program'
                          style={{ width: 250 }}
                        />
                        <Button danger className='remove-btn' type='primary' onClick={() => { removeProgram(index) }} style={{ marginLeft: "5px" }}>-</Button>
                      </div>
                    </List.Item>
                  ))}
              </ReactDragListView>
              <Button disabled={! (programs.filter(p => p.programName == undefined).length == 0)} type='dashed'
                onClick={() => { addProgram() }
                }>
                <PlusOutlined /> Add Program
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>

        </Form>
      </div>
    </React.Fragment>
  </>
  );
};