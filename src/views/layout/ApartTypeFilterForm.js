import Form from "react-bootstrap/Form";
import { apartFilter } from "../../constants";
import { IApart1, IApart2, IApart3 } from "../../common/icons";
import { GrPowerReset } from "react-icons/gr";
import { useContext, useEffect } from "react";
import { PostContext } from "../../routes";

export default function ApartTypeFilterForm({ apartTypes, setApartTypes }) {
  const { useRightFilter, isResetMainFilter } = useContext(PostContext);
  const handleSelect = (type) => {
    let types = [...apartTypes];
    let index = apartTypes.indexOf(type);
    if (index < 0) {
      types.push(type);
    } else {
      types.splice(index, 1);
    }
    setApartTypes(types);
  };
  useEffect(() => {
    if (useRightFilter || isResetMainFilter) {
      document.getElementById("reset-type").click();
      document.getElementById("type-menu").style.display = "none";
    }
  }, [useRightFilter, isResetMainFilter]);

  return (
    <div id="type-menu">
      <Form style={{ minWidth: "230px" }} className="py-2">
        {apartFilter?.map((item, index) => (
          <div className="px-3 py-1" key={index}>
            <div className="d-inline-flex gap-1">
              {item.value === 0 && <IApart1 />}
              {item.value === 1 && <IApart2 />}
              {item.value === 2 && <IApart3 />}
              <span>{item.name}</span>
            </div>
            <Form.Check
              type="checkbox"
              reverse
              aria-label={item.name}
              className="float-end"
              onClick={() => handleSelect(item)}
              onChange={() => null}
            />
          </div>
        ))}
        <button
          id="reset-type"
          type="reset"
          className="border-0 bg-white text-start ps-3 py-1 text-hover-main fs-14 fw-500"
          onClick={() => setApartTypes([])}
        >
          <GrPowerReset /> Đặt lại
        </button>
      </Form>
    </div>
  );
}
