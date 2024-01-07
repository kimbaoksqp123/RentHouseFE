import clsx from "clsx";
import { priceFilter } from "../../constants";

export default function PriceRangeMenu({setPriceRange}) {
    const handleChangePriceRange = (item) => {
        setPriceRange({ min: item.min, max: item.max });
      };
    
  return (
    <div id="priceFilter">
      <div
        className="ps-3 py-1 border-bottom cursor-pointer item-hover1"
        onClick={() => handleChangePriceRange({ min: 0, max: 0 })}
      >
        Tất cả mức giá
      </div>
      {priceFilter?.map((item, index) => (
        <div
          className={clsx(
            "ps-3 py-1 cursor-pointer item-hover1",
            index < priceFilter.length - 1 && "border-bottom"
          )}
          key={index}
          onClick={() => handleChangePriceRange(item)}
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
  );
}
