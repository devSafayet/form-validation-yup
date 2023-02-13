import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
// import {useTranslation} from "react-i18next";
// import {
//     HiOutlineExclamation,
//     HiOutlineUser,
//     HiChevronLeft,HiArrowCircleRight
// } from "react-icons/hi";

// import {FiSave, FiX} from "react-icons/fi";

// import {AiOutlineLoading3Quarters, AiOutlineMinus} from "react-icons/ai";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
// import toast, {Toaster} from "react-hot-toast";
import {
  ScrollArea,
  Select,
  MultiSelect,
  Stepper,
  Button,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useLocation } from "react-router";

function Modal() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const [candidateId, setCandidateId] = useState(null);

  const navigate = useNavigate();
  const { roles, token } = JSON.parse(localStorage.getItem("user"));
  // const {t, i18n} = useTranslation();
  const fullFormHeight = localStorage.getItem("fullFormHeight");

  //Submit Spinner Init
  const [spinner, setSpinner] = useState(false);

  // start get gender dropdown
  const [genderData, setGenderData] = useState("");
  const [genders, setGenders] = useState([]);
  let genderDropdown = [];
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=gender&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setGenders(res.data.data);
        }
      });
  }, []);

  if (genders) {
    genderDropdown = genders.map((type, index) => {
      return {
        label: type.name,
        value: type.id,
      };
    });
  }

  // on change gender data get
  const GenderDataHandel = (e) => {
    setGenderData(e);
    setValue("gender", e);
    if (e == "" || e == null) {
      setError("gender", Yup.string().required("ChooseGender").nullable());
    } else {
      setError("gender", null);
    }
  };
  // End get gender dropdown

  // start get country dropdown
  const [countryData, setCountryData] = useState("");
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}/countries/dropdown`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCountries(res.data.data);
      });
  }, []);

  let countryDropdown = countries.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change country data get
  const [stateData, setStateData] = useState("");
  const [states, setStates] = useState([]);
  const [cityData, setCityData] = useState("");
  const [cities, setCities] = useState([]);
  const CountryDataHandel = (e) => {
    setCountryData(e);
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/countries/wise/state/dropdown?country_id=${e}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setStates(res.data.data);
        }
      });

    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/countries/wise/city/dropdown?country_id=${e}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setCities(res.data.data);
        }
      });
    setValue("country", e);
    if (e == "" || e == null) {
      setError("country", Yup.string().required("ChooseCountry").nullable());
    } else {
      setError("country", null);
    }
  };
  let stateDropdown = states.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change state data get
  const StateDataHandel = (e) => {
    setStateData(e);
    setValue("state", e);
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/countries/state/wise/city/dropdown?state_id=${e}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setCities(res.data.data);
        }
      });
    console.log(setStateData);
  };
  let cityDropdown = cities.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  //city data handel
  const CityDataHandel = (e) => {
    setCityData(e);
    setValue("city", e);
    if (e == "" || e == null) {
      setError("city", Yup.string().required("ChooseCity").nullable());
    } else {
      setError("city", null);
    }
  };
  // End get country dropdown

  // start get highest education dropdown
  const [highestEducationData, setHighestEducationData] = useState("");
  const [highestEducation, setHighestEducation] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=highest-education&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setHighestEducation(res.data.data);
        }
      });
  }, []);

  let highestEducationDropdown = highestEducation.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change gender data get
  const HighestEducationDataHandel = (e) => {
    setHighestEducationData(e);
    setValue("highest_education", e);
    if (e == "" || e == null) {
      setError(
        "highest_education",
        Yup.string().required("ChooseHighestEducation").nullable()
      );
    } else {
      setError("highest_education", null);
    }
  };
  // End get highest education dropdown

  // start get highest education dropdown
  const [immigrationStatusData, setImmigrationStatusData] = useState("");
  const [immigrationStatus, setImmigrationStatus] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=immigration-status&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setImmigrationStatus(res.data.data);
        }
      });
  }, []);

  let immigrationStatusDropdown = immigrationStatus.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change gender data get
  const ImmigrationStatusDataHandel = (e) => {
    setImmigrationStatusData(e);
    setValue("immigration_status", e);
    if (e == "" || e == null) {
      setError(
        "immigration_status",
        Yup.string().required("ChooseImmigrationStatus").nullable()
      );
    } else {
      setError("immigration_status", null);
    }
  };
  // End get highest education dropdown

  // start get employee status dropdown
  const [employeeStatusData, setEmployeeStatusData] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=employee-status&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setEmployeeStatus(res.data.data);
        }
      });
  }, []);

  let employeeStatusDropdown = employeeStatus.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change gender data get
  const EmployeeStatusDataHandel = (e) => {
    setEmployeeStatusData(e);
    setValue("employee_status", e);
    if (e == "" || e == null) {
      setError(
        "employee_status",
        Yup.string().required("ChooseEmployeeStatus").nullable()
      );
    } else {
      setError("employee_status", null);
    }
  };
  // End get employee status dropdown

  // start get source dropdown
  const [sourceData, setSourceData] = useState("");
  const [sources, setSource] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=source&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setSource(res.data.data);
        }
      });
  }, []);

  let sourcesDropdown = sources.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });

  // on change gender data get
  const SourceDataHandel = (e) => {
    setSourceData(e);
    setValue("source", e);
  };
  // End get source dropdown

  // start get source dropdown
  const [languageData, setLanguageData] = useState([]);
  const [languages, setLanguage] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=language`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setLanguage(res.data.data);
        }
      });
  }, []);

  let languageDropdown = languages.map((type, index) => {
    return {
      label: type.name,
      value: type.id,
    };
  });
  // language data control

  const LanguageDataHandel = (e) => {
    setLanguageData(e);
    setValue("language", e);
  };

  // End get source dropdown

  // start get work shift dropdown
  const [workShiftData, setWorkShiftData] = useState([]);
  const [workShift, setWorkShift] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_URL}/master-data/dropdown?slug=work-shifts&type=normal`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status === 200) {
          setWorkShift(res.data.data);
        }
      });
  }, []);
  const WorkShiftDataHandel = (e, label) => {
    if (e.target.checked === true) {
      setWorkShiftData({ ...workShiftData, [e.target.value]: label });
      // setValue('work_shift',e)
      setError("work_shift", null);
    } else {
      delete workShiftData[e.target.value];
      console.log(Object.values(workShiftData).length);
      if (Object.values(workShiftData).length === 0) {
        setValue("work_shift", []);
        // setError("work_shift", Yup.array().required(t("ShiftAbleToWorkValidation")).nullable());
        setError(
          "work_shift",
          Yup.array().required("ShiftAbleToWorkValidation").nullable()
        );
      }
    }
  };
  // End get work shift dropdown

  //Form validation
  const validationSchemaStepOne = Yup.object().shape({
    first_name: Yup.string().required("EnterFirstName"),
    last_name: Yup.string().required("EnterLastName"),
    email: Yup.string().email("EnterValidEmail").required("EnterEmail"),
    phone: Yup.string().required("EnterMobileNumber"),
    date_of_birth: Yup.string().required("ChooseDate"),
    gender: Yup.string().required("ChooseGender").nullable(),
    emergency_contact: Yup.string().required("EnterEmergencyContact"),
    highest_education: Yup.string()
      .required("ChooseHighestEducation")
      .nullable(),
    immigration_status: Yup.string()
      .required("ChooseImmigrationStatus")
      .nullable(),
    cert_license: Yup.string().required("EnterCertLicense"),
    employee_status: Yup.string().required("ChooseEmployeeStatus").nullable(),
    country: Yup.string().required("ChooseCountry").nullable(),
    city: Yup.string().required("ChooseCity").nullable(),
  });

  let formOptions = { resolver: yupResolver(validationSchemaStepOne) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, setValue, setError } =
    useForm(formOptions);
  const { errors } = formState;

  //Form Data Submit
  function formSubmit(data) {
    data["united_citizen"] = data.united_citizen === "Yes";
    data["did_you_graduate"] = data.did_you_graduate === "Yes";
    data["have_convicted_felony"] = data.have_convicted_felony === "Yes";
    data["previous_work_this_company"] =
      data.previous_work_this_company === "Yes";
    data["work_shift"] = workShiftData;

    setSpinner(true);
    // console.log(data)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_GATEWAY_URL}/users/register-candidate`,
      headers: {
        Accept: `application/json`,
        "Content-Type": `application/json`,
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((res) => {
        if (res.status === 201) {
          setCandidateId(res.data.candidate_id);
          navigate("/candidate/" + res.data.candidate_id + "/edit", {
            state: {
              type: "create",
            },
          });
          nextStep();
        } else {
          showNotification({
            id: "load-data",
            loading: true,
            title: "Error",
            message: res.data.message,
            autoClose: 1000,
            disallowClose: true,
            color: "red",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setSpinner(false);
      });
  }

  return (
    <>
      <main className="w-full">
        <div className="w-full flex pl-4 h-12 bg-indigo-100 justify-start text-gray-600 mb-3">
          <div className={"flex-1"}>
            <div className="flex text-gray-800 h-full  tracking-normal leading-tight ">
              <span
                className={
                  "mt-2 font-lg font-bold clear-both relative text-indigo-500 w-full"
                }
              >
                {"Candidate"}
                <sub
                  className={
                    "font-normal absolute left-0 top-6 text-indigo-400"
                  }
                >
                  {"AllCandidateRelatedInformationCanBeFoundHere"}
                </sub>
              </span>
            </div>
          </div>
          <div className={"right flex mr-8"}>
            <div className="flex items-center justify-center">
              <div className="inline-flex border-1 border-red-300" role="group">
                <button
                  onClick={() => navigate(-1)}
                  // className="inline-flex items-center px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs"
                  className="inline-flex items-center ml-6 rounded border-none bg-indigo-800 py-2 px-4 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-full w-full">
          <div className="flex w-full md:w-auto">
            <div className="flex-1">
              <div className="min-w-0 flex-1 bg-white xl:flex">
                <div className="bg-white lg:min-w-0 lg:flex-1">
                  <div className="h-full px-4 rounded sm:px-6 lg:px-4">
                    <div className="relative">
                      <div className={"flex flex-1 overflow-hidden w-full"}>
                        <div className="w-full mr-0 mx-auto border">
                          <form
                            onSubmit={handleSubmit(formSubmit)}
                            id="horizontal-form"
                          >
                            <ScrollArea
                              style={{ height: fullFormHeight }}
                              scrollbarSize={4}
                            >
                              <div className="py-3 pl-3 pr-3 relative flex flex-col min-w-0 break-words w-full border-0 bg-gray-200 ">
                                <Stepper
                                  active={active}
                                  onStepClick={setActive}
                                  breakpoint="sm"
                                  color="green"
                                  size="md"
                                >
                                  <Stepper.Step
                                    label={"BasicInformation"}
                                    description={"BasicDetails"}
                                  >
                                    <div className="md:grid md:grid-cols-5 md:gap-6 mt-2 mr-6">
                                      <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0 ml-3">
                                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {"BasicInformation"}
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-600">
                                            {"BasicDetails"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-5 md:col-span-4 md:mt-0">
                                        <div className="shadow sm:overflow-hidden sm:rounded">
                                          <div className="space-y-1 bg-gray-50 px-4 py-5 sm:p-6">
                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="last_name"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"LastName"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.last_name?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.last_name
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register("last_name")}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.last_name
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    id="lastName"
                                                    placeholder={
                                                      "EnterLastName"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="middle_name"
                                                  className="form-input-sm-label"
                                                >
                                                  {"MiddleName"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  <input
                                                    {...register("middle_name")}
                                                    type="text"
                                                    className={`form-input-sm-control`}
                                                    id="middleName"
                                                    placeholder={
                                                      "EnterMiddleName"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="first_name"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"FirstName"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.first_name?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.first_name
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register("first_name")}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.first_name
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    id="firstName"
                                                    placeholder={
                                                      "EnterFirstName"
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="email"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"Email"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.email?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.email?.message}
                                                    </div>
                                                  )}

                                                  {errors.email?.type ===
                                                    "email" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.email?.message}
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register("email")}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.email
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    name="email"
                                                    id="email"
                                                    placeholder={"EnterEmail"}
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="phone"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"Phone"}
                                                </label>
                                                <div className="relative mr-3 mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.phone?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.phone?.message}
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register("phone")}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.phone
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    name="phone"
                                                    id="phone"
                                                    placeholder={
                                                      "EnterPhoneNumber"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="employee_status"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"CandidateStatus"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.employee_status
                                                    ?.type === "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.employee_status
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register(
                                                      "employee_status"
                                                    )}
                                                    placeholder={
                                                      "ChooseEmployeeStatus"
                                                    }
                                                    className={`${
                                                      errors.employee_status
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={
                                                      employeeStatusDropdown
                                                    }
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={
                                                      EmployeeStatusDataHandel
                                                    }
                                                    value={employeeStatusData}
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              {/*<div className="mb-3 w-1/3 items-center">
                                <label htmlFor="date_of_birth" className="form-input-sm-label-required">{t('date_of_birth')}</label>
                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                    {errors.date_of_birth?.type === 'required' &&
                                    <div className="form-input-sm-error">
                                        <HiOutlineExclamation size={16} className={'mr-2'}></HiOutlineExclamation> {errors.date_of_birth?.message}
                                    </div>}
                                    <input
                                        {...register("date_of_birth")}
                                        type="date"
                                        className={`form-input-sm-control ${errors.date_of_birth ? 'border-red-300 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'} `}
                                        name="date_of_birth"
                                        id="date_of_birth"
                                    />
                                </div>
                            </div>

                            <div className="mb-3 w-1/3 items-center">
                                <label htmlFor="employee_id" className="form-input-sm-label">{t('employee_id')}</label>
                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                    <input
                                        {...register("employee_id")}
                                        type="text"
                                        className={`form-input-sm-control`}
                                        name="employee_id"
                                        id="employee_id"
                                        placeholder={t("enter_employee_id")}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 w-1/3 items-center">
                                <label htmlFor="gender" className="form-input-sm-label-required">{t('gender')}</label>
                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">

                                    {errors.gender?.type === 'required' &&
                                    <div className="form-input-sm-error">
                                        <HiOutlineExclamation size={16} className={'mr-2'}></HiOutlineExclamation> {errors.gender?.message}
                                    </div>}

                                    <Select
                                        {...register("gender")}
                                        className={`${errors.gender ? 'border-red-300 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'} `}
                                        placeholder={t('ChooseGender')}
                                        searchable clearable
                                        allowDeselect
                                        nothingFound="No options"
                                        data={genderDropdown}
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        onChange={GenderDataHandel}
                                        value={genderData}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap -mx-0.5 mb-2 col-span-2'>
                            <div className="mb-3 w-1/3 items-center">
                                <label htmlFor="emergency_contact" className="form-input-sm-label-required">{t('EmergencyContact')}</label>
                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                    {errors.emergency_contact?.type === 'required' &&
                                    <div className="form-input-sm-error">
                                        <HiOutlineExclamation size={16} className={'mr-2'}></HiOutlineExclamation> {errors.emergency_contact?.message}
                                    </div>}

                                    <input
                                        {...register("emergency_contact")}
                                        type="text"
                                        className={`form-input-sm-control ${errors.emergency_contact ? 'border-red-300 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'} `}
                                        name="emergency_contact"
                                        id="emergency_contact"
                                        placeholder={t("EnterEmergencyContact")}
                                    />
                                </div>
                            </div>



                        </div>


                        <div className='flex flex-wrap -mx-0.5 mb-2 col-span-2'>
                            <div className="mb-3 w-1/3 items-center">
                                <label htmlFor="immigration_status" className="form-input-sm-label-required">{t('ImmigrationStatus')}</label>
                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">

                                    {errors.immigration_status?.type === 'required' &&
                                    <div className="form-input-sm-error">
                                        <HiOutlineExclamation size={16} className={'mr-2'}></HiOutlineExclamation> {errors.immigration_status?.message}
                                    </div>}

                                    <Select
                                        {...register("immigration_status")}
                                        className={`${errors.immigration_status ? 'border-red-300 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'} `}
                                        placeholder={t('ChooseImmigrationStatus')}
                                        searchable clearable
                                        allowDeselect
                                        nothingFound="No options"
                                        data={immigrationStatusDropdown}
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        onChange={ImmigrationStatusDataHandel}
                                        value={immigrationStatusData}
                                    />
                                </div>
                            </div>


                            <div className="mb-3 w-1/3 items-center">
                                <label htmlFor="cert_license" className="form-input-sm-label-required">{t('CertLicense')}</label>
                                <div className="relative mr-3 mt-1 sm:col-span-2 sm:mt-0">

                                    {errors.cert_license?.type === 'required' &&
                                    <div className="form-input-sm-error">
                                        <HiOutlineExclamation size={16} className={'mr-2'}></HiOutlineExclamation> {errors.cert_license?.message}
                                    </div>}

                                    <input
                                        {...register("cert_license")}
                                        type="text"
                                        className={`form-input-sm-control ${errors.cert_license ? 'border-red-300 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'} `}
                                        name="cert_license"
                                        id="cert_license"
                                        placeholder={t("EnterCertLicense")}
                                    />
                                </div>
                            </div>*/}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="md:grid md:grid-cols-5 md:gap-6 mt-2 mr-6">
                                      <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0 ml-3">
                                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {"OtherInformation"}
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-600">
                                            {"OtherDetails"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-5 md:col-span-4 md:mt-0">
                                        <div className="shadow sm:overflow-hidden sm:rounded">
                                          <div className="space-y-1 bg-gray-50 px-4 py-5 sm:p-6">
                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="gender"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"gender"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.gender?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.gender?.message}
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register("gender")}
                                                    className={`${
                                                      errors.gender
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    placeholder={"ChooseGender"}
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={genderDropdown}
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={GenderDataHandel}
                                                    value={genderData}
                                                  />
                                                </div>
                                              </div>
                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="date_of_birth"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"date_of_birth"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.date_of_birth
                                                    ?.type === "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.date_of_birth
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}
                                                  <input
                                                    {...register(
                                                      "date_of_birth"
                                                    )}
                                                    type="date"
                                                    className={`form-input-sm-control ${
                                                      errors.date_of_birth
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    name="date_of_birth"
                                                    id="date_of_birth"
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="emergency_contact"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"EmergencyContact"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.emergency_contact
                                                    ?.type === "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.emergency_contact
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register(
                                                      "emergency_contact"
                                                    )}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.emergency_contact
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    name="emergency_contact"
                                                    id="emergency_contact"
                                                    placeholder={
                                                      "EnterEmergencyContact"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-full items-center">
                                                <label
                                                  htmlFor="language"
                                                  className="form-input-sm-label"
                                                >
                                                  {"Language"}
                                                </label>
                                                <MultiSelect
                                                  {...register("language")}
                                                  placeholder={"ChooseLanguage"}
                                                  searchable
                                                  clearable
                                                  nothingFound="No options"
                                                  data={languageDropdown}
                                                  transition="pop-top-left"
                                                  transitionDuration={80}
                                                  transitionTimingFunction="ease"
                                                  onChange={LanguageDataHandel}
                                                  value={languageData}
                                                />
                                              </div>
                                            </div>

                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="highest_education"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"HighestEducation"}
                                                </label>
                                                <div className="relative mr-3 mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.highest_education
                                                    ?.type === "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.highest_education
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register(
                                                      "highest_education"
                                                    )}
                                                    className={`${
                                                      errors.highest_education
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    placeholder={
                                                      "ChooseHighestEducation"
                                                    }
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={
                                                      highestEducationDropdown
                                                    }
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={
                                                      HighestEducationDataHandel
                                                    }
                                                    value={highestEducationData}
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="immigration_status"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"ImmigrationStatus"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.immigration_status
                                                    ?.type === "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors
                                                          .immigration_status
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register(
                                                      "immigration_status"
                                                    )}
                                                    className={`${
                                                      errors.immigration_status
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    placeholder={
                                                      "ChooseImmigrationStatus"
                                                    }
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={
                                                      immigrationStatusDropdown
                                                    }
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={
                                                      ImmigrationStatusDataHandel
                                                    }
                                                    value={
                                                      immigrationStatusData
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="cert_license"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"CertLicense"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.cert_license?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {
                                                        errors.cert_license
                                                          ?.message
                                                      }
                                                    </div>
                                                  )}

                                                  <input
                                                    {...register(
                                                      "cert_license"
                                                    )}
                                                    type="text"
                                                    className={`form-input-sm-control ${
                                                      errors.cert_license
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    name="cert_license"
                                                    id="cert_license"
                                                    placeholder={
                                                      "EnterCertLicense"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="linkedin"
                                                  className="form-input-sm-label"
                                                >
                                                  {"Linkedin"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  <input
                                                    {...register("linkedin")}
                                                    className={`form-input-sm-control`}
                                                    name="linkedin"
                                                    placeholder={
                                                      "EnterLinkedin"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="employee_id"
                                                  className="form-input-sm-label"
                                                >
                                                  {"candidateID"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  <input
                                                    {...register("employee_id")}
                                                    type="text"
                                                    className={`form-input-sm-control`}
                                                    name="employee_id"
                                                    id="employee_id"
                                                    placeholder={
                                                      "EnterCandidateID"
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="md:grid md:grid-cols-5 md:gap-6 mt-2 mr-6">
                                      <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0 ml-3">
                                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {"LocationInformation"}
                                          </h3>
                                          <p className="mt-1 text-sm text-gray-600">
                                            {"LocationDetails"}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="mt-5 md:col-span-4 md:mt-0">
                                        <div className="shadow sm:overflow-hidden sm:rounded">
                                          <div className="space-y-1 bg-gray-50 px-4 py-5 sm:p-6">
                                            <div className="flex flex-wrap -mx-0.5 mb-2 col-span-2">
                                              <div className=" w-full items-center">
                                                <label
                                                  htmlFor="street_address"
                                                  className="form-input-sm-label"
                                                >
                                                  {"StreetAddress"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  <textarea
                                                    {...register(
                                                      "street_address"
                                                    )}
                                                    className={`form-input-sm-control`}
                                                    name="street_address"
                                                    placeholder={
                                                      "EnterStreetAddress"
                                                    }
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="country"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"Country"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  {errors.country?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.country?.message}
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register("country")}
                                                    placeholder={
                                                      "ChooseCountry"
                                                    }
                                                    className={`${
                                                      errors.country
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={countryDropdown}
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={CountryDataHandel}
                                                    value={countryData}
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="state"
                                                  className="form-input-sm-label"
                                                >
                                                  {"State"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  <Select
                                                    {...register("state")}
                                                    placeholder={"ChooseState"}
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={stateDropdown}
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={StateDataHandel}
                                                    value={stateData}
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="city"
                                                  className="form-input-sm-label-required"
                                                >
                                                  {"City"}
                                                </label>
                                                <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                                  {errors.city?.type ===
                                                    "required" && (
                                                    <div className="form-input-sm-error">
                                                      {errors.city?.message}
                                                    </div>
                                                  )}

                                                  <Select
                                                    {...register("city")}
                                                    placeholder={"ChooseCity"}
                                                    className={`${
                                                      errors.city
                                                        ? "border-red-300 focus:border-red-600"
                                                        : "border-gray-300 focus:border-blue-600"
                                                    } `}
                                                    searchable
                                                    clearable
                                                    allowDeselect
                                                    nothingFound="No options"
                                                    data={cityDropdown}
                                                    transition="pop-top-left"
                                                    transitionDuration={80}
                                                    transitionTimingFunction="ease"
                                                    onChange={CityDataHandel}
                                                    value={cityData}
                                                  />
                                                </div>
                                              </div>

                                              <div className=" w-1/3 items-center">
                                                <label
                                                  htmlFor="zip"
                                                  className="form-input-sm-label"
                                                >
                                                  {"Zip"}
                                                </label>
                                                <div className="relative mt-1 mr-3 sm:col-span-2 sm:mt-0">
                                                  <input
                                                    {...register("zip")}
                                                    type="text"
                                                    className={`form-input-sm-control `}
                                                    name="zip"
                                                    id="zip"
                                                    placeholder={"EnterZip"}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Stepper.Step>
                                </Stepper>
                              </div>
                            </ScrollArea>
                            <footer className="relative mt-1 border-t">
                              <div className="mr-3">
                                <div className="text-right pt-0.5 mb-0.5 ">
                                  <button
                                    type="reset"
                                    className={
                                      "px-6 py-2 text-gray-400 inline-flex transition duration-150 ease-in-ou ml-3 bg-gray-25 hover:bg-gray-50 items-center  text-sm"
                                    }
                                  >
                                    <span>{"Cancel"}</span>
                                  </button>

                                  <button
                                    type="submit"
                                    className="px-6 py-2 text-white inline-flex focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 items-center border  rounded text-sm"
                                  >
                                    <span>{"Next"}</span>
                                  </button>
                                </div>
                              </div>
                            </footer>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Modal;
