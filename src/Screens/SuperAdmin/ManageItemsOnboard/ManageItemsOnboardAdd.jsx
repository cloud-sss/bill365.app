import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import useAPI from "../../../Hooks/useApi";
import { Message } from "@mui/icons-material";
import axios from "axios";
import { DurationMessage } from "../../../Components/DurationMessage";
import { useNavigate } from "react-router-dom";
import Backbtn from "../../../Components/Backbtn";
import { url } from "../../../Address/baseURL";
import { OverlayPanel } from "primereact/overlaypanel";
import { LoadingOutlined } from "@ant-design/icons";
import { use } from "react";


function ManageItemsOnboardAdd() {
    const params = useParams();
    const [shopID, setShopID] = useState(0)
    const { response, callApi } = useAPI();
    const navigation = useNavigate();
    const [typing, setTyping] = useState(false)
    const op = useRef(null);
    const [loading,setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [shops, setShops] = useState([])
    // const [resp,setRestp]=useState()
    const [isReport, setIsReport] = useState(false);
    const [isCalled, setCalled] = useState(false);
    const [dataSet, setDataSet] = useState();
    const [outlets, setOutlets] = useState(() => []);
    const [category, setCat] = useState();
    const [discount_flag,setDiscountFlag] = useState(false)
    var comp, userId;

    useEffect(() => {
        axios
            .post(url + "/admin/outlet_list", {
                comp_id: +localStorage.getItem("comp_id"),
            })
            .then((resp) => {
                console.log(resp);
                setOutlets(resp?.data?.msg);
            });
    }, []);

    useEffect(() => {
        axios
            .post(url + "/admin/unit_list", {
                comp_id: +localStorage.getItem("comp_id"),
            })
            .then((resp) => {
                console.log(resp);
                setDataSet(resp?.data?.msg);
            });
       
    }, []);
    useEffect(() => {
         axios
            .post(url + "/admin/category_list", {
                comp_id: +shopID,
            })
            .then((resp) => {
                console.log(resp);
                setCat(resp?.data?.msg);
            });
    }, [shopID]);
       useEffect(() => {
        if (search.length > 2) {
            axios.post(url + '/admin/S_Admin/search_shop', { company_name: search }).then(res => {
                setShops(res?.data?.msg)
                console.log(res)
            }).catch(err => { })

        }
       

    }, [search])
    useEffect(() => {
        console.log(params);
        comp = localStorage.getItem("comp_id");
        if (params.id > 0)
            callApi("/admin/item_details", 1, { item_id: +params.id });
        // setDataSet(response?.data?.msg)
    }, [isCalled]);
    useEffect(() => {
        console.log(response, Array.isArray(response?.data?.msg));
        if (Array.isArray(response?.data?.msg)) {
            console.log(response);
            const rsp = {
                // i_br_id: +response?.data?.msg[0].br_id,
                i_name: response?.data?.msg[0].item_name,
                i_hsn: +response?.data?.msg[0].hsn_code,
                i_price: +response?.data?.msg[0].price,
                i_discount: +response?.data?.msg[0].discount,
                i_cgst: +response?.data?.msg[0].cgst,
                i_sgst: +response?.data?.msg[0].sgst,
                i_unit: +response?.data?.msg[0].unit_id,
                i_cat: +response?.data?.msg[0].catg_id,
            };
            setValues(rsp);
            console.log(rsp);
        }
        // setDataSet(response?.data?.msg)
        if (response?.data?.suc == 0 || response?.data?.msg.length <= 0) {
            Message("error", "Something went wrong!");
        } else {
            if (isCalled && response?.data?.suc == 1) {
                setCalled(false);
                // DurationMessage();
                // setTimeout(() => {
                //     navigation("/home/master/itemdetails/view");
                // }, 4500);
            }
        }
    }, [response]);
    const initialValues = {
        // i_br_id: "",
        i_name: "",
        i_hsn: "",
        i_price: "",
        i_discount: 0,
        i_cgst: "",
        i_sgst: "",
        i_unit: "",
        i_cat: "",
    };

    const onSubmit = (values) => {
        setCalled(true);
        console.log(values, params.id);
        comp = localStorage.getItem("comp_id");
        userId = localStorage.getItem("user_id");
        callApi("/admin/add_edit_items", 1, {
            comp_id: +shopID,
            // br_id: +values?.i_br_id,
            item_id: 0,
            item_name: values.i_name,
            unit_id: +values.i_unit,
            price: +values.i_price,
            discount: +values.i_discount,
            cgst: +values.i_cgst,
            sgst: +values.i_sgst,
            hsn_code: +values.i_hsn,
            catg_id: +values.i_cat,
            created_by: userId,
        });
    };

    useEffect(() => {
        axios.get(url + `/admin/S_Admin/select_settings?comp_id=${shopID}`).then(res=>{
            console.log(res)
            setDiscountFlag(res?.data?.msg[0]?.discount_flag=='N'?true:false)
        })
    },[shopID])

    const validationSchema = Yup.object({
        i_name: Yup.string().required("Name is required"),
        // i_br_id: Yup.number().required("Branch is required"),
        i_hsn: Yup.number().required("HSN is required"),
        i_price: Yup.number().required("Price is required"),
        i_unit: Yup.number().required("Unit is required"),
        i_discount: Yup.number().required("Discount is required"),
        i_cgst: Yup.number().required("CGST is required"),
         i_sgst: Yup.number().required("SGST is required"),
        
        i_cat: Yup.number().required("Category is required"),
    });
    const [formValues, setValues] = useState(initialValues);
    console.log(formValues);
    const formik = useFormik({
        initialValues: params.id > 0 ? formValues : initialValues,
          validate: (values) => {
      const errors = {};
      console.log(values);
      if (+values.i_cgst != +values.i_sgst) {
        errors.i_sgst = "GSTs don't match";
        errors.i_cgst = "GSTs don't match";
        // If "extra" is selected, enforce either (CGST + SGST) or IGST
      }

      return errors;
    },
        onSubmit,
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
    });

    return (
        <>
            <Backbtn />
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-blue-900 dark:text-white">
                        {" "}
                        Add a new item
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2 ">
                                <label
                                    class="block mb-2 text-sm float-left font-medium text-gray-900 dark:text-white"
                                    for="file_input">
                                    Search Shop
                                </label>
                                <input
                                    type="text"
                                    name="o_branch_name"
                                    id="o_branch_name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search shops to edit item"
                                    required=""
                                    autoComplete="off"
                                    onInput={(e) => {

                                        console.log(search)
                                        if (e.target.value) {
                                            
                                            op.current.show(e)
                                        }
                                        else {
                                            
                                            op.current.hide(e)
                                        }
                                    }

                                    }
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <OverlayPanel className="w-[47%] border-2 bg-gray-50 border-[#c1bef1]" ref={op}>
                                    {shops.map((item, i) =>
                                        <li
                                            key={i}
                                            onClick={(e) => {
                                                op.current.hide(e);
                                                setSearch(item?.company_name)
                                                setShopID(item?.id)
                                            }}
                                            style={{ listStyle: 'none' }}
                                            class="pb-3 cursor-pointer hover:bg-[#c1bef1] group active:bg-blue-900 rounded-md hover:duration-300 sm:py-1.5"
                                        >
                                            <p class="text-sm p-0.5 w-full text-blue-900 group-active:text-white truncate dark:text-white">

                                                {item?.company_name}
                                            </p>
                                        </li>
                                    )}
                                    {shops.length == 0 && loading && typing && <span> <LoadingOutlined /> </span>}
                                    {shops.length == 0 && !loading && <span> No Shops Found! </span>}
                                </OverlayPanel>

                            </div>
                            <div class="sm:col-span-2">
                                <label
                                    for="i_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="i_name"
                                    id="i_name"
                                    value={formik.values.i_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Item name"
                                    required=""
                                />
                                {formik.errors.i_name && formik.touched.i_name ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_name}
                                    </div>
                                ) : null}
                            </div>
                            <div class="w-full">
                                <label
                                    for="i_hsn"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    HSN Code
                                </label>
                                <input
                                    type="number"
                                    name="i_hsn"
                                    value={formik.values.i_hsn}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="i_hsn"
                                    disabled={params.id > 0 ? true : false}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="HSN Code"
                                    required=""
                                />
                                {formik.errors.i_hsn && formik.touched.i_hsn ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_hsn}
                                    </div>
                                ) : null}
                            </div>
                            <div class="w-full">
                                <label
                                    for="i_price"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="i_price"
                                    id="i_price"
                                    value={formik.values.i_price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="₹2999"
                                    required=""
                                />
                                {formik.errors.i_price && formik.touched.i_price ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_price}
                                    </div>
                                ) : null}
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    for="i_cat"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <select
                                    id="i_cat"
                                    name="i_cat"
                                    value={formik.values.i_cat}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select category</option>
                                    {category?.map((item, i) => (
                                        <option key={i} value={item.sl_no}>
                                            {item.category_name}
                                        </option>
                                    ))}
                                    {/* <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option> */}
                                </select>
                                {formik.errors.i_cat && formik.touched.i_cat ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_cat}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    for="i_unit"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Unit
                                </label>
                                <select
                                    id="i_unit"
                                    name="i_unit"
                                    value={formik.values.i_unit}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Unit</option>
                                    {dataSet?.map((item) => (
                                        <option value={item.sl_no}>{item.unit_name}</option>
                                    ))}
                                    {/* <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option> */}
                                </select>
                                {formik.errors.i_unit && formik.touched.i_unit ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_unit}
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    for="i_discount"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="i_discount"
                                    id="i_discount"
                                    disabled={discount_flag}
                                    value={formik.values.i_discount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="12"
                                    required=""
                                />
                                {formik.errors.i_discount && formik.touched.i_discount ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_discount}
                                    </div>
                                ) : null}
                            </div>
                            <div class="w-full">
                                <label
                                    for="i_cgst"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    CGST
                                </label>
                                {/* <input
                                    type="number"
                                    name="i_cgst"
                                    id="i_cgst"
                                    value={formik.values.i_cgst}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="CGST"
                                    required=""
                                /> */}
                                  <select
                                    name="i_cgst"
                                    id="i_cgst"
                                    value={formik.values.i_cgst}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="0">0</option>
                                    <option selected="2.5">2.5</option>
                                    <option selected="5">5</option>
                                    <option selected="18">18</option>
                                    <option selected="40">40</option>
                                    
                                    {/* <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option> */}
                                </select>
                                {formik.errors.i_cgst && formik.touched.i_cgst ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_cgst}
                                    </div>
                                ) : null}
                            </div>
                            <div class="w-full">
                                <label
                                    for="i_sgst"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    SGST
                                </label>
                                <select
                                    name="i_sgst"
                                    id="i_sgst"
                                    value={formik.values.i_sgst}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="0">0</option>
                                    <option selected="2.5">2.5</option>
                                    <option selected="5">5</option>
                                    <option selected="18">18</option>
                                    <option selected="40">40</option>
                                    
                                    {/* <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option> */}
                                </select>
                                {formik.errors.i_sgst && formik.touched.i_sgst ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_sgst}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {params.id == 0 && (
                                <button
                                    type="reset"
                                    onClick={formik.handleReset}
                                    className="inline-flex mr-3 bg-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-blue-900 border border-blue-900 bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Reset
                                </button>
                            )}
                            <button
                                type="submit"
                                className="inline-flex bg-blue-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default ManageItemsOnboardAdd