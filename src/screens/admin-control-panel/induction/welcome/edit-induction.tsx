import { Button, Form, Input, List, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import ReactDragListView from "react-drag-listview";
import { handleFormSubmit, onSelectHandler, removeProgramHadler } from '../../../../service/journey-service';
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
      }]
    })
    setPrograms(processedPrograms)
  }

  const onFinish = () => {
    if(journey.title != null && journey.title.trim() != '') {
      handleFormSubmit(journey, programs, thumbnail, 'INDUCTION', journey.id).then(resp => {
        if (resp.data) {
          message.success('Journey updated successfully');
        }
      })
    }
    else{
      setJourney({
        id: journey.id,
        title: '',
        description : journey.description,
        sequence : journey.sequence
      })
    }
  };

  const addProgram = () => {
    setPrograms([...programs, { program: null, programName: undefined }])
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

    <div className='scroll-container' style={{width:'60%'}}>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item>
            Thumbnail
            <Upload
              onDone={(info) => setThumbnail(info.documentId)}
              onRemove={() => setThumbnail('')}
              file={thumbnailUrl} />
          </Form.Item>

          <Form.Item>
            Title<span style={{color: 'red'}}>* { journey.title != undefined && journey.title.trim() == '' && <>Title Cannot be Blank</>}</span>
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
                  .map((program: ProgramMapType, index) => (
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

              <Button disabled={! (programs.filter(p => p.programName == undefined).length == 0)} type='dashed'
                onClick={() => { addProgram() }
                }>
                <PlusOutlined /> Add Program
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
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
function validateJourneyPrograms(value: any) {
  return false;
}