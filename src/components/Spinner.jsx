import {MoonLoader} from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",

};

const Spinner = () => {


    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-black bg-opacity-20 z-9999">
                <MoonLoader
                    color="red"
                    loading={true}
                    cssOverride={override}
                    size={120}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    );
};

export default Spinner;