import React, { useState, useEffect } from "react"
import api from "../services/api";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext"
import PageHeader from "../components/PageHeader";

const Dashboard = () => {
    const [statusCount, setStatusCount] = useState({});
    const [applications, setApplications] = useState([]);
    const [compName, setCompName] = useState("");
    const [status, setstatus] = useState("All");
    const [sectionLoader, setSectionLoader] = useState(false);
    const [loader, setLoader] = useState(true);
    const { user } = useAuth();

    const fetchMyDashboardData = async (userId, status = "All", companyName = "", pageLoader = true) => {
        try {
            if (!userId) return;
            pageLoader ? setLoader(true) : setSectionLoader(true);
            const data = await api.get("/application/get", { params: { Status: status, Name: companyName } });
            setApplications(data.data.data);
            const count = {
                applied: 0,
                interview: 0,
                rejected: 0,
                offer: 0
            };
            data.data.data.forEach((item) => {
                const itemStatus = item.Status?.toLowerCase();
                if (count[itemStatus] !== undefined) {
                    count[itemStatus] += 1;
                }
            });
            setStatusCount(count);
        }
        catch (error) {
            console.log("Dashboard load error", error);
        }
        finally {
            setLoader(false);
            setSectionLoader(false);
        }
    };

    useEffect(() => {
        if (!user) return;

        fetchMyDashboardData(user.userId);
    }, [user]);

    const statusChangeHandle = async (Id, e) => {
        try {
            const changeStatus = e.target.value;
            await api.put("/application/updateStatus/" + Id, { status: changeStatus });
            fetchMyDashboardData(user.userId, status, compName, false);
        }
        catch (error) {
            console.log("Update status error", error?.response || error);
        }
    };

    const handleClick = async (e) => {
        setstatus(e.target.value);
        fetchMyDashboardData(user.userId, e.target.value, compName, false);
    };
    const handleBlur = async (e) => {
        fetchMyDashboardData(user.userId, status, e.target.value, false);
    };

    if (loader) return <Loader />;
    return (
        <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32">
            <div className="mx-auto max-w-[1200px] space-y-5 md:space-y-7">
                <PageHeader title="Application overview" description="Track your job search activity and progress." />
                <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_40px_rgba(41,72,128,0.06)] sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                            {['Applied', 'Interview', 'Rejected', 'Offer'].map((label) => (
                                <div key={label} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center sm:min-w-[120px] sm:p-4">
                                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                                    <div className="mt-2 text-2xl font-bold text-slate-800">{statusCount[label.toLowerCase()] || 0}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_40px_rgba(41,72,128,0.06)] sm:p-6">
                    <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            {['All', 'applied', 'interview', 'rejected', 'offer'].map((item) => (
                                <label key={item} className="inline-flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-slate-900"
                                        name="statusFilter"
                                        value={item}
                                        checked={status === item}
                                        onChange={handleClick}
                                    />
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </label>
                            ))}
                        </div>
                        <div className="w-full md:max-w-xs">
                            <input
                                type="text"
                                onBlur={handleBlur}
                                onChange={(e) => setCompName(e.target.value)}
                                className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:outline-none"
                                value={compName}
                                placeholder="Filter by company name"
                            />
                        </div>
                    </div>
                </section>

                <section className="relative rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(41,72,128,0.06)]">
                    {sectionLoader && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                            <Loader />
                        </div>
                    )}
                    {/* Desktop Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    {['#', 'Company', 'Contact', 'Status', 'Updated On', 'Action'].map((label) => (
                                        <th key={label} className="px-4 py-3 text-center font-medium">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {applications.length > 0 ? applications.map((company, index) => (
                                    <tr key={company._id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4 text-center">{index + 1}</td>
                                        <td className="px-4 py-4 text-center">{company.CompanyId.companyName}</td>
                                        <td className="px-4 py-4 text-center">{company.CompanyId.contactName}</td>
                                        <td className="px-4 py-4 text-center">{company.Status}</td>
                                        <td className="px-4 py-4 text-center">{company.AppliedDate}</td>
                                        <td className="px-4 py-4 text-center">
                                            <select
                                                value={company.Status.toLowerCase()}
                                                className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900"
                                                onChange={(e) => statusChangeHandle(company._id, e)}
                                            >
                                                <option value="applied">Applied</option>
                                                <option value="interview">Interviewed</option>
                                                <option value="rejected">Rejected</option>
                                                <option value="offer">Offer</option>
                                            </select>
                                        </td>
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

export default Dashboard;
