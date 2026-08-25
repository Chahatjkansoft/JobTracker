import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const fieldStyles = 'mt-2 h-11 w-full rounded-lg border border-slate-100 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:text-slate-400';

const Profile = () => {
    const [formData, setFormData] = useState({ name: '', surName: '', mobileNo: '', userName: '', email: '' });
    const { name, surName, mobileNo, userName, email } = formData;
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageLoader, setPageLoader] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        if (!user) return;
        const fetchProfileData = async () => {
            try { setPageLoader(true); const data = await api.get(`/profile/get/${user.userId}`, { params: { status: 'test' } }); if (data.data.data) setFormData({ name: data.data.data.name, surName: data.data.data.surName, mobileNo: data.data.data.mobileNo, email: data.data.data.userId.email, userName: data.data.data.userId.userName }); }
            catch (error) { console.log('Profile load error', error); } finally { setPageLoader(false); }
        };
        fetchProfileData();
    }, [user]);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.surName.trim()) { setErrorMsg('Enter first and last name'); return; }
        try { setLoading(true); const data = await api.put(`profile/updateProfile/${user.userId}`, { data: formData }); setErrorMsg('Profile Updated'); setFormData({ name: data.data.data.name, surName: data.data.data.surName, mobileNo: data.data.data.mobileNo, userName: data.data.data.userId.userName, email: data.data.data.userId.email }); }
        catch (error) { console.log('error updating profile', error); setErrorMsg(error); } finally { setLoading(false); }
    };
    if (pageLoader) return <Loader />;
    return <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32"><div className="mx-auto max-w-[1120px]"><div className="mb-6 md:mb-8"><p className="text-sm font-medium text-blue-500">Account settings</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">My Profile</h1><p className="mt-2 text-sm text-slate-400">Manage your personal information and account details.</p></div><section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(41,72,128,0.06)]"><div className="h-20 bg-gradient-to-r from-blue-100 via-slate-100 to-amber-50 md:h-28" /><div className="px-4 pb-7 sm:px-6 md:px-8 md:pb-10"><div className="-mt-8 flex flex-col items-start gap-5 border-b border-slate-100 pb-6 sm:-mt-10 sm:flex-row sm:items-end sm:justify-between md:pb-7"><div className="flex min-w-0 items-center gap-3 sm:gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white shadow-md sm:h-20 sm:w-20 sm:text-2xl">{(name || userName || 'U').slice(0, 1).toUpperCase()}</div><div className="min-w-0"><h2 className="truncate text-base font-bold text-slate-800 sm:text-lg">{name || 'Your name'} {surName}</h2><p className="mt-1 truncate text-sm text-slate-400">{email || 'No email added'}</p></div></div><button type="submit" form="profile-form" disabled={loading} className="w-full rounded-lg bg-blue-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{loading ? 'Saving...' : 'Save changes'}</button></div><form id="profile-form" onSubmit={handleSubmit} className="pt-6 md:pt-7"><div className="grid grid-cols-1 gap-x-7 gap-y-5 md:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Full Name<input type="text" name="name" value={name} onChange={handleChange} placeholder="Your first name" required className={fieldStyles} /></label><label className="text-sm font-semibold text-slate-700">Nick Name<input type="text" name="userName" value={userName} onChange={handleChange} placeholder="Your username" required className={fieldStyles} /></label><label className="text-sm font-semibold text-slate-700">Last Name<input type="text" name="surName" value={surName} onChange={handleChange} placeholder="Your last name" required className={fieldStyles} /></label><label className="text-sm font-semibold text-slate-700">Mobile Number<input type="text" name="mobileNo" value={mobileNo} onChange={handleChange} placeholder="Your mobile number" className={fieldStyles} /></label><label className="text-sm font-semibold text-slate-700">Email Address<input type="email" name="email" value={email} disabled className={fieldStyles} /></label></div>{errorMsg && <p className={`mt-5 text-sm ${errorMsg === 'Profile Updated' ? 'text-emerald-600' : 'text-rose-600'}`}>{errorMsg}</p>}</form></div></section></div></main>;
};
export default Profile;
