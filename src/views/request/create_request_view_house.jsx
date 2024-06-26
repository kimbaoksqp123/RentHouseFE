import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Form, DatePicker, Space, Input, ConfigProvider, Result, Spin } from "antd";
import { serveURL } from "../../constants/index";
import moment from "moment";
import "moment/locale/vi"; // Import locale for moment.js
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 24, offset: 1 },
  },
};

export default function CreateRequestViewHouse() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.id : null;
  const token = localStorage.getItem("token");
  const { houseID } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ userID: userID });
  }, [form, userID]);

  useEffect(() => {
    form.setFieldsValue({ houseID: parseInt(houseID) });
  }, [form, houseID]);

  const onFinish = async (values) => {
    setLoading(true);

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

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/house/${houseID}`);
        }, 2000); // Navigate after 2 seconds
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
    } finally {
      setLoading(false);
    }
  };

  moment.locale("vi");

  return (
    <div className="create_request_view_house">
      <ConfigProvider locale={locale}>
        {success ? (
          <Result
            status="success"
            title="Đặt lịch thành công"
            subTitle="Bạn sẽ được chuyển hướng về trang thông tin phòng trọ trong giây lát..."
          />
        ) : (
          <Form {...formItemLayout} form={form} onFinish={onFinish}>
            <Form.Item name="userID" label="User ID" hidden></Form.Item>
            <Form.Item name="houseID" label="House ID" hidden></Form.Item>
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
                    return Promise.reject("Thời gian phải sau thời điểm hiện tại");
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
                      form.setFieldValue("view_time", dayjs(value).format("YYYY-MM-DD HH:mm:ss"));
                  }}
                />
              </Space>
            </Form.Item>

            <Form.Item
              name="tenant_message"
              label="Lời nhắn"
              rules={[
                { required: true, message: "Hãy nhập lời nhắn tới chủ trọ" },
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
                  className="w-16 ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-2.5 rounded text-base"
                  type="submit"
                >
                  {loading ? <Spin /> : "Gửi"}
                </button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </ConfigProvider>
    </div>
  );
}
