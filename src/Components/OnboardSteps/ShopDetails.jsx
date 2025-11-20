

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAPI from "../../Hooks/useApi";
import { use } from "react";
import axios from "axios";
import { url } from "../../Address/baseURL";



function ShopDetails({ submit_shop,data }) {
  const handleSubmit = (values) => { submit_shop(values) }
  console.log(data);
  const [countNameLoad,setCountNameLoad] = useState(false)
  const [countEmailLoad,setCountEmailLoad] = useState(false)
  const [countPhoneLoad,setCountPhoneLoad] = useState(false)

  const params = useParams();
  const { response, callApi } = useAPI();
  const navigation = useNavigate();

  // const [resp,setRestp]=useState()
  const [isCalled, setCalled] = useState(false);
  const [nameCount,setNameCount] = useState(0)
  const [emailCount,setEmailCount] = useState(0)
  const [phoneCount,setPhoneCount] = useState(0)

  const initialValues = {
    sh_company_name: data?.sh_company_name || "",
    sh_address: data?.sh_address || "",
    sh_location: data?.sh_location || "",  
    sh_phone_no: data?.sh_phone_no ||  "",
    sh_email_id: data?.sh_email_id || "",
    sh_max_user: data?.sh_max_user || "",
    sh_contact_person: data?.sh_contact_person || "",
    sh_max_outlet: data?.sh_max_outlet || "",
    sh_sales_person: data?.sh_sales_person || "",
    sh_last_billing: data?.sh_last_billing || "",
  };
  useEffect(() => {}, []);
  const onSubmit = (values) => {
    setCalled(true);
    console.log(values);
    handleSubmit(values)
    // comp = localStorage.getItem("comp_id");
    // callApi("/admin/S_Admin/add_edit_shop", 1, {
    //   id: +params.id,
    //   company_name: values?.sh_company_name,
    //   address: values?.sh_address,
    //   location: values?.sh_location ? +values?.sh_location : 0, //ami korechhi besh korechhi
    //   contact_person: values?.sh_contact_person,
    //   phone_no: +values?.sh_phone_no,
    //   email_id: values?.sh_email_id,
    //   web_portal: 'Y',
    //   active_flag: values?.sh_active_flag,
    //   max_user: +values?.sh_max_user,
    //   user_id: userId,
    //   mode: 'N',
    // });
  };

  const validationSchema = Yup.object({
    sh_company_name: Yup.string().required("Shop Name is required."),
    sh_max_user: Yup.number().min(1).max(20).required("Max. user is required."),
    sh_max_outlet: Yup.number().min(1).max(20).required('Max. outlet is required.'),
    sh_sales_person: Yup.string().required("Sales person is required."),
    sh_contact_person: Yup.string().required("Contact person is required."),
    sh_last_billing: Yup.string().required("Last billing date is required."),
  });

  const [formValues, setValues] = useState(initialValues);
  console.log(formValues);
  const formik = useFormik({
    initialValues, 
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });
  return (
      <section class="bg-white dark:bg-gray-900">
        <div class="py-4 px-4 mx-auto max-w-2xl">
          {/* <h2 class="mb-4 text-xl font-bold text-blue-900 dark:text-white">
           New shop
          </h2> */}
          <form onSubmit={formik.handleSubmit}>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  for="sh_company_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="sh_company_name"
                  id="sh_company_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type shop name"
                  onChange={formik.handleChange}
                  onBlur={(e)=>{formik.handleBlur(e);
                    setCountNameLoad(true)
                   axios.post(url + "/admin/S_Admin/check_shop", {company_name: e.target.value}).then(res=>{console.log(res);
                    setCountNameLoad(false)
                    setNameCount(res?.data?.msg[0]?.cnt)
                   })
                  }}
                  value={formik.values.sh_company_name}
                  required=""
                />
                {formik.errors.sh_company_name &&
                  formik.touched.sh_company_name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_company_name}
                  </div>
                ) : null}
                {nameCount>0 && <div className="text-red-500 text-sm">
                    Shop name already exists!
                  </div>}
              </div>
           
              <div class="w-full">
                <label
                  for="sh_email_id"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="sh_email_id"
                  id="sh_email_id"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={(e)=>{formik.handleBlur(e);
                    setCountEmailLoad(true)
                   axios.post(url + "/admin/S_Admin/check_email", {company_email: e.target.value}).then(res=>{console.log(res);
                    setCountEmailLoad(false)
                    setEmailCount(res?.data?.msg[0]?.cnt)
                   })
                  }}
                  value={formik.values.sh_email_id}
                  placeholder="abc@gmail.com"
                  required=""
                />
                {formik.errors.sh_email_id && formik.touched.sh_email_id ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_email_id}
                  </div>
                ) : null}
                {emailCount>0 && <div className="text-red-500 text-sm">
                    Shop email already exists!
                  </div>}
              </div>

              <div class="w-full">
                <label
                  for="sh_phone_no"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="number"
                  name="sh_phone_no"
                  id="sh_phone_no"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                   onBlur={(e)=>{formik.handleBlur(e);
                    setCountPhoneLoad(true)
                   axios.post(url + "/admin/S_Admin/check_phone", {company_phone: e.target.value}).then(res=>{console.log(res);
                    setCountPhoneLoad(false)
                    setPhoneCount(res?.data?.msg[0]?.cnt)
                   })
                  }}
                  value={formik.values.sh_phone_no}
                  placeholder="98367XXXXX"
                  required=""
                />
                {formik.errors.sh_phone_no && formik.touched.sh_phone_no ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_phone_no}
                  </div>
                ) : null}
                 {phoneCount>0 && <div className="text-red-500 text-sm">
                    Shop phone already exists!
                  </div>}
              </div>
              <div class="w-full">
                <label
                  for="sh_max_user"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Max Users
                </label>
                <input
                  type="number"
                  name="sh_max_user"
                  id="sh_max_user"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sh_max_user}
                  placeholder="Max number of user"
                  required=""
                />
                {formik.errors.sh_max_user && formik.touched.sh_max_user ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_max_user}
                  </div>
                ) : null}
              </div>

              <div class="w-full">
                <label
                  for="sh_max_user"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Max Outlet
                </label>
                <input
                  type="number"
                  name="sh_max_outlet"
                  id="sh_max_outlet"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sh_max_outlet}
                  placeholder="Max number of outlet"
                  required=""
                />
                {formik.errors.sh_max_outlet && formik.touched.sh_max_outlet ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_max_outlet}
                  </div>
                ) : null}
              </div>
              <div class="w-full">
                <label
                  for="sh_sales_person"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sales Person
                </label>
                <input
                  type="text"
                  name="sh_sales_person"
                  id="sh_sales_person"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sh_sales_person}
                  placeholder="Sales Person"
                  required=""
                />
                {formik.errors.sh_sales_person && formik.touched.sh_sales_person ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_sales_person}
                  </div>
                ) : null}
              </div>
              <div class="w-full">
                <label
                  for="sh_contact_person"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="sh_contact_person"
                  id="sh_contact_person"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sh_contact_person}
                  placeholder="Contact Person"
                  required=""
                />
                {formik.errors.sh_contact_person &&
                  formik.touched.sh_contact_person ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_contact_person}
                  </div>
                ) : null}
              </div>

            
              <div class="w-full sm:col-span-2">
                <label
                  for="sh_last_billing"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Billing
                </label>
                <input
                  type="date"
                  name="sh_last_billing"
                  id="sh_last_billing"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sh_last_billing}
                  placeholder="Last Billing Date"
                  required=""
                />
                {formik.errors.sh_last_billing && formik.touched.sh_last_billing ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_last_billing}
                  </div>
                ) : null}
              </div>
              <div class="sm:col-span-2">
                <label
                  for="sh_address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <textarea
                  id="sh_address"
                  name="sh_address"
                  value={formik.values.sh_address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address here"
                />
                {formik.errors.sh_address && formik.touched.sh_address ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.sh_address}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button
                // onClick={() => handleSubmit()}
                disabled={nameCount>0 || emailCount>0 || phoneCount>0 || countNameLoad || countEmailLoad || countPhoneLoad}
                type="submit"
                className="disabled:bg-blue-100 inline-flex bg-blue-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Save & Next
              </button>
            </div>
          </form>

        </div>
      </section>
  );

}





export default ShopDetails