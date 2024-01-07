import { useContext } from "react";
import { PostContext } from "../routes";
import { areaFilter, priceFilter } from "../constants";
import { useNavigate } from "react-router-dom";

export default function RightFilter({ marginTop }) {
  const {
    setCurPage,
    setUseRightFilter,
    setFilterCondition,
    setPriceRangeRF,
    setAreaRangeRF,
  } = useContext(PostContext);
  const navigate = useNavigate();

  const handleSelect = (item, type) => {
    navigate("/");
    setCurPage(1);
    setUseRightFilter(true);
    let condition = {};
    if (type === "PRICE") {
      setPriceRangeRF(item);
      setAreaRangeRF();
      if (item.min > 0) condition.priceMin = item.min * 1000000;
      if (item.max > 0) condition.priceMax = item.max * 1000000;
    }
    if (type === "AREA") {
      setAreaRangeRF(item);
      setPriceRangeRF();
      if (item.min > 0) condition.areaMin = item.min;
      if (item.max > 0) condition.areaMax = item.max;
    }
    setFilterCondition(condition);
    const offset = 220;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
  };
  return (
    <div>
      <div
        className="border-main rounded shadow-sm"
        style={{ marginTop: marginTop }}
      >
        <div className="mt-1 ms-3 mb-1 fw-700">Lọc theo khoảng giá</div>
        {priceFilter?.map((item, index) => (
          <div
            key={index}
            className="text-start ps-3 py-2 cursor-pointer item-hover1 fw-600"
            onClick={() => handleSelect(item, "PRICE")}
          >
            {item.min === 0 && <span>Dưới {item.max}</span>}
            {item.max === 0 && <span>Trên {item.min}</span>}
            {item.min !== 0 && item.max !== 0 ? (
              <span>
                {item.min} - {item.max}
              </span>
            ) : null}
            {" triệu"}
          </div>
        ))}
      </div>
      <div className="border-main rounded mt-4 shadow-sm">
        <div className="mt-1 ms-3 mb-1 fw-700">Lọc theo diện tích</div>
        {areaFilter?.map((item, index) => (
          <div
            key={index}
            className="text-start ps-3 py-2 cursor-pointer item-hover1 fw-600"
            onClick={() => handleSelect(item, "AREA")}
          >
            {item.min === 0 && <span>Dưới {item.max}</span>}
            {item.max === 0 && <span>Trên {item.min}</span>}
            {item.min !== 0 && item.max !== 0 ? (
              <span>
                {item.min} - {item.max}
              </span>
            ) : null}
            {" m"}
            {<sup>2</sup>}
          </div>
        ))}
      </div>
    </div>
  );
}
