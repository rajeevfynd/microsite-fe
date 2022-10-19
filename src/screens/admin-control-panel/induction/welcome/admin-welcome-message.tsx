import { Input, Button } from 'antd'
import * as React from 'react'
import ReactPlayer from 'react-player'
import { AdminWelcomeMessageDetailsType } from '../../../../models/welcome-message'
import { setWelcomeMessageFileUrl } from '../../../../service/induction-service'

export const AdminWelcomeMessage = (props: AdminWelcomeMessageDetailsType) => {

  const [ fileUrl, setFileUrl ] = React.useState<string>()
  const [ textBoxInput, setTextBoxInput ] = React.useState<string>()

  const setWelcomeFileUrl = () => {
    setWelcomeMessageFileUrl({ fileUrl : fileUrl})
      .then(res => {
          setFileUrl(fileUrl)
        }) 
        props.onFileUrlUpdate(fileUrl)
  }

  React.useEffect( ()=>{
    console.log('hi',props.details)
    setFileUrl(props.details.fileUrl)
    setTextBoxInput(props.details.fileUrl)
  }, [props.details])

  return (  
    <>
        <Input.Group style={{margin: '1% 0'}}>
          <Input style={{ width: '50%' }} value={textBoxInput} onChange={(e)=>setTextBoxInput(e.target.value.trim())} />
          <Button type='primary' onClick={() => {setFileUrl(textBoxInput)}}>Preview</Button>
        </Input.Group>

        <div className='video-player'>
          <ReactPlayer 
            controls
            light
            url={fileUrl}
          />
      </div>

      <div style={{margin: '1% 0'}}>
        <Button type='primary' size='large' shape='round' onClick={() => setWelcomeFileUrl()}>Update</Button>
      </div>
    </>
  )
}
