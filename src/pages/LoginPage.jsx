import { useState } from "react";
import { FaMosquito, FaAt, FaKey, FaCircleExclamation } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // navigate to dashboard
        navigate("/ken");
      })
      .catch((error) => {
        const emailError = error.message.includes("auth/invalid-email");
        const passwordError = error.message.includes("auth/invalid-password");

        if (emailError || passwordError) {
          setErrorMessage("Invalid credentials");
        } else {
          setErrorMessage("Something went wrong: Contact admin");
        }
      });
  };

  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex shrink-0 rounded-lg bg-teal-800 gap-3 p-4 items-center'>
          <FaMosquito color='#fff' size={32} /> <div className='text-gray-100 font-medium font-serif text-lg p-1 tracking-wide'>iMalaria</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
            <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
            <div className='w-full'>
              <div>
                <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='email'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                    id='email'
                    type='email'
                    name='email'
                    autoComplete='email'
                    placeholder='Enter your email address'
                    required
                    {...register("email")}
                  />
                  <FaAt className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                </div>
              </div>
              <div className='mt-4'>
                <label className='mb-3 mt-5 block text-xs font-medium text-gray-900' htmlFor='password'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    autoComplete='current-password'
                    className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    required
                    minLength={6}
                    {...register("password")}
                  />
                  <FaKey className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                </div>
              </div>
            </div>
            <button type='submit' className='btn mt-4 w-full'>
              Log in
            </button>
            <div className='flex mt-4 items-end space-x-1' aria-live='polite' aria-atomic='true'>
              {errorMessage && (
                <div className='flex gap-3 items-center'>
                  <FaCircleExclamation className='h-5 w-5 text-red-500' />
                  <p className='text-sm text-red-500 '>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
