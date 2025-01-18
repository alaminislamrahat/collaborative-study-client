import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc'; // Google icon
import img from '../../assets/Login-bro.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../Firebase/firebase.confiq';
import UseAuth from '../../Hooks/UseAuth';
import toast from 'react-hot-toast';


const Login = () => {
    const { signIn } = UseAuth();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signIn(email, password)
            .then((result) => {
                console.log(result);
                toast.success('Login successfully')
                navigate(location.state ? location.state : '/');
            })
            .catch((error) => toast.error(error.message));
    };

    const googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                navigate(location.state ? location.state : '/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="hero min-h-screen flex items-center justify-center  pt-20">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10 items-center">
                {/* Image Section */}
                <div className="text-center lg:text-left w-1/2">
                    <img src={img} alt="Login" className="rounded-lg shadow-lg" />
                </div>

                {/* Form Section */}
                <div className="card border-2 border-white w-full max-w-md rounded-lg shadow-2xl p-8">
                    <h1 className="text-center text-3xl font-extrabold text-[#92E3A9] mb-6">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-400">
                                <span>Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered  rounded-md  text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 "
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-400">
                                <span>Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered  rounded-md  text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 "
                                required
                            />
                            <label className="label mt-1">
                                <a href="#" className="text-sm text-[#92E3A9] hover:underline">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-[#92E3A9] hover:bg-orange-600 text-white font-semibold rounded-md py-2"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="divider mt-6 text-gray-500">OR</div>
                    <div className="flex justify-center">
                        <button
                            onClick={googleLogin}
                            className="flex items-center justify-center w-full py-3 px-6 border  rounded-md shadow-md hover:shadow-lg transition-all duration-300  hover:bg-gray-600 text-slate-800 font-medium gap-3"
                            type="button"
                        >
                            <FcGoogle className="text-2xl" /> {/* Google icon */}
                            Continue with Google
                        </button>
                    </div>
                    <p className="py-6 text-center text-gray-400">
                        New here?{' '}
                        <Link className="font-bold text-[#92E3A9] hover:underline" to="/register">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;