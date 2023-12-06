'use client'
import { Form, Formik, Field, FormikProvider, useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import user, { User } from '../User'
import { UserData } from '../utils/Types'
import Button from '@/components/Ui/Button'
import { useLoginMutation } from '@/redux/api/authApi'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { ApiErrorResponse } from '@/redux/types/User'

export default function Login() {

    const initialValues = {
        email: '',
        password: '',
        remember: false
    }

    const [login, {
        isLoading: isLoginLoading,
        isSuccess: isLoginSuccess,
        isError: isLoginError,
        error: loginError,
        data: loginData
    }] = useLoginMutation()

    useMemo(() => {
        if (loginError && isLoginError) {
            toast((loginError as ApiErrorResponse).data['message'], {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: false
            })
            console.log((loginError as ApiErrorResponse).data['message'])
        }
    }, [loginError, isLoginError])

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        remember: Yup.boolean().optional()
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            login(values)
        }
    })

    return (
        <div className="m-auto w-full flex justify-center items-center p-8 bg-[#EEF2FF] min-h-[70vh] flex-col-reverse lg:flex-row">
            <div className='flex-1 justify-end flex'>
                <div className="bg-white rounded p-10 max-w-[500px] flex-col flex justify-center items-center">
                    <div className='flex flex-col gap-2 justify-center w-full items-center'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0H29.224V2.0167H26.476V0H5.52398V2.0167H2.77566V0H0V32H2.77566V29.9833H5.52398V32H26.476V29.9833H29.224V32H32V0ZM5.52398 27.4696H2.77566V23.62H5.52398V27.4696ZM5.52398 21.1063H2.77566V17.2566H5.52398V21.1063ZM5.52398 14.743H2.77566V10.8933H5.52398V14.743ZM5.52398 8.38041H2.77566V4.52999H5.52398V8.38041ZM23.8651 29.9028H8.13487V17.052H23.8655L23.8651 29.9028ZM23.8651 14.9476H8.13487V2.09757H23.8655L23.8651 14.9476ZM29.224 27.4696H26.476V23.62H29.224V27.4696ZM29.224 21.1063H26.476V17.2566H29.224V21.1063ZM29.224 14.743H26.476V10.8933H29.224V14.743ZM29.224 8.38041H26.476V4.52999H29.224V8.38041Z" fill="#111111" />
                        </svg>
                        <h1 className="text-center text-black text-xxl font-bold">Login to your account</h1>
                    </div>
                    <FormikProvider value={formik}>
                        <Form id='register' className="flex flex-col p-8 justify-center items-start gap-2">
                            <div className='w-full flex flex-col justify-center items-start'>
                                <label htmlFor="email" className="text-black text-sm font-semibold">Email <span className='text-red-600'>*</span></label>
                                <Field type="email" placeholder="Email" name='email' className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full" />
                            </div>
                            <ErrorMessage name='email' component='span' className="text-red-600" />
                            <div className='w-full flex flex-col justify-center items-start'>
                                <label htmlFor="password" className="text-black text-sm font-semibold">Password <span className='text-red-600'>*</span></label>
                                <Field type="password" placeholder="Password" name='password' className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full" />
                            </div>
                            <ErrorMessage name='password' component='span' className="text-red-600" />
                            <div className='w-full flex flex-row justify-start items-center gap-2'>
                                <Field type="checkbox" name='terms' className="border border-gray-200 rounded placeholder-black text-black" />
                                <label htmlFor="terms" className="text-black text-sm">Remember me</label>
                                <ErrorMessage name='terms' component='span' className="text-red-600" />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Button title={'Login'} isLoading={isLoginLoading} classNames='mt-4 w-full' />
                                <a href="#" className="text-sm text-main mt-2">Did you forget your password ?</a>
                                <p className='text-center'>
                                    <span className="text-sm text-black">You don&apos;t have an account ?</span>
                                    <a href="/register" className="text-sm text-main ml-2 ">Register</a>
                                </p>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
            <div className='flex-1 justify-start max-w-[300px] lg:max-w-full'>
                <Image className='object-contain' src='/imgs/auth-img.png' width={600} height={600} alt='dancing man' />
            </div>
        </div>
    )
}