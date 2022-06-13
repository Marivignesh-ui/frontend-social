import React,{useContext} from 'react';
import { SocketContext } from '../../context/SocketContext';

const Notifications = () => {
    const {answerCall,call,callAccepted}=useContext(SocketContext);
    return (
        <>
          {
              call.isReceivedCall && !callAccepted  && (
                  <div className='Notification' style={{display:'flex',justifyContent:'center'}}>
                      <h1>{call.name} is calling: </h1>
                      <button onClick={answerCall} className="callbutton">
                          Answer
                      </button>
                  </div>
          )}  
        </>
    )
}

export {Notifications}
