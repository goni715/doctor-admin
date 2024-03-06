import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetDocReqRemoveModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useEffect} from "react";
import {useRemoveDocRequestMutation} from "../../redux/features/doctor/doctorApi.js";


const RemoveDocRequestModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.docReqRemoveModalOpen);
    const {doctorId} = useSelector(state=>state.doctor);
    const [removeDocRequest, {isSuccess,isLoading}] = useRemoveDocRequestMutation();


    const handleOk = () => {
        dispatch(SetDocReqRemoveModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetDocReqRemoveModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetDocReqRemoveModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        removeDocRequest(doctorId);
    }

    return (
        <>
            <Modal title="Are you sure? You want to delete." open={modalOpen} onOk={handleOk}>
                <div>
                    <div className="flex mt-6 gap-6 pt-5">
                        <button onClick={handleCancel} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={handleDelete} disabled={isLoading} className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? "Processing..." : "Yes"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default RemoveDocRequestModal;