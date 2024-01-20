import {Table} from "antd";
import {
    useApproveDoctorMutation,
    useGetDoctorsQuery,
    useGetDoctorsRequestQuery
} from "../redux/features/doctor/doctorApi.js";
import {useLoginMutation} from "../redux/features/auth/authApi.js";
import {SuccessToast} from "../helper/ValidationHelper.js";
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
];

const DoctorsRequest = () => {
    const {data, isLoading, isError, error} = useGetDoctorsRequestQuery();
    const doctors = data?.data || [];
    const [approveDoctor, {isLoading:Loading, isSuccess}] = useApproveDoctorMutation();

    const handleClick = (id) => {
        approveDoctor({
            doctorId:id,
            status:"approved"
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
                                    onClick={()=>handleClick(doctors[i]._id)}
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
        </>
    );
};

export default DoctorsRequest;