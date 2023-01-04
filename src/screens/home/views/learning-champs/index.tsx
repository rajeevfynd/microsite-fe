import * as React from "react";
import { Card, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { TopChamps } from "./views/top-champs";
import { WeeklyChamps } from "./views/weekly-champs";
import httpInstance from "../../../../utility/http-client";

export const LearningChamps = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [learningChamps, setLearningChamps] = React.useState({});

    React.useEffect(() => {
        httpInstance.get(`/microsite/user-course/learning-champs`)
            .then(data => {
                if (!!Object.keys(data.data).length) {
                    setLearningChamps(data.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                message.error("Something Went Wrong Please Try After Somtimes 00000111");
            });
    }, []);

    return (
        <>
            {!isLoading && !!Object.keys(learningChamps).length ?
                <Card className="home-card">
                    <Meta title={
                        <div>
                            <h3>Learning Champs</h3>
                        </div>
                    }
                    />
                    <TopChamps data={learningChamps} />
                    <WeeklyChamps data={learningChamps} />
                </Card>
                : null}
        </>
    )
}