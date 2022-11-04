import { Select } from "antd";
import * as React from "react";
import { debounce, getJourneys } from "../../service/journey-service";

const { Option } = Select;
  
    export const CourseSearchInput: React.FC<{ onSelect:any, defaultValue: any, placeholder: string; style: React.CSSProperties }> = props => {
    const [data, setData] = React.useState<any[]>([]);
    const [value, setValue] = React.useState<string>();
    const [load, setLoad] = React.useState(false)
    let key = ''
  
    const handleSearch = (newValue :string) => {
      key = newValue;
      debounce(searchCourses,500)
    }
    const searchCourses = () => {
      let newValue = key
      if (newValue) {
        if(load) { return ;}
        getJourneys(newValue).then(
          resp => {
            let respData: any[] = []
            resp.data.content.forEach( (d:any) => respData.push({key:d.courseId, text: d.courseId}) )
            setData(respData)
            setLoad(false)
          }
      )
      } else {
        setData([]);
      }
    };
  
    const handleChange = (newValue: string) => {
      setValue(newValue);
    };
  
    const handleSelect = (e: any) =>{
      props.onSelect(e);
  
    }
  
    const options = data.map( d => { return (<Option key={d.key}>{d.text}</Option>)});
  
    return (
      <>
      <Select
        showSearch
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        defaultActiveFirstOption={false}
        defaultValue={props.defaultValue}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        onSelect={handleSelect}
        notFoundContent={null}
      >
        {options}
      </Select>
      </>
    );
  };
