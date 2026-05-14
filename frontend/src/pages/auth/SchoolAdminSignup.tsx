import authImg from "../../assets/auth.png";
import logo from "../../assets/EdPlus_Logo.png";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { School } from "lucide-react";
import { MapPin } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import api from "../../../utils/api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router";

const SchoolAdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !email || !password || !phone || !schoolName || !schoolLocation) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/users/register-school-admin", {
        name,
        email,
        password,
        phone,
        schoolName,
        schoolLocation,
        schoolContactEmail: email,
        schoolContactPhone: phone,
      });
      toast.success("School admin account created successfully");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-2 w-full min-h-screen">
      <div className="hidden md:flex flex-col gap-3 md:w-1/2 items-center justify-center">
        <div className="flex flex-col gap-4 items-start justify-center w-[80%] p-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <img src={logo} alt="" className="w-12 h-12 rounded-sm" />
            <div>
              <h3 className="text-foreground font-bold text-3xl">EdPlus</h3>
              <p className="text-muted-foreground text-sm">ACADEMIC ATELIER</p>
            </div>
          </div>
          <h1 className="text-5xl text-foreground font-bold w-full">
            Register Your School
          </h1>
          <p className="text-muted-foreground leading-7 w-full">
            Register as a school administrator to manage your institution on
            EdPlus.
          </p>
          <div className="flex flex-col items-center justify-center relative w-full overflow-hidden group rounded-xl">
            <img
              src={authImg}
              className="w-full max-h-[300px] md:max-h-[360px] object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
              alt="Students collaborating in a school setting"
            />
            <p className="text-muted-foreground leading-7 bg-background absolute bottom-3 w-[90%] p-3 rounded-md">
              "Education is the most powerful weapon which you can use to
              change the world."
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-1/2 items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="space-y-5 w-[80%] bg-card rounded-lg px-4 py-8 flex flex-col items-start justify-center shadow-[0_28px_60px_rgba(42,53,50,0.14)]"
        >
          <div className="flex flex-col gap-3 pb-5">
            <h3 className=" text-foreground font-bold text-3xl">
              School Admin Registration
            </h3>
            <p className="text-muted-foreground font-semibold">
              Create your account and register your school.
            </p>
          </div>

          <div className="grid w-full gap-5 md:grid-cols-2">
            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="name">
                FULL NAME
              </label>
              <input
                id="name"
                placeholder="Full Name"
                type="text"
                value={name}
                className="p-4 rounded-sm text-[18px] w-full border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                onChange={(event) => setName(event.target.value)}
              />
              <User className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="email">
                EMAIL
              </label>
              <input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                className="p-4 rounded-sm text-[18px] w-full border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Mail className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="phone">
                PHONE NUMBER
              </label>
              <input
                id="phone"
                placeholder="0712345678"
                className="w-full p-4 rounded-sm text-[18px] border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <Phone className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                placeholder="Password"
                className="w-full p-4 rounded-sm text-[18px] border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Lock className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <hr className="w-full border-t border-border my-2 md:col-span-2" />

            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="schoolName">
                SCHOOL NAME
              </label>
              <input
                id="schoolName"
                placeholder="e.g. West Coast Hill School"
                type="text"
                value={schoolName}
                className="p-4 rounded-sm text-[18px] w-full border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                onChange={(event) => setSchoolName(event.target.value)}
              />
              <School className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <div className="grid gap-2 w-full relative">
              <label className="text-sm/relaxed font-bold" htmlFor="schoolLocation">
                SCHOOL LOCATION
              </label>
              <input
                id="schoolLocation"
                placeholder="e.g. Nairobi, Kenya"
                type="text"
                value={schoolLocation}
                className="p-4 rounded-sm text-[18px] w-full border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 pl-12"
                onChange={(event) => setSchoolLocation(event.target.value)}
              />
              <MapPin className="absolute left-3 bottom-4 text-muted-foreground" />
            </div>

            <button
              type="submit"
              className="w-full rounded-sm bg-primary px-4 py-4 text-[18px] font-bold text-primary-foreground transition-colors hover:bg-primary/80 cursor-pointer flex flex-row gap-3 items-center justify-center md:col-span-2"
            >
              {loading ? (
                <MoonLoader size={20} color="white" />
              ) : (
                <>
                  <span>Register School</span>{" "}
                  <ArrowRight className="font-bold" />
                </>
              )}
            </button>
          </div>

          <hr className="w-full border-t border-border my-7" />

          <div className="flex flex-col items-center justify-center w-full">
            <p className="">
              Already have an account?{" "}
              <a href="/" className="text-primary">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolAdminSignup;
