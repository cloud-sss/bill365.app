import React, { useEffect } from "react";
import { reportHeaders } from "../../../Assets/Data/TemplateConstants";
import { useLocation } from "react-router-dom";
import HeaderLayout from "../../../Components/HeaderLayout";
import DatatableAdv from "../../../Components/DatatableAdv";
import axios from "axios";
import { url } from "../../../Address/baseURL";
import { Message } from "../../../Components/Message";
import { use } from "react";
function RenewReport() {
  const[dataSet,setDataSet]=React.useState()
  const[dataSetCopy,setDataSetCopy]=React.useState()
  const[search,setSearch]=React.useState("")
  const[fromDt,setFromDt]=React.useState("")
  const[toDt,setToDt]=React.useState("")
   const onLoad = () => {
   axios
      .get(`${url}/admin/S_Admin/renewal_report`)
      .then((res) => {
        setDataSet(res?.data?.msg);
        setDataSetCopy(res?.data?.msg);
        console.log(res);
      })
      .catch((err) => {
        Message("error", err);
      });
    }
  useEffect(() => {
   onLoad();
  }, []);

   useEffect(() => {
      setDataSet(
        dataSetCopy?.filter(
          (e) =>
            e.company_name?.toLowerCase()
              .includes(search?.toString().toLowerCase()) ||
               e.sales_person?.toLowerCase()
              .includes(search?.toString().toLowerCase()) ||
               e.address?.toLowerCase()
              .includes(search?.toString().toLowerCase()) ||
            e.contact_person?.toLowerCase()
              .includes(search?.toString().toLowerCase()) ||
            e.phone_no?.toString()
              .toLowerCase()
              .includes(search?.toString().toLowerCase()) ||
            e.email_id?.toLowerCase().includes(search?.toString().toLowerCase())
        )
      );
    }, [search]);

    useEffect(() => {
      if(fromDt!="" && toDt!=""){
       setDataSet(
        dataSetCopy?.filter(
          (e) =>
            e.last_billing >= fromDt &&
            e.last_billing <= toDt
        )
       )
      }
    }, [fromDt,toDt]);
  return (
    <div className="py-1 w-full ">
      <HeaderLayout
        title={"Manage Shops"}
        btnText={"Add shop"}
      />
      <section class="dark:bg-gray-900 p-3 ">
        <div class="mx-auto w-full ">
          <div className="my-3 flex justify-end grid-cols-4 gap-4">
           <div className="w-full sm:col-span-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last Billing From
              </label>
              <input
                type="date"
                name="from_dt"
                id="from_dt"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={fromDt}
                onChange = {(e)=>setFromDt(e.target.value)}
                placeholder="Product brand"
                required=""
              />
             
            </div>
            <div className="w-full sm:col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Last Billing To
              </label>
              <input
                type="date"
                name="to_dt"
                id="to_dt"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                value={toDt}
                onChange={(e)=>setToDt(e.target.value)}
                required=""
              />
            
            </div>
          </div>
          <div class="bg-blue-900 dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
           
            <div class="overflow-x-auto">
              
              <DatatableAdv
                setSearch={(val) => setSearch(val)}
                title={"Renewal Report"}
                // btnText={"Add Shop"}
                // onclick={() => onPress({ id: 0 })}
                flag={1}
                headers={[
                  { name: "id", value: "#" },
                  { name: "company_name", value: "Store" },
                  { name: "phone_no", value: "Phone No." },
                  { name: "address", value: "Address" },
                  { name: "email_id", value: "Email" },
                  { name: "max_user", value: "Max User" },
                  { name: "max_outlet", value: "Max Outlet" },
                  { name: "last_billing", value: "Last Billing" },
                  { name: "next_bill_date", value: "Next Billing" },
                  { name: "sales_person", value: "Sales Person" },
                  { name: "contact_person", value: "Contact Person" },
                ]}
                data={dataSet}
              />
            </div>
          </div>
        </div>
      </section>
      {/*  */}
    </div>
  );
}

export default RenewReport