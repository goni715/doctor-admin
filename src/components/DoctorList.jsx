import {useGetUsersQuery} from "../redux/features/user/userApi.js";
import {Table} from "antd";
import {useGetDoctorsQuery} from "../redux/features/doctor/doctorApi.js";
import ListLoading from "./Loader/ListLoading.jsx";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone"
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const DoctorList = () => {
    const {data, isLoading, isError, error} = useGetDoctorsQuery();
    const doctors = data?.data || [];


    //decision how to render
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    }

    if (!isLoading && isError) {
        content = (
            <h1>some error occured</h1>
        );

    }

    const tableData = [];


    if (!isLoading && !isError && doctors?.length > 0) {
        for (let i = 0; i < doctors.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: doctors[i].firstName+" "+doctors[i].lastName,
                email: doctors[i].email,
                phone: doctors[i].phone,
                action: (
                    <>
                        <div className="d-flex">
                            {doctors[i].status === "pending" ? (
                                <button
                                    className="px-4 py-2 rounded-md bg-green-500 text-white font-bold text-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                                    Approve
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 rounded-md bg-red-500 text-white font-bold text-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800">
                                    Reject
                                </button>
                            )}
                        </div>
                    </>
                ),
            });
        }

    }




    return (
        <>

            <div>
                <h1 className="text-center text-2xl mb-3">Doctor List</h1>
                {
                    isLoading? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <div className="w-auto overflow-x-auto">
                            <Table columns={columns} dataSource={tableData}/>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default DoctorList;