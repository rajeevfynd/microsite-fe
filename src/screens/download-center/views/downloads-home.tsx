import * as React from "react";

export const DownloadsHome = () => {

    const css = `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top : 40px;
      }
      
      img {
        max-width: 100%;
        max-height:100%;
      }
      
      .text {
        font-size: 20px;
        padding-right: 40px;
      }
      `


    return (
        <div>
            <style>
                {css}
            </style>
            <h1>Download Center</h1>

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
                    <img src="https://i.pinimg.com/564x/59/32/29/593229739184504afd9507cc42a9cb86.jpg"/>
                </div>
            </div>
        </div>
    )
}