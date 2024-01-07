import clsx from "clsx";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

export default function LocationSelect({
  className,
  defaultText,
  itemList,
  item,
  setItem,
  disabled,
  message,
}) {
  const [isShowDrop, setIsShowDrop] = useState(false);

  const handleSelect = (value) => {    
    setItem(value);
    setIsShowDrop(false);
  };

  return (
    <div
      className="position-relative"
      onMouseLeave={() => setIsShowDrop(false)}
      onClick={() => {
        if (!disabled) setIsShowDrop(true);
      }}
    >
      <div
        className={clsx(
          "border rounded d-flex justify-content-between w-100 ps-2 cursor-pointer",
          disabled && "bg-disabled",
          className
        )}        
        style={{ height: "50px" }}
      >
        <div className="d-flex align-items-center">
          {!item ? (
            <span>{defaultText}</span>
          ) : (
            <span>
              <span className="text-secondary text-xs">{defaultText}</span>
              <br />
              <div className="align-top">{item}</div>
            </span>
          )}
        </div>
        <button
          className={clsx("border-0 rounded", disabled && "bg-disabled")}
          style={{ backgroundColor: "white" }}
        >
          {!item ? (
            <IoIosArrowForward />
          ) : (
            <CgClose
              className={clsx("rounded-pill", !disabled && "item-hover2")}
              onClick={() => {
                if (!disabled) setItem("");
              }}
            />
          )}
        </button>
      </div>
      {disabled && <div className="text-sm ms-1 text-secondary">{message}</div>}
      {isShowDrop && (
        <div className="position-absolute start-100 top-0">
          <div
            className="border bg-white rounded shadow-sm overflow-y-auto"
            style={{ minWidth: "200px", maxHeight: '300px' }}
          >
            {itemList?.map((item, index) => (
              <div
                key={index}
                className="ps-3 py-1 border-bottom item-hover1 cursor-pointer"
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
