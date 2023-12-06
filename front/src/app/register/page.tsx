'use client'
import { Form, Formik, Field, FormikProvider, useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { UserData } from '../utils/Types'
import Image from 'next/image'
import Button from '@/components/Ui/Button'
import { useRegisterMutation } from '@/redux/api/authApi'
import { User } from '@/redux/types/User'
import { useState } from 'react'
import Modal from '@/components/Modal'

export default function Register() {

    const [showModal, setShowModal] = useState(false)

    const initialValues: User & { terms: boolean } = {
        firstname: '',
        lastname: '',
        email: '',
        plainPassword: '',
        confirmPassword: '',
        terms: false
    }

    const [register, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError,
        data: registerData
    }] = useRegisterMutation()

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        plainPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('plainPassword')], 'Passwords must match'),
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
    })

    const formik = useFormik<User>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values: User) => {
            setShowModal(true)
            register(values)
        }
    })

    return (
        <div className='m-auto w-full flex justify-center items-center relative p-8 bg-[#EEF2FF] min-h-[70vh] flex-col-reverse lg:flex-row'>
            {showModal && (
                <Modal
                    type='email-validate'
                    title='Welcome to Odicylens !'
                    content='To complete the registration process and activate your account, please check your email inbox.
                    <br/>
                    <br/>
                    If you encounter any issues or have questions, feel free to contact our support team at : 
                    <a class="text-main hover:text-main-dark transition-all" href="mailto:support@example.com">support@example.com</a>'
                    onClose={() => setShowModal(false)}
                />
            )}
            <div className='flex-1 justify-end flex'>
                <div className="bg-white rounded p-10 max-w-[500px] flex-col flex justify-center items-center">
                    <div className='flex flex-col gap-2 justify-center w-full items-center'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0H29.224V2.0167H26.476V0H5.52398V2.0167H2.77566V0H0V32H2.77566V29.9833H5.52398V32H26.476V29.9833H29.224V32H32V0ZM5.52398 27.4696H2.77566V23.62H5.52398V27.4696ZM5.52398 21.1063H2.77566V17.2566H5.52398V21.1063ZM5.52398 14.743H2.77566V10.8933H5.52398V14.743ZM5.52398 8.38041H2.77566V4.52999H5.52398V8.38041ZM23.8651 29.9028H8.13487V17.052H23.8655L23.8651 29.9028ZM23.8651 14.9476H8.13487V2.09757H23.8655L23.8651 14.9476ZM29.224 27.4696H26.476V23.62H29.224V27.4696ZM29.224 21.1063H26.476V17.2566H29.224V21.1063ZM29.224 14.743H26.476V10.8933H29.224V14.743ZM29.224 8.38041H26.476V4.52999H29.224V8.38041Z" fill="#111111" />
                        </svg>
                        <h1 className="text-center text-black text-xxl font-bold">New to Odicylens ?</h1>
                    </div>
                    <FormikProvider value={formik}>
                        <Form id='register' className="flex flex-col px-4 gap-1">
                            <div className='flex justify-between w-full items-center'>
                                <label htmlFor="firstname" className="text-black text-sm font-semibold">First Name <span className='text-red-600'>*</span></label>
                                <ErrorMessage name='firstname' component='span' className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="text" placeholder="First Name" name='firstname' className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm " />
                            <div className='flex justify-between w-full items-center'>
                                <label htmlFor="lastname" className="text-black text-sm font-semibold">Last Name <span className='text-red-600'>*</span></label>
                                <ErrorMessage name='lastname' component='span' className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="text" placeholder="Last Name" name='lastname' className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />
                            <div className='flex justify-between w-full items-center'>
                                <label htmlFor="email" className="text-black text-sm font-semibold">Email <span className='text-red-600'>*</span></label>
                                <ErrorMessage name='email' component='span' className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="email" placeholder="Email" name='email' className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />
                            <div className='flex justify-between w-full items-center'>
                                <label htmlFor="password" className="text-black text-sm font-semibold">Password <span className='text-red-600'>*</span></label>
                                <ErrorMessage name='password' component='span' className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="password" placeholder="Password" name='plainPassword' className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />
                            <div className='flex justify-between w-full items-center'>
                                <label htmlFor="confirmPassword" className="text-black text-sm font-semibold">Confirm Password <span className='text-red-600'>*</span></label>
                                <ErrorMessage name='confirmPassword' component='span' className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="password" placeholder="Confirm Password" name='confirmPassword' className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />
                            <label className="mt-2">
                                <Field type="checkbox" name="terms" className="mr-2 focus:outline-0 font-inter text-gray-600 placeholder:text-sm" />
                                <span className='text-black text-sm font-inter'>
                                    I have read and agree to the Terms and Conditions
                                </span>
                            </label>
                            <ErrorMessage name='terms' component='span' className="text-red-600 leading-3 text-sm" />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Button title={'Register'} isLoading={isRegisterLoading} classNames='mt-4 w-full' />
                                <p className='text-black text-center text-sm font-inter'>
                                    Already a member? <a href="/login" className="text-blue-500 hover:text-blue-700">Sign in</a>
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