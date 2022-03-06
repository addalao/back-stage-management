import { Form, Input, Modal, Row, Col } from "antd";
import ReactDOM from "react-dom";

const FormModal = ({ columns = [], onCancel, onFinish, initialValues }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      width={800}
      visible={columns.length > 0}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
      title="编辑"
      onOk={() => form.submit()}
    >
      <Form
        labelCol={{ span: 5 }}
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={10}>
          {columns
            .filter((v) => v.dataIndex)
            .map((item) => {
              return (
                <Col span={12} key={item.dataIndex}>
                  {item.renderFormItem && item.renderFormItem()}
                  {!item.renderFormItem && (
                    <Form.Item
                      label={item.title}
                      name={item.dataIndex}
                      rules={[
                        { required: true, message: `请输入${item.title}` },
                      ]}
                    >
                      <Input placeholder={`请输入${item.title}`}></Input>
                    </Form.Item>
                  )}
                </Col>
              );
            })}
        </Row>
      </Form>
    </Modal>
  );
};

FormModal.show = ({ columns, initialValues }) => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const close = () => {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    };

    ReactDOM.render(
      <FormModal
        columns={columns}
        initialValues={initialValues}
        onFinish={(values) => {
          close();
          resolve(values);
        }}
        onCancel={() => {
          close();
          reject();
        }}
      />,
      container
    );
  });
};

export default FormModal;
