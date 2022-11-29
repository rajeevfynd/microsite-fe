import * as React from 'react';
import CourseForm from './views/course-form';


export const AddCourse = () => {

    const [isLoading, setIsLoading] = React.useState(false);


    return (
        <>
            {isLoading ? "Loading" :
                <div style={{
                    margin: "auto",
                }}>
                    <CourseForm />
                </ div >
            }
        </>
    )
}






