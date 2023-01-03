import * as React from "react";
import { DOWNLOAD_CENTER_IMG } from "../../../constants/string-constants";

export const DownloadsHome = () => {

    const css = `
    .body-container{
      background-color: #192335;
      color : white;
    }
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top : 30px;
      }
      
      img {
        max-width: 120%;
        max-height:100%;
      }
      
      .text {
        font-size: 20px;
        padding-right: 30px;
      }
      `


    return (
        <div>
            <style>
                {css}
            </style>
            <div className="body-container" style = {{height:"100vh"}}>
                <h2 style = {{color:"white"}}>Download Center</h2>

                <div className="container">
                    <div className="text">
                        <p>
                            Your one place solution to various work related downloads. 
                            You can find relevant logos and pictures which we use on a day to day basis. 
                            Corporate templates of presentation, concept note and dashboards are also readily available here.
                        </p>
                        <p>
                            A few of the commonly used HR policies for your convenience. 
                            In the Leaders section you can have more details on your leader and download their pictures for the purpose of presentation.
                        </p>

                        <p className='text-danger'>
                            <div>Note:</div>
                            <small>
                                These downloads are strictly for internal circulation or use only. 
                                Sharing with external sources or Social media platforms is strictly prohibited without prior consent 
                                from corporate communication team.
                            </small>
                        </p>
                    </div>

                    <div className="image">
                        <img src={DOWNLOAD_CENTER_IMG}/>
                    </div>
                </div>
            </div>
        </div>
    )
}