"use client";

import {
  Form,
  Field,
  FormikProvider,
  useFormik,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Ui/Button";
import {
  useLoginMutation,
} from "@/lib/services/auth";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";

function LoginForm() {
  const [login, { error, data, isError, isLoading }] = useLoginMutation();
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    remember: Yup.boolean().optional(),
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      login({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then(async (res) => {
          if (res.token) {
            setUserCookie(
              UserCookieType.SESSION,
              JSON.stringify({ token: res.token })
            );
            router.push("/dashboard");
          }
        })
        .catch((err) => {
          if (err.status === "FETCH_ERROR") {
            return toast.error(`API Error ${err.error}`);
          }
          toast.error("Invalid email or password");
        });
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form
        id="register"
        className="flex flex-col p-8 justify-center items-start gap-2"
      >
        <div className="w-full flex flex-col justify-center items-start">
          <label htmlFor="email" className="text-black text-sm font-semibold">
            Email <span className="text-red-600">*</span>
          </label>
          <Field
            type="email"
            placeholder="Email"
            name="email"
            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
          />
        </div>
        <ErrorMessage name="email" component="span" className="text-red-600" />
        <div className="w-full flex flex-col justify-center items-start">
          <label
            htmlFor="password"
            className="text-black text-sm font-semibold"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <Field
            type="password"
            placeholder="Password"
            name="password"
            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
          />
        </div>
        <ErrorMessage
          name="password"
          component="span"
          className="text-red-600"
        />
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <Field
            type="checkbox"
            name="terms"
            className="border border-gray-200 rounded placeholder-black text-black"
          />
          <label htmlFor="terms" className="text-black text-sm">
            Remember me
          </label>
          <ErrorMessage
            name="terms"
            component="span"
            className="text-red-600"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Button intent="default"  className="mt-4 w-full">
            Login
          </Button>
          <a href="/forget-password" className="text-sm text-main mt-2">
            Did you forget your password ?
          </a>
          <p className="text-center">
            <span className="text-sm text-black">
              You don&apos;t have an account ?
            </span>
            <a href="/register" className="text-sm text-main ml-2 ">
              Register
            </a>
          </p>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default LoginForm;
