import React, { useEffect, useState } from "react";
import DatatableAdv from "../../../Components/DatatableAdv";
import { useNavigate } from "react-router-dom";
import { Message } from "../../../Components/Message";
import useAPI from "../../../Hooks/useApi";
import HeaderLayout from "../../../Components/HeaderLayout";
import { Button, Radio } from 'antd';

function ManageShopsView() {
  const navigation = useNavigate();
  const [called, setCalled] = useState(false);
  const { response, callApi } = useAPI();
  const [resp, setRestp] = useState();
  const [isReport, setIsReport] = useState(false);
  const [dataSet, setDataSet] = useState();
  const [dataSetCopy, setDataSetCopy] = useState();
  const [search, setSearch] = useState();
  const [flag, setFlag] = useState('Y')
  var comp;

  useEffect(() => {
    console.log(response);
    setDataSet(response?.data?.msg.filter((e) => e.active_flag == flag));
    setDataSetCopy(response?.data?.msg);

    if (response?.data?.msg?.length <= 0) {
      Message("error", "No data!");
      setIsReport(false);
    } else {
      if (called) {
        setDataSet(response?.data?.msg);
        setDataSetCopy(response?.data?.msg);
        setIsReport(true);
        setCalled(false);
      }
    }
  }, [response]);



  useEffect(() => {
    if (dataSetCopy) {
      setDataSet(dataSetCopy?.filter((e) => e.active_flag == flag));
    }
    else {
      console.log("no dataSetCopy");
    }
  }, [flag]);

  useEffect(() => {
    // comp = localStorage.getItem("comp_id");
    callApi(`/admin/S_Admin/select_shop?id=${0}`, 0);
  }, []);

  const onPress = (data) => {
    console.log(data);
    navigation("/home/superadmin/manageshops/manageshop/" + data.id);
  };

  useEffect(() => {
    setDataSet(
      response?.data?.msg?.filter(
        (e) =>
          e.company_name
            .toLowerCase()
            .includes(search?.toString().toLowerCase()) ||
          e.phone_no
            ?.toString()
            .toLowerCase()
            .includes(search?.toString().toLowerCase()) ||
          e.email_id
            ?.toString()
            .toLowerCase()
            .includes(search?.toString().toLowerCase())
      )
    );
  }, [search]);
  return (
    <div className="py-1 w-full ">
      <HeaderLayout
        title={"Manage Shops"}
        btnText={"Add shop"}
        onPress={() => onPress({ id: 0 })}
      />
      <section class="dark:bg-gray-900 p-3 ">
        <div class="mx-auto w-full">
          <div className="my-3 flex justify-end">
          <div className="shadow-md p-2 bg-blue-100 rounded-full">
          <Radio.Group
            onChange={(e) => setFlag(e.target.value)}
            value={flag}
            options={[
              { value: 'Y', label: 'Active' },
              { value: 'N', label: 'Inactive' },

            ]}
          />
          </div>
          </div>
          <div class="bg-blue-900 dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <DatatableAdv
                onPress={(data) => onPress(data)}
                setSearch={(val) => setSearch(val)}
                title={"Manage Shops"}
                btnText={"Add Shop"}
                onclick={() => onPress({ id: 0 })}
                flag={1}
                headers={[
                  { name: "id", value: "#" },
                  { name: "company_name", value: "Store" },
                  { name: "phone_no", value: "Phone No." },
                  { name: "email_id", value: "Email" },
                  { name: "active_flag", value: "Active Flag" },
                  { name: "max_user", value: "Max User" },
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

export default ManageShopsView;
