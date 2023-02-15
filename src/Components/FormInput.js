import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as Yup from "yup";
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
  const [multiSelectedData, setMultiSelectedData] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [groupingValue, setGroupingValue] = useState("");

  const [data, setData] = useState([
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
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

  const schema = yup.object({
    userName: yup.string(),
    number: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(5).max(12),
    confirmPassword: yup.string().min(5).max(12),
    food: yup.mixed().oneOf(["Burger", "Fries"]),
    address: yup.string(),
    city: yup.string(),
    multiSelectValue: yup.array().of(yup.string()),
    grouping: yup.string(),
    accepts: yup.boolean(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    setValue("multiSelectValue", multiSelectedData);
    setValue("city", cityValue);
    setValue("grouping", groupingValue);
  }, [setValue, multiSelectedData, cityValue, groupingValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="m-5">
      <h1 className="text-center text-2xl font-semibold">Submit Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-base-200 mt-14">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
          <label
            htmlFor="first-name"
            className="inline-flex  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Name<span className="text-red-500 flex mt-1 ml-1">*</span>
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Input
              {...register("userName")}
              name="userName"
              placeholder="Your Name"
              size="sm"
            />
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
              {...register("number")}
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
              placeholder="Password"
              radius="xs"
              withAsterisk
            />
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
              placeholder="Confirm Password"
              radius="xs"
              withAsterisk
            />
            {errors.confirmPassword ? (
              <span className="text-red-900">
                {errors.confirmPassword.message}
              </span>
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
                  {...register("food")}
                  type="radio"
                  name="food"
                  value="Burger"
                  className="form-check-input"
                  id="burger"
                />{" "}
                Burger
              </label>
            </div>
            <div className="form-check">
              <label htmlFor="fries">
                <input
                  {...register("food")}
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
              {errors.food?.type === "required" &&
                "Tell us what is your favourite food."}
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
              {...register("address")}
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
            City
          </label>
          <div className="relative mt-1 sm:col-span-2 sm:mt-0">
            <Select
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
              {...register("city")}
              onChange={(e) => {
                setCityValue(e);
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
              data={multiData}
              {...register("multiSelectValue")}
              placeholder="Pick all that you like"
              onChange={(e) => setMultiSelectedData(e)}
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
              searchable
              placeholder="Pick one"
              data={[
                { value: "rick", label: "Rick", group: "Used to be a pickle" },
                { value: "morty", label: "Morty", group: "Never was a pickle" },
                { value: "beth", label: "Beth", group: "Never was a pickle" },
              ]}
              {...register("grouping")}
              onChange={(e) => {
                // console.log(e);
                setGroupingValue(e);
              }}
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
              name="accepts"
              labelPosition="left"
              radius="xs"
            />
            {errors.accepts ? (
              <span className="text-red-900 text-center">
                {errors.accepts.message}
              </span>
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
