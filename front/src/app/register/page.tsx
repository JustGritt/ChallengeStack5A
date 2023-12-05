'use client'
import { Form, Formik, Field, FormikProvider, useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import user, { User } from '../User'
import { UserData } from '../utils/Types'

export default function Register() {

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            })
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            user.SignUp(values as UserData)
        }
    })

    return (
        <div className="w-full h-screen flex">
            <div className="bg-white rounded m-auto p-4">
                <h1 className="text-center text-black text-xxl font-bold">Register</h1>
                <FormikProvider value={formik}>
                    <Form id='register' className="flex flex-col p-8">
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
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded mt-2">Register</button>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    )
}