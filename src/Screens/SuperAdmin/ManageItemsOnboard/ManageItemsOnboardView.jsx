import { AddOutlined, UploadFileOutlined } from "@mui/icons-material"
import axios from "axios";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useEffect, useRef, useState } from "react";
import { url } from "../../../Address/baseURL";
import CATEGORIES from "../../../Assets/Images/categories.png"
import { LoadingOutlined } from "@ant-design/icons";
import { Message } from "../../../Components/Message";
import { useNavigate } from "react-router-dom";
import { Spin, Tooltip } from "antd";
import { use } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
function ManageItemsOnboardView() {
    const op = useRef(null);
    const op1 = useRef(null);
    const [shops, setShops] = useState([])
    const [search, setSearch] = useState("")
    const [search_item, setSearchItem] = useState("")
    const [shopID, setShopID] = useState(0)
    const [itemList, setitemList] = useState([])
    const [itemListCopy, setitemListCopy] = useState([])
    const [typing, setTyping] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [itemID, setItemID] = useState(0)
    const [itemDtls, setItemDtls] = useState({})
    const [unit, setUnit] = useState([])
    
    const navigation = useNavigate()
    useEffect(() => {
        if (search.length > 2) {
            axios.post(url + '/admin/S_Admin/search_shop', { company_name: search }).then(res => {
                setShops(res?.data?.msg)
                console.log(res)
            }).catch(err => { })

        }
        else {
            setitemList([])
            setitemListCopy([])
            setCategoryList([])
        }


    }, [search])
    useEffect(() => {
        axios
            .post(url + "/admin/unit_list", {
                comp_id: +localStorage.getItem("comp_id"),
            })
            .then((resp) => {
                console.log(resp);
                setUnit(resp?.data?.msg);
            });

    }, []);
    const fetchItems = (selectedShopID) => {
        if (selectedShopID > 0) {
            setLoading(true)
            axios.get(url + '/admin/S_Admin/item_detail?comp_id=' + selectedShopID).then(res => {
                console.log(res)
                setLoading(false)
                setitemList(res?.data?.msg)
                setitemListCopy(res?.data?.msg)
                axios.get(url + `/admin/S_Admin/select_category?comp_id=${shopID}&catg_id=0`).then(resCats => {
                    console.log(resCats)
                    setCategoryList(resCats?.data?.msg)

                }).catch(err => { })

            }).catch(err => { })
        }
    }
    const initialValues = {
        // i_br_id: "",
        i_name: "",
        i_hsn: "",
        i_price: "",
        i_discount: "",
        i_cgst: "",
        i_sgst: "",
        i_unit: "",
        i_cat: "",
    };
    const validationSchema = Yup.object({
        i_name: Yup.string().required("Name is required"),
        i_hsn: Yup.number().required("HSN is required"),
        i_price: Yup.number().required("Price is required"),
        i_unit: Yup.number().required("Unit is required"),
        i_discount: Yup.number().required("Discount is required"),
        i_cgst: Yup.number().required("CGST is required"),
        i_sgst: Yup.number().required("SGST is required"),
        i_cat: Yup.number().required("Category is required"),
    });
    const [formValues, setValues] = useState(initialValues);
    const onSubmit = (values) => {
    setLoading(true)
        console.log(values)
    const userId = localStorage.getItem("user_id");
    axios.post(url+"/admin/add_edit_items", {
      comp_id: +shopID,
      // br_id: +values?.i_br_id,
      item_id: +itemID,
      item_name: values.i_name,
      unit_id: +values.i_unit,
      price: +values.i_price,
      discount: +values.i_discount,
      cgst: +values.i_cgst,
      sgst: +values.i_sgst,
      hsn_code: +values.i_hsn,
      catg_id: +values.i_cat,
      created_by: userId,
    }).then(res => {
      console.log(res); 
      setLoading(false)
      if(res.data.suc == 1){
        setCategoryList([])
        setItemDtls({})
        setItemID(0)
        setSearchItem("")
        setitemList([])
        setShopID(0)
        setSearch("")
        Message("success", "Successfully updated!")
      }
      else{
        Message("error", "Something went wrong!")
      }
    });

    }
    const formik = useFormik({
        initialValues: formValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
    });

    useEffect(() => {
        setitemList(itemListCopy.filter(e => e.item_name.toLowerCase().includes(search_item.toLowerCase())))
    }, [search_item])
    useEffect(() => {
        setItemDtls(itemList.filter(e => e?.id == itemID)[0])

        const rsp = {
            // i_br_id: +response?.data?.msg[0].br_id,
            i_name: itemList.filter(e => e?.id == itemID)[0]?.item_name,
            i_hsn: +itemList.filter(e => e?.id == itemID)[0]?.hsn_code,
            i_price: +itemList.filter(e => e?.id == itemID)[0]?.price,
            i_discount: +itemList.filter(e => e?.id == itemID)[0]?.discount,
            i_cgst: +itemList.filter(e => e?.id == itemID)[0]?.cgst,
            i_sgst: +itemList.filter(e => e?.id == itemID)[0]?.sgst,
            i_unit: +itemList.filter(e => e?.id == itemID)[0]?.unit_id,
            i_cat: +itemList.filter(e => e?.id == itemID)[0]?.catg_id,
        };
        setValues(rsp)
    }, [itemID])

  
    return (
        <Spin spinning={loading} indicator={
            <LoadingOutlined style={{ fontSize: 70, color: "#404198" }} spin />
        }>
            <section class="flex items-start my-5 bg-gray-50 dark:bg-gray-900">
                <div class="w-full max-w-screen-xl px-4 mx-auto ">
                    <div class="relative overflow-hidden bg-blue-900 text-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                            <div>
                                <h5 class="mr-3 font-semibold dark:text-white">Items</h5>
                            </div>
                            <input
                                type="text"
                                name="o_branch_name"
                                id="o_branch_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search shops to edit category"
                                required=""
                                autoComplete="off"
                                onInput={(e) => {

                                    console.log(search)
                                    if (e.target.value) {
                                        setTyping(true)
                                        op.current.show(e)
                                    }
                                    else {
                                        setTyping(false)
                                        op.current.hide(e)
                                    }
                                }

                                }
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <OverlayPanel className="w-[27%] border-2 bg-gray-50 border-[#c1bef1]" ref={op}>
                                {shops.map((item, i) =>
                                    <li
                                        key={i}
                                        onClick={(e) => {
                                            op.current.hide(e);
                                            setSearch(item?.company_name)
                                            setShopID(item?.id)
                                            fetchItems(item?.id)
                                            axios
                                                .post(url + "/admin/unit_list", {
                                                    comp_id: +item?.id,
                                                })
                                                .then((resp) => {
                                                    console.log(resp);
                                                    setUnit(resp?.data?.msg);
                                                });
                                        }}
                                        style={{ listStyle: 'none' }}
                                        class="pb-3 cursor-pointer hover:bg-[#c1bef1] group active:bg-blue-900 rounded-md hover:duration-300 sm:py-1.5"
                                    >
                                        <p class="text-sm p-0.5 w-full text-blue-900 group-active:text-white truncate dark:text-white">

                                            {item?.company_name}
                                        </p>
                                    </li>
                                )}
                                {shops.length == 0 && loading && <span> <LoadingOutlined /> </span>}
                                {shops.length == 0 && !loading && <span> No Shops Found! </span>}
                            </OverlayPanel>
                            <input
                                type="text"
                                name="o_branch_name"
                                id="o_branch_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder={`Search items for ${search ? search : 'shop'}`}
                                required=""
                                disabled={shopID == 0 ? true : false}
                                autoComplete="off"
                                onInput={(e) => {

                                    console.log(search)
                                    if (e.target.value) {
                                        setTyping(true)
                                        op1.current.show(e)
                                    }
                                    else {
                                        setTyping(false)
                                        op1.current.hide(e)
                                    }
                                }

                                }
                                value={search_item}
                                onChange={(e) => setSearchItem(e.target.value)}
                            />
                            <OverlayPanel className="w-[28%] border-2 max-h-96 overflow-y-auto bg-gray-50 border-[#c1bef1]" ref={op1}>
                                {itemList.map((item, i) =>
                                    <li
                                        key={i}
                                        onClick={(e) => {
                                            op1.current.hide(e);
                                            setSearchItem(item?.item_name)
                                            setItemID(item?.id)

                                        }}
                                        style={{ listStyle: 'none' }}
                                        class="pb-3 cursor-pointer hover:bg-[#c1bef1] group active:bg-blue-900 rounded-md hover:duration-300 sm:py-1.5"
                                    >
                                        <p class="text-sm p-0.5 w-full text-blue-900 group-active:text-white truncate dark:text-white">

                                            {item?.item_name}
                                        </p>
                                    </li>
                                )}
                                {itemList.length == 0 && loading && <span> <LoadingOutlined /> </span>}
                                {itemList.length == 0 && !loading && <span> No item Found! </span>}
                            </OverlayPanel>
                            <button type="button"
                                onClick={() => navigation('/home/SuperAdmin/manageitems/itemsadd')}
                                class="flex items-center bg-white h-10 w-10 rounded-full justify-center px-4 py-4 text-sm font-medium text-blue-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <Tooltip title="Add Item">

                                    <AddOutlined />
                                </Tooltip>

                            </button>
                            <button type="button"
                                class="flex items-center bg-white h-10 w-10 rounded-full justify-center px-4 py-4 text-sm font-medium text-blue-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <UploadFileOutlined />
                            </button>
                        </div>

                    </div>
                </div>




            </section>


            {itemID > 0 &&
              
                    <form onSubmit={formik.handleSubmit}>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 px-5">
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
                                    disabled={true}
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
                                    placeholder="$2999"
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
                                    {categoryList?.map((item, i) => (
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
                                    {unit?.map((item) => (
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
                                <input
                                    type="number"
                                    name="i_cgst"
                                    id="i_cgst"
                                    value={formik.values.i_cgst}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="CGST"
                                    required=""
                                />
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
                                <input
                                    type="number"
                                    name="i_sgst"
                                    id="i_sgst"
                                    value={formik.values.i_sgst}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="SGST"
                                    required=""
                                />
                                {formik.errors.i_sgst && formik.touched.i_sgst ? (
                                    <div className="text-red-500 text-sm">
                                        {formik.errors.i_sgst}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-2">
                            <button type="submit"
                                class="flex my-2 items-center bg-blue-900  rounded-full justify-center p-3 text-sm font-medium text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 disabled:bg-blue-100">
                                Update
                            </button>
                        </div>
                    </form>

                            }
            {/* </> */}
        </Spin>
    )
}
export default ManageItemsOnboardView