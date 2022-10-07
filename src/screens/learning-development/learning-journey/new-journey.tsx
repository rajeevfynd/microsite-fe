import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';
import * as React from 'react';
import { JourneyCategory } from '../../../models/enums/journey-category';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export const NewJourney: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
        <h4>Create New Journey</h4>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['journey', 'title']} label="Title" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['journey', 'description']} label="Description">
            <Input.TextArea />
        </Form.Item>
        <Form.Item name={['journey', 'thumbnail_link']} label="Thumbnail URL">
            <Input />
        </Form.Item>
        <Form.Item name={['journey', 'category']} label="Category">
        <Select
                placeholder="Select Journey Category"
                allowClear
            >
                <Option value={JourneyCategory.GENERAL}>General</Option>
                <Option value={JourneyCategory.INDUCTION}>Induction</Option>
            </Select>

        </Form.Item>
        <Form.Item name={['journey','sequencial']} label="Sequencial Journey">
            <Switch />
        </Form.Item>

        
        
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    </>
  );
};