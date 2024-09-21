import React, { useState, useContext, useEffect } from 'react';
import { RequestContext } from '../views/manager/request_view_house';
import { getUserInfo } from '../apis/getUser';
import avatarImg from "../assets/avatar.png"

const UserInfor = () => {
    const { viewUserID, openUserModal } = useContext(RequestContext);
    const token = localStorage.getItem("token");
    const [viewUser, setViewUser] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (viewUserID) {
                try {
                    const data = await getUserInfo(viewUserID, token);
                    setViewUser(data);
                } catch (error) {
                    console.error("Error fetching user information:", error);
                }
            }
        };

        fetchUserInfo();
    }, [viewUserID, token]);

    useEffect(() => {
        if (openUserModal === false) {
            setViewUser(null);
        }
    }, [openUserModal])
    if (!viewUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main border rounded p-4 border-green-600 shadow-md">
            <div className="content flex w-full ml-4 mb-4 text-base">
                <div className="label w-32 mr-4 text-right h-12 flex items-center">
                    Ảnh đại diện:
                </div>
                <div className="avatar  ml-2 pl-2 pr-2 rounded w-full h-12 flex items-center">
                    <div>
                        {`${viewUser}`.avatar ? (
                            <img src={viewUser.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
                        ) : (
                            <img src={avatarImg} alt="Default Avatar" className="w-24 h-24 rounded-full" />
                        )}
                    </div>
                </div>
            </div>

            <div className="content flex w-full ml-4 text-base">
                <div className="label w-32 mr-4 text-right h-12 flex items-center">
                    Tên:
                </div>
                <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
                    {viewUser.name}
                </div>
            </div>
            <div className="content flex w-full ml-4 text-base">
                <div className="label w-32 mr-4 text-right h-12 flex items-center">
                    Địa chỉ:
                </div>
                <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
                    {viewUser.address}
                </div>
            </div>
            <div className="content flex w-full ml-4 text-base">
                <div className="label w-32 mr-4 text-right h-12 flex items-center">
                    Số ĐT:
                </div>
                <div className="name border border-gray-500 ml-4 pl-2 pr-2 rounded w-full h-12 flex items-center">
                    {viewUser.phone}
                </div>
            </div>
        </div>
    );
};

export default UserInfor;
