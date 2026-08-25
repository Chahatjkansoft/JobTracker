import React, { useState } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const { userName, email, password } = formData;
  const [errorMsg, setErrorMsg] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!userName || !email || !password) {
        setErrorMsg("Enter all values");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters")
        return;
      }

      const res = await api.post("/auth/register", {
        userName,
        email,
        password,
      });
      login(res.data.token);
      navigate("/dashboard");

    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setErrorMsg(message);
    }
    finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-9 shadow-[0_14px_40px_rgba(41,72,128,0.08)]">
        <div className="mb-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white">J</span><span className="text-lg font-bold text-slate-800">JobTracker</span></div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">Get started</p><h2 className="mb-6 mt-2 text-3xl font-bold tracking-tight text-slate-800">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="userName" value={userName} onChange={handleChange} placeholder="User Name"
            className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
          />
          <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email"
            className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
          />
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="******"
            className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
          />
          <button type="submit" className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-600">
            {loader ? (<span className="spinner"></span>) : "Register"}
          </button>
        </form>
        {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
        <p className="mt-6 text-sm text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
