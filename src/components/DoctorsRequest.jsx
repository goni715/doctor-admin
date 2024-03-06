import {Table} from "antd";
import {
    useApproveDoctorMutation,
    useGetDoctorsRequestQuery
} from "../redux/features/doctor/doctorApi.js";
import ListLoading from "./Loader/ListLoading.jsx";
import {AiFillDelete} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {SetDocReqRemoveModalOpen} from "../redux/features/modal/modalSlice.js";
import RemoveDocRequestModal from "./modal/RemoveDocRequestModal.jsx";
import {SetDoctorId} from "../redux/features/doctor/doctorSlice.js";

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
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Phone",
        dataIndex: "phone"
    },
    {
        title: "Action",
        dataIndex: "action",
    },
    {
        title: "Remove",
        dataIndex: "remove",
    },
];

const DoctorsRequest = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError, error} = useGetDoctorsRequestQuery();
    const doctors = data?.data || [];
    const [approveDoctor, {isLoading:Loading, isSuccess}] = useApproveDoctorMutation();

    const handleClick = (doctorID, userID) => {
        approveDoctor({
            doctorId:doctorID,
            userId: userID
        })
    }



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
                status: doctors[i].status,
                phone: doctors[i].phone,
                action: (
                    <>
                        <div className="d-flex">
                            {doctors[i].status === "pending" ? (
                                <button
                                    disabled={Loading}
                                    onClick={()=>{
                                        handleClick(doctors[i]._id, doctors[i].userId)
                                    }}
                                    className="px-4 py-2 rounded-md bg-green-500 text-white font-bold text-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                                    Approve
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800">
                                    Reject
                                </button>
                            )}
                        </div>
                    </>
                ),
                remove: (
                    <>
                        <button
                            onClick={()=>{
                                dispatch(SetDoctorId(doctors[i]?._id))
                                dispatch(SetDocReqRemoveModalOpen(true));
                            }}
                            className="bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold text-md rounded-md">
                            <AiFillDelete size={25}/>
                        </button>
                    </>
                ),
            });
        }

    }




    return (
        <>
            <div>
                <h1 className="text-center text-2xl mb-3">Doctors Request</h1>
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

            <RemoveDocRequestModal/>
        </>
    );
};

export default DoctorsRequest;