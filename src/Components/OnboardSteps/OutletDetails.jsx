
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAPI from "../../Hooks/useApi";
import { Message } from "../../Components/Message";
import { DurationMessage } from "../../Components/DurationMessage";
import axios from "axios";
import { url } from "../../Address/baseURL";
import { PlusOutlined,MinusOutlined } from '@ant-design/icons';

function OutletDetails({ submit_outlet, reset_outlet,limit }) {
    const params = useParams();
  const { response, callApi } = useAPI();
  const navigation = useNavigate();

  // const [resp,setRestp]=useState()
  const [isReport, setIsReport] = useState(false);
  const [isCalled, setCalled] = useState(false);
  const [dataSet, setDataSet] = useState();
  const [c_del, setDel] = useState("");
  const [c_bill, setBill] = useState("");
  const [outlets, setOutlets] = useState(() => [{
    br_id:0,
    branch_name: "",
    branch_address: "",
    contact_person: "",
    phone_no: "",
    email_id: "",
  }]);
  const [shops, setShops] = useState(() => []);
  const [locations, setLocations] = useState(() => []);
  
  const handleReset = () => {
    reset_outlet();
  };

    const handleSubmit = () => {
        submit_outlet(outlets);
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

const handleDtChange=(index,event)=>{
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
    setCalled(true);
    console.log(values);
    handleSubmit(values)
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
          <form onSubmit={formik.handleSubmit}>

            {outlets.map((item, i) => (
              
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 flex justify-center items-center">
             <div className="col-span-2"></div>
             <div className="col-span-2 gap-4 flex justify-end items-center">
               <button className="rounded-full bg-blue-900 h-8 w-8 text-white" onClick={()=>addDt()}><PlusOutlined /></button>
                {outlets.length>1 &&<button className="rounded-full bg-white border-blue-900 border-2 h-8 w-8 text-blue-900" onClick={()=>removeDt(i)}><MinusOutlined /></button>}
                {/* <button><SubtractsOneOutlined/></button> */}
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
            
              <div class="w-full sm:col-span-2">
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
                  value={item.phone_no}
                  placeholder="98500XXXXX"
                  required=""
                />
               
              </div>
              <div class="w-full">
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
                  value={item.email_id}
                  placeholder="abc@def.com"
                  required=""
                />
              
              </div>
        </div>
))}

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
                className="inline-flex bg-blue-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Next
            </button>
            </div>
        </form>
        </div>
      </section>
    
    )
}

export default OutletDetails