import clsx from "clsx";
import { areaFilter } from "../../constants";

export default function AreaRangeMenu({ setAreaRange }) {
  const handleChangeAreaRange = (item) => {
    setAreaRange({ min: item.min, max: item.max });
  };
  return (
    <div id="areaFilter">
      <div
        className="ps-3 py-1 border-bottom cursor-pointer item-hover1"
        onClick={() => handleChangeAreaRange({ min: 0, max: 0 })}
      >
        Tất cả diện tích
      </div>
      {areaFilter?.map((item, index) => (
        <div
          className={clsx(
            "ps-3 py-1 cursor-pointer item-hover1",
            index < areaFilter.length - 1 && "border-bottom"
          )}
          key={index}
          onClick={() => handleChangeAreaRange(item)}
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
  );
}
