

export default function GroupsTab () {


    return (

        <>
        <div className="overflow-x-auto">
                    <table className="table pb-16">
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
                            <p>Added on 3/6/09</p>
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
                            <p>Added on 3/6/09</p>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <div className="py-3"></div>
                    <button className="absolute bottom-3 right-8 pt-8" onClick={() => {if (document) {(document.getElementById('add_group') as HTMLFormElement).showModal();}}}><span className="material-symbols-outlined">group_add</span></button>
                    <dialog id="add_group" className="modal">
                        <div className="modal-box w-full">
                            <div className="flex flex-row">
                                <img src=""/>
                                

                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
        
        </>
    )
}