export const Quote = ({text} : {text : string}) => {
    return (
        <div className="">
            <video
                src="/assets/crystal_floating.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            <div
                className="z-10 flex flex-col items-center justify-center bg-white bg-opacity-0 backdrop-blur-lg absolute inset-0  text-center shadow-lg "
            >
                <p className="text-4xl font-bold mb-4 text-white">{text}</p>

            </div>
        </div>
    );
};
