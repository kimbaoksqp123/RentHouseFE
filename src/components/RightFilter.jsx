import React, { useState, useContext, useEffect } from "react";
import { Input, InputNumber, Spin, Result } from "antd";
import { PostContext } from "../routes";
import { filterPostsWithinScope } from "../apis/matrixAPI";

export default function AdvanceFilter({ marginTop }) {
  const { listPost, setFilterListPost, filterCondition, filterListPost } = useContext(PostContext);
  const [address, setAddress] = useState("");
  const [scope, setScope] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterClick = async () => {
    setLoading(true);
    try {
      const filteredPosts = await filterPostsWithinScope(address, listPost, scope);
      setFilterListPost(filteredPosts);
    } catch (error) {
      console.error("Error filtering posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [listPost, filterCondition]);

  return (
    <div>
      <div className="border-main rounded shadow-sm" style={{ marginTop: marginTop }}>
        <div className="mt-1 ms-3 mb-2 fw-700">Lọc nâng cao</div>
        <div className="ms-3 me-3 mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="ms-3 me-3 mb-3">
          <label htmlFor="scope" className="form-label">
            Phạm vi (km)
          </label>
          <InputNumber
            id="scope"
            value={scope}
            onChange={(value) => setScope(value)}
            min={0}
            style={{ width: "100%" }}
          />
        </div>
        <div className="ms-3 me-3 mb-3">
          <button
            type="button"
            className={`w-20 h-8 bg-green-400 border border-gray-300 rounded-2xl flex items-center justify-center text-white text-base font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            onClick={handleFilterClick}
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Lọc"}
          </button>
        </div>
      </div>
      {filterListPost.length === 0 && scope>0 && (
        <Result
          status="404"
          title="Không có phòng trọ phù hợp"
          subTitle="Không có phòng trọ phù hợp nằm trong phạm vi trên"
        />
      )}
    </div>
  );
}
