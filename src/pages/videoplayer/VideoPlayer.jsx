import React,{useContext,useEffect} from 'react';
import "./VideoPlayer.css"
import { SocketContext } from "../../context/SocketContext";
import 'aframe';
import {Entity, Scene} from 'aframe-react';

const VideoPlayer = () => {
    const {name,callAccepted,myVideo,userVideo,callEnded,stream,call}=useContext(SocketContext);
    
    return (
        <div>
        <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/360image_VCXo5L7uU.jpg"}/>
        </a-assets>
          <video id="myvideo" ref={myVideo} playsInline autoPlay muted/>
          <video id="uservideo" playsInline ref={userVideo} autoPlay className="video" />
        <Entity primitive="a-sky" src="#skyTexture" height="512"  position={{x: 0, y: 3, z: 15}} rotation="0 90 0"/>
        {
            stream && (
                <>
                {/* <Entity text={{value: 'Interviewer:',color:"black"}} position={{x: 0.1, y: 1.7, z: -0.8}}/>
                <Entity primitive="a-video" src="#myvideo" width="18" height="9" position="0 -15 -30"></Entity> */}
                </>
            )
        }
        {
            callAccepted && !callEnded && (
                <>
                {/* <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 1.4, z: -3}}/> */}
                <Entity primitive="a-video" src="#uservideo" width="18" height="9" position="0 0 -30" className="video" />
                </>
            )
        }
        </Scene>
        <div className="gridcontainer">  
            {
                stream && (
                    <div className="myvidContainer">
                        <h5>{name || 'Name'}</h5>
                        <video id="myvideo" ref={myVideo} playsInline autoPlay muted/>
                    </div>
            )
            }
            { 
                // callAccepted && !callEnded && (
                //     <div className="paper">
                //         <div>
                //             <div variant="h5" gutterBottom>{call.name || 'Name'}</div>
                //             <video playsInline ref={userVideo} autoPlay className="video" />
                //         </div>
                //     </div>
            // )
            }
        </div>
        </div>
    )
}

export {VideoPlayer}
