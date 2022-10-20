import * as React from 'react'
import ReactPlayer from 'react-player'
import { WelcomeMessageDetailsType } from '../../../../../models/welcome-message';
import { CompleteStatus } from '../../../../../models/enums/complete-status';
import { setWelcomeMessageStatus } from '../../../../../service/induction-service';

export const WelcomeMessage = (props: WelcomeMessageDetailsType) => {

  const setIsCompleted = (newStatus: CompleteStatus) => {
      if(!props.details.isCompleted){
        setWelcomeMessageStatus( {status : newStatus})
          .then(res => {
              props.onComplete(true)
          })
      }
  }

  return (  
    <>
        <div className='video-player'>
        <ReactPlayer 
          url={props.details.fileUrl}
          light={props.details.isCompleted}
          onEnded={()=> setIsCompleted(CompleteStatus.COMPLETE)}
        />
      </div>
    </>
  )
}
