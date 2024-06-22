"use client"

import { Navbar } from "components/Navbar";


export default function Page () {

    const addCategory = () => {

        if (document) {(document.getElementById('addCategory') as HTMLFormElement).showModal()}
    }

    const addProduct = () => {

        if (document) {(document.getElementById('addProduct') as HTMLFormElement).showModal()}
    }

    return (

        <>
        <Navbar/>
            <div className="text-gray-300 pb-96 pl-32">
                <div>
                    <div className="pt-8 pb-8">
                        <p className="text-xl">Store Logo</p>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    
                </div>
                <div className="pt-8 items-center justify-center pb-8">
                    <p className="text-xl">Store Name</p>
                    <input type="text" placeholder="Store Name" className="input input-bordered w-full max-w-xs text-gray-950" />
                </div>
                <div className="">
                    <p className="text-xl">Hero Section</p>
                    <div className="flex flex-row gap-3">
                        <div className="artboard artboard-horizontal phone-6 bg-zinc-300">1024×320</div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className="flex">
                    <div className="pt-8 flex flex-row">
                        <p className="text-xl pb-8 pr-3">Categories</p>
                        <button className="btn btn-sm btn-circle btn-outline text-gray-300 hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addCategory') as HTMLFormElement).showModal()}}}>
                            <span className="material-symbols-outlined ">add</span>
                        </button>
                    </div>
                </div>
                <div className="pt-8">
                    <div className="pt-8 flex flex-row">
                        <p className="text-xl pb-8 pr-3">Products</p>
                        <button className="btn btn-sm btn-circle btn-outline text-gray-300 hover:bg-warning hover:text-gray-950" onClick={() => {if (document) {(document.getElementById('addProduct') as HTMLFormElement).showModal()}}}>
                            <span className="material-symbols-outlined ">add</span>
                        </button>
                    </div>
                </div>
            </div>
            <dialog id="addCategory" className="modal">
                <div className="modal-box w-full bg-zinc-900">
                    <div className="container text-gray-300 ">
                        <div className="pb-8">
                            <p className="text-xl pb-3">Category Name</p>
                            <input type="text" placeholder="Category Name" className="input input-bordered w-full max-w-xs text-gray-950" />
                        </div>

                        <div>
                            <p className="text-xl pb-3">Category Image</p>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>

                        <div className="pt-8">
                            <button className="btn btn-outline w-24 rounded-full text-gray-300 hover:bg-warning hover:text-gray-950">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <dialog id="addProduct" className="modal">
                <div className="modal-box w-full bg-zinc-900">
                    <div className="container text-gray-300">
                        <div className="pb-8">
                            <p className="text-xl pb-3">Product Name</p>
                            <input type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs text-gray-950" />
                        </div>

                        <div className="pb-8">
                            <p className="text-xl pb-3">Product Description</p>
                            <input type="text" placeholder="Product Description" className="input input-bordered w-full max-w-xs text-gray-950" />
                        </div>

                        <div className="pb-8">
                            <p className="text-xl pb-3">Product Image</p>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>

                        <div className="">
                            <button className="btn btn-outline w-24 rounded-full text-gray-300 hover:bg-warning hover:text-gray-950">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>

    )

}