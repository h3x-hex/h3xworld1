import { Navbar } from "components/Navbar";
import Image from "next/image";
import { genCrimson, genIndigo, genObsidian, hexship } from "public";


export default function Page () {


    return (

        <>  
            <Navbar/>
                <div className="container flex flex-col h-full w-screen bg-zinc-950 items-center justify-center pb-96">
                    <div className="pt-3">
                        <p className="text-6xl text-zinc-300 pb-32 font-bold">h<span className="text-warning">3</span>x Marketplace</p>
                    </div>
                    <div className="h-5/6 w-5/6 bg-zinc-300">
                        <Image src={hexship} alt="HEXSHIP"/>
                    </div>
                    <div className="divider divider-warning"></div>
                    <div>
                        <p className="pt-32 text-6xl text-gray-300 font-bold">Categories</p>
                        <div className="divider divider-warning"></div>
                        <div className="grid gap-16 grid-cols-3 pt-16">
                            <div className="card w-96 bg-base-100 shadow-xl pb-8 cursor-pointer">
                            <figure>
                                <Image src={genCrimson} alt="G3n3sis"/>
                            </figure>
                                <div className="card-body items-center justify-center">
                                    <h2 className="card-title">
                                        G3n3sis Collection
                                    </h2>  
                                </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl cursor-pointer">
                            <figure>
                                <Image src={genObsidian} alt="Shoes"/>
                            </figure>
                            <div className="card-body items-center justify-center">
                                <h2 className="card-title">
                                    h3xav3rse
                                </h2>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl cursor-pointer">
                            <figure><Image src={genIndigo} alt="Shoes" /></figure>
                            <div className="card-body items-center justify-center">
                                <h2 className="card-title">
                                    h3xWear
                                </h2>
                            </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <p className="pt-32 text-6xl text-gray-300 font-bold">Products</p>
                        <div className="divider divider-warning"></div>
                        <div className="grid gap-16 grid-cols-3 pt-16">
                            <div className="card w-96 bg-base-100 shadow-xl pb-8">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl pb-8">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                            <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>

        </>

    )
}