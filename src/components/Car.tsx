const Car = ({ car, className }: { car: any, className: string }) => {
    // console.log("car is", car.car.img);

    return (
        <div className={`flex car text-black ${className}`}>
            <figure className="w-[8rem] h-[8rem]">
                <img src={car.img} alt="img" className="w-full h-full object-cover" />
            </figure>

            <div className="car-content flex flex-col justify-center ml-2 mr-8">
                <h3 className="mb-1 text-[14px] font-[500] leading-[1.2em]">{car.name}</h3>
                <p className="mb-2 text-[12px]">{car.place}</p>

                <div className="flex justify-between w-[8rem] mb-2">
                    <p className="text-[12px]">{car.capacity} KM</p>

                    <p className="text-[12px]">{car.power} Hp</p>
                </div>

                <p className="text-[12px] font-[500]">{car.price}</p>
            </div>
        </div>
    )
}

export default Car;