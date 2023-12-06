'use client'
import { Form, Formik, Field, FormikProvider, useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import user, { User } from '../User'
import { UserData } from '../utils/Types'
import Image from 'next/image'

export default function Register() {

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            }),
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            user.SignUp(values as UserData)
        }
    })

    return (
        <div className="w-full h-screen flex bg-[#EEF2FF]">
            <div className='m-auto w-full flex justify-center items-center p-10'>
                <div className="bg-white rounded p-4 max-w-[500px]">
                    <div className='flex flex-col gap-2 justify-center w-full items-center'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 0H29.224V2.0167H26.476V0H5.52398V2.0167H2.77566V0H0V32H2.77566V29.9833H5.52398V32H26.476V29.9833H29.224V32H32V0ZM5.52398 27.4696H2.77566V23.62H5.52398V27.4696ZM5.52398 21.1063H2.77566V17.2566H5.52398V21.1063ZM5.52398 14.743H2.77566V10.8933H5.52398V14.743ZM5.52398 8.38041H2.77566V4.52999H5.52398V8.38041ZM23.8651 29.9028H8.13487V17.052H23.8655L23.8651 29.9028ZM23.8651 14.9476H8.13487V2.09757H23.8655L23.8651 14.9476ZM29.224 27.4696H26.476V23.62H29.224V27.4696ZM29.224 21.1063H26.476V17.2566H29.224V21.1063ZM29.224 14.743H26.476V10.8933H29.224V14.743ZM29.224 8.38041H26.476V4.52999H29.224V8.38041Z" fill="#111111" />
                        </svg>
                        <h1 className="text-center text-black text-xxl font-bold">New to Odicylens ?</h1>
                    </div>
                    <FormikProvider value={formik}>
                        <Form id='register' className="flex flex-col p-8 gap-2">
                            <Field type="text" placeholder="First Name" name='firstName' className="border border-gray-400 rounded px-3 py-2 mt-2 placeholder-black text-black" />
                            <ErrorMessage name='firstName' component='span' className="text-red-600" />
                            <Field type="text" placeholder="Last Name" name='lastName' className="border border-gray-400 rounded px-3 py-2 mt-2 placeholder-black text-black" />
                            <ErrorMessage name='lastName' component='span' className="text-red-600" />
                            <Field type="email" placeholder="Email" name='email' className="border border-gray-400 rounded px-3 py-2 mt-2 placeholder-black text-black" />
                            <ErrorMessage name='email' component='span' className="text-red-600" />
                            <Field type="password" placeholder="Password" name='password' className="border border-gray-400 rounded px-3 py-2 mt-2 placeholder-black text-black" />
                            <ErrorMessage name='password' component='span' className="text-red-600" />
                            <Field type="password" placeholder="Confirm Password" name='confirmPassword' className="border border-gray-400 rounded px-3 py-2 mt-2 placeholder-black text-black" />
                            <ErrorMessage name='confirmPassword' component='span' className="text-red-600" />
                            <label className="mt-2">
                                <Field type="checkbox" name="terms" className="mr-2" />
                                <span className='text-black'>
                                    I have read and agree to the Terms and Conditions
                                </span>
                            </label>
                            <ErrorMessage name='terms' component='span' className="text-red-600" />
                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2">Register</button>
                            <p className='text-black text-center'>
                                Already a member? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
                            </p>
                        </Form>
                    </FormikProvider>
                </div>
                <Image className='object-contain' src='/imgs/auth-img.png' width={600} height={600} alt='dancing man'/>
            </div>
        </div>
    )
}