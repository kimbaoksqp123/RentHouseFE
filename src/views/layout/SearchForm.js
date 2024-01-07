import Stack from "react-bootstrap/Stack";
import FilterSelector from "../../components/FilterSelector";
import { GrPowerReset } from "react-icons/gr";
import { IApartAll, IArea } from "../../common/icons";
import { CiLocationOn } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import ApartTypeFilterForm from "./ApartTypeFilterForm";
import PriceRangeMenu from "./PriceRangeMenu";
import AreaRangeMenu from "./AreaRangeMenu";
import { apartFilter } from "../../constants";
import Badge from "react-bootstrap/Badge";
import LocationSelect from "../../components/LocationSelect";
import { useNavigate } from "react-router-dom";
import { locationList } from "../../constants/locationList";
import { PostContext } from "../../routes";
import Spinner from "react-bootstrap/Spinner";

export default function SearchForm() {
  const {
    setSortType,
    setCurPage,
    setFilterCondition,
    useRightFilter,
    setUseRightFilter,
    isResetMainFilter,
    setIsResetMainFilter,
    setCurNavOption,
    isSearchLoading,
    setIsSearchLoading,
  } = useContext(PostContext);
  const [priceRange, setPriceRange] = useState({ min: -1, max: -1 });
  const [areaRange, setAreaRange] = useState({ min: -1, max: -1 });
  const [apartTypes, setApartTypes] = useState([]);
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [curWardList, setCurWardList] = useState([]);
  // const [street, setStreet] = useState("");
  // const [curStreetList, setCurStreetList] = useState([]);
  const navigate = useNavigate();

  const CurrentPriceRange = () => {
    if (priceRange.min < 0) return <span>Chọn giá</span>;
    if (priceRange.min >= 0)
      return (
        <span>
          {priceRange.min === 0 && priceRange.max === 0 ? (
            "Tất cả mức giá"
          ) : (
            <span>
              {priceRange.min === 0 && <span>Dưới {priceRange.max}</span>}
              {priceRange.max === 0 && <span>Trên {priceRange.min}</span>}
              {priceRange.min !== 0 && priceRange.max !== 0 ? (
                <span>
                  {priceRange.min} - {priceRange.max}
                </span>
              ) : null}
              {" triệu"}
            </span>
          )}
        </span>
      );
  };
  const CurrentAreaRange = () => {
    if (areaRange.min < 0) return <span>Chọn diện tích</span>;
    if (areaRange.min >= 0)
      return (
        <span>
          {areaRange.min === 0 && areaRange.max === 0 ? (
            "Tất cả diện tích"
          ) : (
            <span>
              {areaRange.min === 0 && <span>Dưới {areaRange.max}</span>}
              {areaRange.max === 0 && <span>Trên {areaRange.min}</span>}
              {areaRange.min !== 0 && areaRange.max !== 0 ? (
                <span>
                  {areaRange.min} - {areaRange.max}
                </span>
              ) : null}
              {" m"}
              {<sup>2</sup>}
            </span>
          )}
        </span>
      );
  };
  const CurrentApartType = () => {
    const total = apartFilter.length;
    const selectedLen = apartTypes.length;
    if (selectedLen === 0) return <span>Chọn loại nhà trọ</span>;
    else if (selectedLen === total) return <span>Tất cả loại nhà trọ</span>;
    else
      return (
        <div>
          {apartTypes[0].name}
          {selectedLen > 1 && (
            <Badge bg="success" className="ms-2 me-1">
              {selectedLen}
            </Badge>
          )}
        </div>
      );
  };

  const removeDivisionType = (str) => {
    let arr = str.split(" ");
    arr.shift();
    return arr.join(" ");
  };

  const handleSearch = () => {
    setIsSearchLoading(true);
    setSortType(0);
    setCurPage(1);
    setUseRightFilter(false);
    setIsResetMainFilter(false);
    setCurNavOption("home");

    let filterCondition = {};
    if (apartTypes.length > 0) {
      filterCondition.type = apartTypes.map((item) => {
        return item.value;
      });
    }
    if (priceRange.min > 0 || priceRange.max > 0) {
      if (priceRange.min > 0)
        filterCondition.priceMin = priceRange.min * 1000000;
      if (priceRange.max > 0)
        filterCondition.priceMax = priceRange.max * 1000000;
    }
    if (areaRange.min > 0 || areaRange.max > 0) {
      if (areaRange.min > 0) filterCondition.areaMin = areaRange.min;
      if (areaRange.max > 0) filterCondition.areaMax = areaRange.max;
    }
    if (district) filterCondition.district = removeDivisionType(district);
    if (ward) filterCondition.ward = removeDivisionType(ward);
    // if (street) filterCondition.street = street;    
    setFilterCondition(filterCondition);
    if (window.location.pathname !== "/") navigate("/");
  };

  useEffect(() => {
    if (!district) {
      setWard("");
      // setStreet("");
    }
    let wardList = locationList
      .find((item) => item.name === district)
      ?.wards.map((item) => {
        return item.name;
      });
    setCurWardList(wardList);
  }, [district]);
  // useEffect(() => {
  //   if (!ward) {
  //     setStreet("");
  //   }
  //   let streetList = locationList
  //     .find((item) => item.district === district)
  //     ?.ward.find((item) => item.name === ward)?.street;
  //   setCurStreetList(streetList);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ward]);
  useEffect(() => {
    setWard("");
    // setStreet("");
  }, [district]);
  // useEffect(() => {
  //   setStreet("");
  // }, [ward]);
  useEffect(() => {
    if (useRightFilter) {
      setApartTypes([]);
      setPriceRange({ min: -1, max: -1 });
      setAreaRange({ min: -1, max: -1 });
      setDistrict("");
      setWard("");
    }
  }, [useRightFilter]);
  useEffect(() => {
    if (isResetMainFilter) {
      setApartTypes([]);
      setPriceRange({ min: -1, max: -1 });
      setAreaRange({ min: -1, max: -1 });
      setDistrict("");
      setWard("");
    }
  }, [isResetMainFilter]);

  return (
    <Stack
      direction="horizontal"
      className="ps-4 mt-2 mb-3 mx-auto flex-wrap"
      gap="4"
    >
      <FilterSelector
        icon={<IApartAll />}
        current={<CurrentApartType />}
        type="apartType"
      >
        <ApartTypeFilterForm
          apartTypes={apartTypes}
          setApartTypes={setApartTypes}
        />
      </FilterSelector>
      <FilterSelector
        icon={<CiLocationOn className="fs-5" />}
        current={"Hà Nội"}
      >
        <div className="p-3" style={{ minWidth: "280px" }}>
          <LocationSelect
            defaultText="Tỉnh/Thành"
            item={"Hà Nội"}
            disabled={true}
          />
          <LocationSelect
            className="mt-2"
            defaultText="Quận/Huyện"
            itemList={locationList.map((item) => {
              return item.name;
            })}
            item={district}
            setItem={setDistrict}
          />
          <LocationSelect
            className="mt-2"
            defaultText="Phường/Xã"
            itemList={curWardList}
            item={ward}
            setItem={setWard}
            disabled={!district}
            message={"Vui lòng chọn Quận/Huyện"}
          />
          {/* <LocationSelect
            className="mt-2"
            defaultText="Đường/Phố"
            itemList={curStreetList}
            item={street}
            setItem={setStreet}
            disabled={!ward}
            message={"Vui lòng chọn Phường/Xã"}
          /> */}
        </div>
        <span
          className="d-inline-block ms-3 mb-2 cursor-pointer text-hover-main"
          onClick={() => setDistrict("")}
        >
          <GrPowerReset /> Đặt lại
        </span>
      </FilterSelector>
      <FilterSelector
        icon={<IoPricetagOutline className="fs-5" />}
        current={<CurrentPriceRange />}
      >
        <PriceRangeMenu setPriceRange={setPriceRange} />
      </FilterSelector>
      <FilterSelector icon={<IArea />} current={<CurrentAreaRange />}>
        <AreaRangeMenu setAreaRange={setAreaRange} />
      </FilterSelector>
      <button
        type="button"
        className="px-3 mb-1 border-0 rounded bg-main text-white fs-14 fw-600"
        style={{ height: "44px", width: "125px" }}
        onClick={handleSearch}
      >
        <span>Tìm kiếm</span>
        {!isSearchLoading ? (
          <CiSearch className="ms-1 fs-4" />
        ) : (
          <Spinner size="sm" className="ms-1" />
        )}
      </button>
    </Stack>
  );
}
