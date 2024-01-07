import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import userApi from "../../apis/userApi";
import { useState } from "react";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  
  const onSubmit = async (data) => {
    console.log("data::", data);
    try {
      setIsLoading(true);
      setIsFailed(false);
      const res = await userApi.login(data);
      setIsLoading(false);
      console.log("res::", res);
      localStorage.setItem('user', JSON.stringify(res))
      window.location.href = '/'
    } catch (e) {
      setIsLoading(false);
      setIsFailed(true);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="border rounded shadow" style={{ width: "30%" }}>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h4 className="border-0 border-bottom text-center py-2">Đăng nhập</h4>
          <div className="px-3 mb-4">
            <Form.Group>
              <Form.Label className="fw-500">Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                {...register("username", { required: "Không được để trống" })}
                isInvalid={errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-500">Mật khẩu</Form.Label>
              <Form.Control
                type="text"
                {...register("password", { required: "Không được để trống" })}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {isFailed && (
              <div className="text-danger fs-14 fw-600 mt-1">
                Sai tên đăng nhập hoặc mật khẩu
              </div>
            )}
            <Button type="submit" className="w-100 mt-3">
              <span className="fw-500">Đăng nhập</span>
              {isLoading && <Spinner size="sm" className="ms-1" />}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
