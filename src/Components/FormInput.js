import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { registerSchema } from "./../Schema/FormSchema";
import axios from "axios";

import {
  Button,
  Checkbox,
  Input,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Textarea,
} from "@mantine/core";

const FormInput = () => {
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  //   multiselect data
  const multiData = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];
   const doSomething = (value) => {
    // do something with my select value onChange
  };

/* 
  country validation 
  const { roles, token } = JSON.parse(localStorage.getItem("user"));
  const [companyStatusData, setCompanyStatusData] = useState("");
  const [companyStatus, setCompanyStatus] = useState([]);
  let companyStatusDropdown = [];
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=company-status&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setCompanyStatus(res.data.data);
        }
      });
  }, []);
  if (companyStatus) {
    companyStatusDropdown = companyStatus.map((type, index) => {
      return {
        label: type.name,
        value: type.id,
      };
    });
  }
  
  on change company status data get
  const CompanyStatusDataHandel = (e) => {
    setCompanyStatusData(e);
    setValue("companyStatus", e);
    if (e == "" || e == null) {
      setError(
        "companyStatus",
        yup.string().required("ChooseCompanyStatus").nullable()
      );
    } else {
      setError("companyStatus", null);
    }
  }; */
  //   yup validation
  const registerSchema = yup.object().shape({
    email: yup
      .string("email should be a string")
      .email("please provide a valid email address")
      .required("email address is required"),
      password: yup
      .string("password should be a string")
      .min(5, "password should have a minimum length of 5")
      .max(12, "password should have a maximum length of 12")
      .required("password is required"),
    confirmPassword: yup
      .string("password should be a string")
      .oneOf([yup.ref("password")])
      .required("confirm password is required"),
      companyStatus: yup.string().required("choice country").nullable(),
      select: yup.string().required(),
    remember: yup.boolean().oneOf([true], "Please tick checkbox"),
    accepts: yup.boolean().oneOf([true], "Please toggle accept"),
  });


  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });


  const formHandler = (data) => {
    console.log(data);
  };
// radio 

  return (
    <div className="m-5">
      <h1 className="text-center text-2xl font-semibold">Submit Form</h1>
      <form onSubmit={handleSubmit(formHandler)} className="bg-base-200 mt-14">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Name<span className="text-red-500 flex mt-1 ml-1">*</span>
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Input name="name" placeholder="Your Name" size="sm" />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Number
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <NumberInput
              name="number"
              placeholder="Your Number"
              radius="xs"
              withAsterisk
              hideControls
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Email
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Input
              {...register("email")}
              name="email"
              placeholder="Your email"
              radius="xs"
            />
            {errors.email ? (
              <span className="text-red-900">{errors.email.message}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Password
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <PasswordInput 
            {...register("password")}
            placeholder="Password" radius="xs" withAsterisk />
            {errors.password ? (
            <span className="text-red-900">{errors.password.message}</span>
          ) : (
            <></>
          )}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Confirm Password
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <PasswordInput 
            {...register("confirmPassword")}
            placeholder="Confirm Password" radius="xs" withAsterisk />
            {errors.confirmPassword ? (
            <span className="text-red-900">{errors.confirmPassword.message}</span>
          ) : (
            <></>
          )}
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Gander
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
          
          
        <div className="form-check">
          <label htmlFor="burger">
            <input
              {...register('food', { required: true })}
              type="radio"
              name="food"
              value="Burger"
              className="form-check-input"
              id="burger"
            />{' '}
            Burger
          </label>
        </div>
        <div className="form-check">
          <label htmlFor="fries">
            <input
              {...register('food', { required: true })}
              type="radio"
              name="food"
              value="Fries"
              className="form-check-input"
              id="fries"
            />
            French Fries
          </label>
        </div>
        <div className="text-danger mt-3">
          {errors.food?.type === 'required' &&
            'Tell us what is your favourite food.'}
        </div>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Address
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Textarea
              name="address"
              placeholder="Your Address"
              radius="xs"
              size="xs"
              withAsterisk
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Country
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
           {/*  <Select
            {...register("companyStatus")}
            searchable
            clearable
            allowDeselect
            nothingFound="No options"
            data={companyStatusDropdown}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            onChange={
              CompanyStatusDataHandel
            }
            value={companyStatusData}
          />
           
            {errors.companyStatus ? (
            <span className="text-red-900">{errors.companyStatus.message}</span>
          ) : (
            <></>
          )} */}

{/* <Select
          {...register("select")}
          onChange={(e) => doSomething(e.target.value)}
        
          
        />
        {errors.select && <p>{errors.select.message}</p>} */}

          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            City
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Select
              name="city"
              data={data}
              placeholder="Select city"
              nothingFound="Nothing found"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setData((current) => [...current, item]);
                return item;
              }}
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            MultiSelect
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <MultiSelect
              name="multiSelect"
              data={multiData}
              placeholder="Pick all that you like"
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Grouping Searchable
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Select
              name="grouping"
              searchable
              placeholder="Pick one"
              data={[
                { value: "rick", label: "Rick", group: "Used to be a pickle" },
                { value: "morty", label: "Morty", group: "Never was a pickle" },
                { value: "beth", label: "Beth", group: "Never was a pickle" },
                {
                  value: "summer",
                  label: "Summer",
                  group: "Never was a pickle",
                },
              ]}
            />
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Accepts & term
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Checkbox 
            {...register("accepts")}
            name="accepts" labelPosition="left" radius="xs" />
             {errors.accepts ? (
              <span className="text-red-900 text-center">{errors.accepts.message}</span>
            ) : (
              <></>
            )}
          </div>
          
        </div>
        

        
          <Button type="submit" className="bg-red-500" radius="xs">
            Submit
          </Button>
        
      </form>
    </div>
  );
};

export default FormInput;
