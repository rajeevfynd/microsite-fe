import { Select } from "antd";
import * as React from "react";
import { debounce } from "../../service/journey-service";
import { filterPrograms } from "../../service/program-service";

const { Option } = Select;
  
    export const SearchInput: React.FC<{ onSelect:any, defaultValue: any, placeholder: string; style: React.CSSProperties }> = props => {
    const [data, setData] = React.useState<any[]>([]);
    const [value, setValue] = React.useState<string>();
    const [load, setLoad] = React.useState(false)
    let key = ''
  
    const handleSearch = (newValue :string) => {
      key = newValue;
      debounce(searchPrograms,500)
    }
    const searchPrograms = () => {
      let newValue = key
      if (newValue) {
        if(load) { return ;}
        filterPrograms(newValue).then(
          resp => {
            let respData: any[] = []
            resp.data.content.forEach( (d:any) => respData.push({key:d.rruProgramID, text: d.rruProgramID}) )
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