import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useEffect } from "react";
import { Form, DatePicker, Space, Input, ConfigProvider } from "antd";

import { serveURL } from "../../constants/index";

import moment from "moment";
import "moment/locale/vi"; // Import locale cho moment.js
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 5,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 14,
    },
    sm: {
      span: 24,
      offset: 1,
    },
  },
};

export default function Register() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;
  const token = localStorage.getItem("token");
  const { houseID } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    // Set the initial values when the component mounts
    form.setFieldsValue({
      userID: userID,
    });
  }, [form, userID]); // Run the effect when form or userID changes

  useEffect(() => {
    // Set the initial values when the component mounts
    form.setFieldsValue({
      houseID: parseInt(houseID),
    });
  }, [form, houseID]); // Run the effect when form or houseID changes

  const onFinish = async (values) => {
    // Log the form data for testing purposes
    console.log("Received values from form:", values);

    // You can send the form data to your API using Axios
    try {
      const response = await axios.post(
        `${serveURL}request_view_houses/store`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response from the API as needed

      if (response.status === 200) {
        // Redirect to the tab utilities register page
        navigate(`/house/${houseID}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error sending data to API:", error);
    }
  };

  // Thiết lập locale cho moment.js
  moment.locale("vi");

  return (
    <div className="main flex flex-column justify-center align-items-center min-h-screen">
      <div className="header flex  justify-center align-items-center w-50 rounded border border-green-600 bg-white shadow p-2">
        <h4>Đăng ký tài khoản</h4>
      </div>
      <div className="create_request_view_house w-50 rounded border border-green-600 bg-white shadow p-2">
        <ConfigProvider locale={locale}>
          <Form {...formItemLayout} form={form} onFinish={onFinish}>
            <Form.Item name="userID" label="User ID" hidden></Form.Item>
            <Form.Item name="houseID" label="User ID" hidden></Form.Item>
            <Form.Item
              name="view_time"
              label="Thời gian"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn thời gian bạn tới xem phòng",
                },
                {
                  validator: (_, value) => {
                    if (value && dayjs(value).isAfter(dayjs())) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Thời gian phải sau thời điểm hiện tại"
                    );
                  },
                },
              ]}
            >
              <Space direction="vertical" size={14}>
                <DatePicker
                  renderExtraFooter={() => ""}
                  showTime
                  format="DD/MM/YYYY HH:mm:ss"
                  onChange={(value) => {
                    if (value)
                      form.setFieldValue(
                        "view_time",
                        dayjs(value).format("YYYY-MM-DD HH:mm:ss")
                      );
                  }}
                />
              </Space>
            </Form.Item>

            <Form.Item
              name="tenant_message"
              label="Lời nhắn"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập lời nhắn tới chủ trọ",
                },
              ]}
            >
              <TextArea placeholder="Nhập mô tả" rows={4} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 10,
              }}
            >
              <Space>
                <button
                  className="w-24 ml-2 bg-blue-500 hover:bg-blue-400 text-white py-2 px-2.5 rounded text-[16px]"
                  type="submit"
                >
                  Đăng ký
                </button>
              </Space>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
