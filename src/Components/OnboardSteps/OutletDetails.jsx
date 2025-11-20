
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAPI from "../../Hooks/useApi";
import { Message } from "../../Components/Message";
import axios from "axios";
import { url } from "../../Address/baseURL";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Alert } from "antd";

function OutletDetails({ submit_outlet, reset_outlet, limit ,data,shopData}) {
  const params = useParams();
  const { response, callApi } = useAPI();
  console.log(data,shopData)
  console.log("limit=", limit);
  const [countPhoneLoad, setCountPhoneLoad] = useState(false);
  const [phoneCount, setPhoneCount] = useState(0);
  const [countEmailLoad, setCountEmailLoad] = useState(false);
  const [emailCount, setEmailCount] = useState(0);
  const navigation = useNavigate();
  // const [resp,setRestp]=useState()
  const [isReport, setIsReport] = useState(false);
  const [isCalled, setCalled] = useState(false);
  const [dataSet, setDataSet] = useState();
  const [c_del, setDel] = useState("");
  const [c_bill, setBill] = useState("");
  const [outlets, setOutlets] = useState(() => data?.length>0 ? data:[ {
    br_id: 0,
    branch_name: shopData?.sh_company_name,
    branch_address: shopData?.sh_address,
    contact_person: shopData?.sh_contact_person,
    phone_no: shopData?.sh_phone_no,
    email_id: shopData?.sh_email_id,
    admin_flag:'N'
  }]);
  const [shops, setShops] = useState(() => []);
  const [locations, setLocations] = useState(() => []);
  console.log(outlets)
  const handleReset = () => {
    reset_outlet();
  };

  const handleSubmit = () => {
    if(outlets.filter(item=>item.branch_name.trim()==="").length==0 || outlets.filter(item=>item.phone_no.trim()==="").length==0){
    submit_outlet(outlets);
    }
    else{
      console.log('else')
      Message("error","Please fill all the required fields before proceeding.")
    }
  };

  useEffect(() => {
    if (params.id > 0)
      callApi(
        `/admin/S_Admin/select_one_outlet?comp_id=${params.id2}&br_id=${params.id}`,
        0
      );

    localStorage.setItem("compIdx", `${params.id2}`);
  }, [isCalled]);

  useEffect(() => {
    axios
      .get(`${url}/admin/S_Admin/select_location`)
      .then((res) => {
        setLocations(res?.data?.msg);
        console.log(res);
      })
      .catch((err) => {
        Message("error", err);
      });
  }, []);

  const handleDtChange = (index, event) => {
    let data = [...outlets];
    data[index][event.target.name] = event.target.value;
    setOutlets(data);
  }


  const initialValues = {
    br_id: 0,
    branch_name: "",
    branch_address: "",
    contact_person: "",
    phone_no: "",
    email_id: "",
    admin_flag:'N'
  };
  const addDt = () => {
    setOutlets([...outlets, initialValues]);
  };
  const removeDt = (index) => {
    let data = [...outlets];
    data.splice(index, 1);
    setOutlets(data);
  };
  const onSubmit = (values) => {
  console.log(outlets.filter(item=>item.branch_name.trim()==="").length)
  if(outlets.filter(item=>item.branch_name.trim()==="").length==0){
    setCalled(true);
    console.log(values);
    handleSubmit(values)
  }else{
    Message("error","Please fill all the outlet names before proceeding.")
  }
    // callApi("/admin/S_Admin/add_edit_outlet", 1, {


    //   br_id: +params.id,
    //   comp_id: +values?.o_comp_id,
    //   branch_name: values?.o_branch_name,
    //   branch_address: values?.o_branch_address,
    //   location: +values?.o_location,
    //   contact_person: values?.o_email_id,
    //   phone_no: +values?.o_phone_no,
    //   email_id: values?.o_email_id,
    //   created_by: userId,
    // });
  };

  const validationSchema = Yup.object({
    branch_name: Yup.string().required("Outlet name is required."),
  });

  const [formValues, setValues] = useState(initialValues);
  const formik = useFormik({
    initialValues: params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

  //   useEffect(() => {
  //     console.log(formik.values.u_comp_id);
  //     axios
  //       .get(
  //         `${url}/admin/S_Admin/select_outlet?comp_id=${
  //           formik.values.o_comp_id || 0
  //         }`
  //       )
  //       .then((res) => {
  //         setOutlets(res?.data?.msg);
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         Message("error", err);
  //       });
  //   }, [formik.values.o_comp_id]);

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-4 px-4 mx-auto max-w-2xl">
        {/* <h2 class="mb-4 text-xl font-bold text-blue-900 dark:text-white">
            {params.id == 0 ? "Add Outlet" : "Update outlet"}
          </h2> */}
          <Alert message={`A maximum of ${limit} outlet(s) can be added.`} type="warning" />
        <form onSubmit={formik.handleSubmit}>

          {/* {outlets.slice(0, limit).map((item, i) => ( */}
          {outlets.map((item, i) => (
           
           <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 flex justify-center items-center">
              <div className="col-span-2"></div>
              <div className="col-span-2 gap-4 flex justify-end items-center">
                {outlets.length<limit && <button className="rounded-full bg-blue-900 h-8 w-8 text-white" onClick={() => addDt()}><PlusOutlined /></button>}
                {outlets.length > 1 && <button className="rounded-full bg-white border-blue-900 border-2 h-8 w-8 text-blue-900" onClick={() => removeDt(i)}><MinusOutlined /></button>}
              </div>
              <div class="w-full sm:col-span-2">
                <label
                  for="branch_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Outlet Name
                </label>
                <input
                  type="text"
                  name="branch_name"
                  id="branch_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(event) => {
                    handleDtChange(i, event);
                  }}
                  value={item.branch_name}
                  placeholder="Enter Outlet Name"
                  required=""
                />
                {item?.branch_name?.trim()==="" && <p class="mt-2 text-sm text-red-600 dark:text-red-400">Outlet name is required.</p>}

              </div>
              <div class="sm:col-span-2">
                <label
                  for="branch_address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Outlet address
                </label>
                <textarea
                  id="branch_address"
                  name="branch_address"
                  value={item.branch_address}
                  onChange={(event) => {
                    handleDtChange(i, event);
                  }}

                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your outlet address here"
                />
              </div>

              <div class="w-full">
                <label
                  for="contact_person"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact_person"
                  id="contact_person"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(event) => {
                    handleDtChange(i, event);
                  }}
                  value={item.contact_person}
                  placeholder="Contact Person Name"
                  required=""
                />

              </div>
              <div class="w-full">
                <label
                  for="phone_no"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone_no"
                  id="phone_no"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(event) => {
                    handleDtChange(i, event);
                  }}
                  onBlur={(e)=>{console.log(e.target.value);
                  setCountPhoneLoad(true)
                  axios.post(url + "/admin/S_Admin/check_phone_cp", {company_phone: e.target.value}).then(res=>{console.log(res);
                    setCountPhoneLoad(false)
                    setPhoneCount(res?.data?.msg[0]?.cnt)
                   })
                  }}
                  value={item.phone_no}
                  placeholder="98500XXXXX"
                  required=""
                />
                {item?.phone_no==="" && <p class="mt-2 text-sm text-red-600 dark:text-red-400">Phone no. is required.</p>}
                {phoneCount>0 && <p class="mt-2 text-sm text-red-600 dark:text-red-400">Phone no. already exists!</p>}

              </div>
              {/* <div class="w-full">
                <label
                  for="email_id"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email_id"
                  id="email_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={(event) => {
                    handleDtChange(i, event);
                  }}
                  onBlur={(e)=>{console.log(e.target.value);
                  setCountEmailLoad(true)
                  axios.post(url + "/admin/S_Admin/check_email_cp", {company_email: e.target.value}).then(res=>{console.log(res);
                    setCountEmailLoad(false)
                    setEmailCount(res?.data?.msg[0]?.cnt)
                   })
                  }}
                  value={item.email_id}
                  placeholder="abc@def.com"
                  required=""
                />
                {emailCount>0 && <p class="mt-2 text-sm text-red-600 dark:text-red-400">Email already exists!</p>}

              </div> */}
            </div>
          ))}
            {/* {outlets.length>limit &&           <Alert className="my-4" message={`Mismatch in no. of outlets!`} type="error" />} */}
          
          <div className='flex justify-center gap-2 mx-auto items-center'>
            <button
              type="reset"
              onClick={() => handleReset()}
              className="inline-flex mr-3 bg-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-blue-900 border border-blue-900 bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Previous
            </button>

           <button
              onClick={() => handleSubmit()}
              type="submit"
              disabled={countPhoneLoad || phoneCount>0}
              className="disabled:bg-blue-100 inline-flex bg-blue-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Save & Next
            </button>

          </div>
        </form>
      </div>
    </section>

  )
}

export default OutletDetails