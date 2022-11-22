import { Button, Form, Input, List, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import ReactDragListView from "react-drag-listview";
import { getJourneyDetails, handleFormSubmit, onSelectHandler, removeProgramHadler, setJourney } from '../../../../service/journey-service';
import { ProgramMapType } from '../../../../models/journey-details';
import { SearchInput } from '../../../../components/search-input/search-input';
import { Flow } from '../../../../models/enums/flow';
import { getActiveInductionJourney } from '../../../../service/induction-service';
import { Upload } from '../../../../components/upload.component';
import { arrayMove } from '../../../../utility/array-utils';
import "../index.css";

type editInductionJourneyDetails = {
  title?: string,
  description?: string,
  sequence?: boolean,
  id?: string
}

export const EditInduction = () => {
  const [programs, setPrograms] = React.useState<ProgramMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')
  const [journey, setJourney] = React.useState<editInductionJourneyDetails>({ sequence: true })
  const { Option } = Select;

  React.useEffect(() => {
    getActiveInductionJourney().then(res => {
      processPrograms(res.data.programs);
      processJourneys(res.data);
    })
  }, [])

  const processJourneys = (data: any) => {
    setJourney({
      title: data.title,
      description: data.description,
      sequence: data.flow == Flow.SEQUENCE,
      id: data.id
    })
    setThumbnailUrl(data.thumbnailLink);
  }

  const processPrograms = (programs: any[]) => {
    let processedPrograms: ProgramMapType[] = []
    programs.forEach((p: any, index: number) => {
      processedPrograms = [...processedPrograms, {
        program: p.program.id.toString(),
        programName: p.program.title,
        index: index
      }]
    })
    setPrograms(processedPrograms)
  }

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = () => {
    handleFormSubmit(journey, programs, thumbnail, 'INDUCTION', journey.id).then(resp => {
      if (resp.data) {
        message.success('Journey updated successfully');
      }
    })
  };

  const addProgram = () => {
    setPrograms([...programs, { index: programs.length, program: undefined, programName: undefined }])
  }

  // const onSortEnd = (index: { oldIndex: any, newIndex: any }) => {
  //   setPrograms(sortEndHandler(index, programs))
  // }

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

      <div className='scroll-container'>
        <Form onFinish={onFinish} validateMessages={validateMessages}>

          <Form.Item>
            <Upload
              onDone={(info) => setThumbnail(info.documentId)}
              onRemove={() => setThumbnail('')}
              file={thumbnailUrl} />

          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            Title
            <Input value={journey.title} onChange={(e) => {
              setJourney({
                id: journey.id,
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
                id: journey.id,
                title: journey.title,
                description: e.target.value,
                sequence: journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={journey.sequence} onClick={() => {
              setJourney({
                id: journey.id,
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
                  .map((program: ProgramMapType, index: number) => (
                    <List.Item key={index} className="draggable-item">
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

              <Button type='dashed'
                onClick={() => { addProgram() }
                }>
                <PlusOutlined /> Add Program
              </Button>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
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

