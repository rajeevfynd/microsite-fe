import { Col, Row } from "antd";
import * as React from "react";
import { DOWNLOAD_CENTER_IMG } from "../../../constants/string-constants";

export const DownloadsHome = () => {

    const css = `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top : 30px;
      }
      
      img {
        max-width: 250%;
        max-height:250%;
      }
      
      .downloads-text {
        padding-right: 30px;
      }
      .note {
        color : red;
        padding-top : 50px;
      }
      `


    return (
        <div>
            <style>
                {css}
            </style>
            <div className="body-container" style = {{height:"100vh"}}>
                <h2>Download Center</h2>

                <Row  
                    style={{ alignItems: "center" , paddingTop : 30}}
                    justify="center"
                    gutter={10}
                    >
                    <Col span={16}>
                        <div className="container">
                            <div className="downloads-text">
                                <big>
                                    <p>
                                        Your one place solution to various work related downloads. 
                                        You can find relevant logos and pictures which we use on a day to day basis. 
                                        Corporate templates of presentation, concept note and dashboards are also readily available here.
                                    </p>
                                    <p>
                                        A few of the commonly used HR policies for your convenience. 
                                        In the Leaders section you can have more details on your leader and download their pictures for the purpose of presentation.
                                    </p>
                                </big>

                                <p className='note'>
                                    <div>Note:</div>
                                        These downloads are strictly for internal circulation or use only. 
                                        Sharing with external sources or Social media platforms is strictly prohibited without prior consent 
                                        from corporate communication team.
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col span={8}>
                        <div className="image">
                            <img src={DOWNLOAD_CENTER_IMG}/>
                        </div>                   
                    </Col>
                </Row>
            </div>
        </div>
    )
}