import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../views/layout';
import Home from '../views/home';
import PostDetail from '../views/post-detail';
import PostRegister from '../views/post-register';
import RequestViewHouse from '../views/request';
import Manager from '../views/manager';
import { createContext } from 'react';
import postApi from '../apis/postApi';
import Login from '../views/auth/Login';
import Bookmark from '../views/bookmark';
import Register from '../views/auth/Register';
import Contract from '../views/contract';
import { Spin } from 'antd';

export const PostContext = createContext();

const AppRoutes = () => {
  const [listPost, setListPost] = useState([]);
  const [sortType, setSortType] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [filterCondition, setFilterCondition] = useState({});
  const [curNavOption, setCurNavOption] = useState('home');
  const [useRightFilter, setUseRightFilter] = useState(false);
  const [priceRangeRF, setPriceRangeRF] = useState();
  const [areaRangeRF, setAreaRangeRF] = useState();
  const [navbarApartType, setNavbarApartType] = useState(0);
  const [isResetMainFilter, setIsResetMainFilter] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const getListPost = async () => {
    setIsSearchLoading(true); // Bắt đầu loading
    try {
      const res = await postApi.getList({
        sortType: sortType,
        ...filterCondition,
      });
      setListPost(res);
    } catch (e) {
      console.error('Error fetching posts:', e);
    } finally {
      setIsSearchLoading(false); // Kết thúc loading
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
                {isSearchLoading ? (
                  <Spin tip="Loading..." size="large">
                    <div style={{ minHeight: '300px' }} />
                  </Spin>
                ) : (
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/house/:postId" element={<PostDetail />} />
                    <Route path="/bookmarks" element={<Bookmark />} />
                    <Route path="/house/create" element={<PostRegister />} />
                    <Route path="/house/:houseID/request_view_house/create" element={<RequestViewHouse />} />
                    <Route path="/:userID/manager" element={<Manager />} />
                    <Route path="/:userID/contract/create" element={<Contract />} />
                  </Routes>
                )}
              </Layout>
            </PostContext.Provider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
