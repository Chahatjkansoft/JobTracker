import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext"
import Loader from "../components/Loader";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "", surName: "", mobileNo: "", userName:"", email:""
    });
    const { name, surName, mobileNo, userName, email } = formData;
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoader, setpageLoader] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        fetchProfileData(user.userId);
    }, [user]);

    const fetchProfileData = async (id) => {
        try {
            setpageLoader(true);
            const data = await api.get(`/profile/get/${id}`, { params: { status: "test" } });
            if (data.data.data) {
                console.log("Profile Data=>", data);
                setFormData({
                    name: data.data.data.name,
                    surName: data.data.data.surName,
                    mobileNo: data.data.data.mobileNo,
                    email: data.data.data.userId.email,
                    userName: data.data.data.userId.userName
                });
            }

        } catch (error) {
            console.log("Profile load error", error);
        }
        finally {
            setpageLoader(false);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.surName.trim()) {
            setErrorMsg("Enter first and last name");
            return;
        }
        try {
            setLoading(true);
            const data = await api.put(`profile/updateProfile/${user.userId}`, { data: formData });
            console.log("data after save=>", data);
            setErrorMsg("Profile Updated");
            setFormData({ 
                name: data.data.data.name, 
                surName: data.data.data.surName, 
                mobileNo: data.data.data.mobileNo,
                userName: data.data.data.userId.userName,
                email: data.data.data.userId.email,
            });
        }
        catch (error) {
            console.log("error updating profile", error);
            setErrorMsg(error);
        }
        finally {
            setLoading(false);
        }
    }

    if (pageLoader) return <Loader />;
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-5">Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text" placeholder="User Name" onChange={handleChange} value={userName} name="userName" required
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text" placeholder="First Name" onChange={handleChange} value={name} name="name" required
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text" placeholder="Last Name" onChange={handleChange} value={surName} name="surName" required
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text" placeholder="Mobile Number" onChange={handleChange} value={mobileNo} name="mobileNo"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text" placeholder="Email" onChange={handleChange} value={email} name="email" disabled
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <button
                        disabled={loading} type="submit"
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
                {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
            </div>
        </main>
    );
};

export default Profile;