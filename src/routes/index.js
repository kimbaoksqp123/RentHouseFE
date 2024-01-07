import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../views/layout";
import Home from "../views/home";
import PostDetail from "../views/post-detail";
import { createContext, useEffect, useState } from "react";
import postApi from "../apis/postApi";
import Login from "../views/auth/Login";
import Bookmark from "../views/bookmark";

export const PostContext = createContext();

const AppRoutes = () => {
  const [listPost, setListPost] = useState([]);
  const [sortType, setSortType] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [filterCondition, setFilterCondition] = useState({});
  const [curNavOption, setCurNavOption] = useState("home");
  const [useRightFilter, setUseRightFilter] = useState(false);
  const [priceRangeRF, setPriceRangeRF] = useState();
  const [areaRangeRF, setAreaRangeRF] = useState();
  const [navbarApartType, setNavbarApartType] = useState(0);
  const [isResetMainFilter, setIsResetMainFilter] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const getListPost = async () => {
    try {      
      const res = await postApi.getList({
        sortType: sortType,
        ...filterCondition,
      });
      setListPost(res);
      setIsSearchLoading(false);
    } catch (e) {
      setIsSearchLoading(false);
    }
  };

  useEffect(() => {
    getListPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, filterCondition]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <PostContext.Provider
              value={{
                listPost,
                setListPost,
                sortType,
                setSortType,
                filterCondition,
                setFilterCondition,
                getListPost,
                curPage,
                setCurPage,
                curNavOption,
                setCurNavOption,
                useRightFilter,
                setUseRightFilter,
                priceRangeRF,
                setPriceRangeRF,
                areaRangeRF,
                setAreaRangeRF,
                navbarApartType,
                setNavbarApartType,
                isResetMainFilter,
                setIsResetMainFilter,
                isSearchLoading,
                setIsSearchLoading,
              }}
            >
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/post/:postId" element={<PostDetail />} />
                  <Route path="/bookmarks" element={<Bookmark />} />
                </Routes>
              </Layout>
            </PostContext.Provider>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
