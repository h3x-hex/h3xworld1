import { UserProfileType } from "types/types"


interface IProps {

    profile: UserProfileType


}

export default function WalletAssets ({profile}: IProps) {


return (
    <>
        <div className="overflow-x-auto pt-3">
                    <table className="table">
                        <tbody>
                        {/* row 1 */}
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>MATIC</p>
                                <p>MATIC</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>420.69</p>
                                <p>$420.69</p>
                            </div>
                            </div>
                        </tr>
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>ETH</p>
                                <p>Ethereum</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>3.69</p>
                                <p>$10000</p>
                            </div>
                            </div>
                        </tr>
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>SOL</p>
                                <p>Solana</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>80085</p>
                                <p>$8008135</p>
                            </div>
                            </div>
                        </tr>
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>MATIC</p>
                                <p>Polygon</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>420.69</p>
                                <p>$420.69</p>
                            </div>
                            </div>
                        </tr>
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>MATIC</p>
                                <p>Polygon</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>420.69</p>
                                <p>$420.69</p>
                            </div>
                            </div>
                        </tr>
                        <tr>
                        <div className="flex flex-row items-start justify-start w-full pb-3">
                            <div className="avatar placeholder h-13 pt-2 pr-3">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <img src={profile.profilePhotoURL} className="object-cover"/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-2">
                                <p>MATIC</p>
                                <p>Polygon</p>
                            </div>
                            <div className="flex flex-col items-end justify-end absolute pt-2 right-5">
                                <p>420.69</p>
                                <p>$420.69</p>
                            </div>
                            </div>
                        </tr>
                        </tbody>
                </table>
        </div>
    </>
)

}