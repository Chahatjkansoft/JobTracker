import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader";

const GetAllUsers = () => {
    const [userData, setUserData] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        fetchAllUsers();
    }, []);
    const fetchAllUsers = async () => {
        try {
            setLoader(true);
            const res = await api.get("/users/getAll");
            setUserData(res.data.data);
        } catch (error) {
            console.log("Error in feteching users=>", error);
        }
        finally {
            setLoader(false);
        }
    }
    if (loader) return <Loader />;

    return (
        <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32">
            <div className="mx-auto max-w-[1200px] space-y-5 md:space-y-7">
                <PageHeader eyebrow="Administration" title="Users" description="All users registered to the application." />
                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(41,72,128,0.06)]">
                    {/* Desktop Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50 text-slate-400">
                                <tr>
                                    {['Sr.No', 'UserName', 'Email', 'Subscription'].map((label) => (
                                        <th key={label} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {userData.length > 0 ? userData.map((data, index) => (
                                    <tr key={data._id} className="text-slate-600 hover:bg-blue-50/30">
                                        <td className="px-5 py-4">{index + 1}</td>
                                        <td className="px-5 py-4 font-semibold text-slate-800">{data.userName}</td>
                                        <td className="px-5 py-4">{data.email}</td>
                                        <td className="px-5 py-4">{data.subscriptionStatus}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default GetAllUsers;