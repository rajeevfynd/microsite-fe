import * as React from 'react'
import ReactPlayer from 'react-player'
import { WelcomeMessageDetailsType } from '../../../../../models/welcome-message';
import { CompleteStatus } from '../../../../../models/enums/complete-status';
import { setWelcomeMessageStatus } from '../../../../../service/induction-service';

export const WelcomeMessage = (props: WelcomeMessageDetailsType) => {
  
  const [ play, setPlay ] = React.useState(false)

  const setIsCompleted = (newStatus: CompleteStatus) => {
      if(!props.details.isCompleted){
        setWelcomeMessageStatus( {status : newStatus})
          .then(res => {
              props.onComplete(true)
          })
      }
  }

  React.useEffect( ()=>{
    console.log(props.details.isCompleted)
    setPlay(props.details.isCompleted)
  }, [])

  return (  
    <>
        <div className='video-player'>
        <ReactPlayer 
          controls
          url={props.details.fileUrl}
          playing={play}
          onEnded={()=> setIsCompleted(CompleteStatus.COMPLETE)}
        />
      </div>
    </>
  )
}
