

export default function RequestsTab () {

    const confirmRequest = () => {



    }

    const cancelRequest = () => {



    }


    return (

        <>
        <div className="overflow-x-auto">
                    <table className="table">
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-circle w-12 h-12">
                                    <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                            </td>
                            <th>
                            <div className="flex flex-row pl-32 gap-8">
                                    <div className=""><button className="btn btn-circle px-3" onClick={confirmRequest}><span className="material-symbols-outlined text-xl">check_circle</span></button></div>
                                    <div className=""><button className="btn btn-circle px-3" onClick={cancelRequest}><span className="material-symbols-outlined">cancel</span></button></div>
                            </div>
                            </th>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-circle w-12 h-12">
                                    <img src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            <th>
                            <div className="flex flex-row  pl-32 gap-8">
                                <div className=""><button className="btn btn-circle px-3" onClick={confirmRequest}><span className="material-symbols-outlined text-xl">check_circle</span></button></div>
                                <div className=""><button className="btn btn-circle px-3" onClick={cancelRequest}><span className="material-symbols-outlined">cancel</span></button></div>
                            </div>
                            </th>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-circle w-12 h-12">
                                    <img src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Marjy Ferencz</div>
                                <div className="text-sm opacity-50">Russia</div>
                                </div>
                            </div>
                            </td>
                            <th>
                            <div className="flex flex-row pl-32 gap-8">
                                    <div className=""><button className="btn btn-circle px-3" onClick={confirmRequest}><span className="material-symbols-outlined text-xl">check_circle</span></button></div>
                                    <div className=""><button className="btn btn-circle px-3" onClick={cancelRequest}><span className="material-symbols-outlined">cancel</span></button></div>
                            </div>
                            </th>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-circle w-12 h-12">
                                            <img src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">Yancy Tear</div>
                                    <div className="text-sm opacity-50">Brazil</div>
                                </div>
                            </div>
                            </td>
                            <th>
                                <div className="flex flex-row pl-32 gap-8">
                                    <div className=""><button className="btn btn-circle px-3" onClick={confirmRequest}><span className="material-symbols-outlined text-xl">check_circle</span></button></div>
                                    <div className=""><button className="btn btn-circle px-3" onClick={cancelRequest}><span className="material-symbols-outlined">cancel</span></button></div>
                                </div>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
        
        </>
    )
}