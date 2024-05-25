

export default function EditorModal () {

    return (

        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><span className="material-symbols-outlined">close</span></button>
                </form>
                <div className="">
                    
                </div>
                <div className="">
                    <button className="btn btn-outline btn-warning">Publish</button>
                </div>
            </div>
        </dialog>

    );

}