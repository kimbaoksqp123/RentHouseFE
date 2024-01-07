import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import SearchForm from "./SearchForm";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { PostContext } from "../../routes";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const {
    curNavOption,
    setCurNavOption,
    setFilterCondition,
    setNavbarApartType,
    setIsResetMainFilter,
  } = useContext(PostContext);
  const btnStyle = "d-flex align-items-center gap-1 cursor-pointer";
  const user = JSON.parse(localStorage.getItem("user"));
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("user");
    if (window.location.pathname === "/bookmarks") window.location.href = "/";
    else window.location.reload();
  };

  const handleSelectApartType = (type) => {
    setIsResetMainFilter(true);
    if (window.location.pathname !== "/") {
      navigate("/");
      setNavbarApartType(type);
    } else {
      setCurNavOption(`type_${type}`);
    }
    setFilterCondition({ type: [type] });
  };

  useEffect(() => {
    if (user) {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="fixed-top">
        <Stack
          direction="horizontal"
          gap={3}
          className="border py-2 pe-3 bg-white"
        >
          <div
            className={btnStyle + " ms-auto nav-link"}
            onClick={() => {
              if (!isAuth) toast.warn("Vui lòng đăng nhập!");
              else navigate("/bookmarks");
            }}
          >
            <AiFillHeart className="text-danger" />
            <span className="fs-14 fw-500">Yêu thích</span>
          </div>
          {!isAuth ? (
            <>
              <Link to="login" className={btnStyle + " nav-link"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2.3999 21.6L2.40031 17.9996C2.40053 16.0115 4.01224 14.4 6.00031 14.4H11.9999M19.0285 13.5L21.5999 15.9M21.5999 15.9L19.0285 18.3M21.5999 15.9H14.9999M14.3999 6C14.3999 7.98822 12.7881 9.6 10.7999 9.6C8.81167 9.6 7.1999 7.98822 7.1999 6C7.1999 4.01177 8.81167 2.4 10.7999 2.4C12.7881 2.4 14.3999 4.01177 14.3999 6Z"
                    stroke="#4BA558"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="fs-14 fw-500">Đăng nhập</span>
              </Link>
              <Button variant="" className={btnStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14.6471 7.8V5.7C14.6471 5.14305 14.424 4.6089 14.0268 4.21508C13.6297 3.82125 13.091 3.6 12.5294 3.6H5.11765C4.55601 3.6 4.01738 3.82125 3.62024 4.21508C3.22311 4.6089 3 5.14305 3 5.7V18.3C3 18.857 3.22311 19.3911 3.62024 19.7849C4.01738 20.1787 4.55601 20.4 5.11765 20.4H12.5294C13.091 20.4 13.6297 20.1787 14.0268 19.7849C14.424 19.3911 14.6471 18.857 14.6471 18.3V16.2M8.29412 12H21M21 12L17.8235 8.85M21 12L17.8235 15.15"
                    stroke="#4BA558"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="fs-14 fw-500">Đăng ký</span>
              </Button>
            </>
          ) : (
            <Dropdown className="">
              <Dropdown.Toggle variant="">
                <span className="fs-14 fw-600">{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="fs-14 fw-500" onClick={handleLogout}>
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Button
            variant=""
            style={{ backgroundColor: "#E44A5D", color: "white" }}
            className={btnStyle}
          >
            <span className="fs-14 fw-500">
              <IoMdAdd /> Đăng tin mới
            </span>
          </Button>
        </Stack>
      </div>
      <div
        className="fs-14 fw-700 d-flex justify-content-center border bg-dark text-white flex-wrap"
        style={{ minHeight: "42px", marginTop: "54px" }}
      >
        <a
          href="/"
          className={clsx(
            "px-3 nav-link d-flex align-items-center",
            curNavOption === "home" && "bg-white"
          )}
        >
          <span className={clsx(curNavOption === "home" && "text-main")}>
            Trang chủ
          </span>
        </a>
        <div
          className={clsx(
            "px-3 nav-link d-flex align-items-center cursor-pointer",
            curNavOption === "type_1" && "bg-white"
          )}
          onClick={() => handleSelectApartType(1)}
        >
          <span className={clsx(curNavOption === "type_1" && "text-main")}>
            Phòng trọ
          </span>
        </div>
        <div
          className={clsx(
            "px-3 nav-link d-flex align-items-center cursor-pointer",
            curNavOption === "type_2" && "bg-white"
          )}
          onClick={() => handleSelectApartType(2)}
        >
          <span className={clsx(curNavOption === "type_2" && "text-main")}>
            Nhà nguyên căn
          </span>
        </div>
        <div
          className={clsx(
            "px-3 nav-link d-flex align-items-center cursor-pointer",
            curNavOption === "type_3" && "bg-white"
          )}
          onClick={() => handleSelectApartType(3)}
        >
          <span className={clsx(curNavOption === "type_3" && "text-main")}>
            Chung cư
          </span>
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center py-3"
        style={{ backgroundColor: "#EAFEF1" }}
      >
        <div className="text-main-bolder fw-bold fs-30 fw-700">
          Tìm phòng trọ nhanh, phòng trọ mới nhất trên toàn quốc
        </div>
        <div className="fw-400">
          Hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng
        </div>
        <SearchForm />
      </div>
      {children}
    </>
  );
}
