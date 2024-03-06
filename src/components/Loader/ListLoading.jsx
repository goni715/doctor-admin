

const ListLoading = () => {
    const array = [1,2,3,4,5,6,7,8,9,10,11];
    return (
        <>
            <div className="flex flex-col gap-6 shadow p-6 animate-pulse">
                {
                    array.map((item,i)=>{
                        return(
                            <>
                                <div key={i.toString()} className="bg-slate-200 h-[45px] rounded-lg">
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </>
    );
};

export default ListLoading;