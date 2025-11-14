import { AddOutlined, UploadFileOutlined } from "@mui/icons-material"
import axios from "axios";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useEffect, useRef, useState } from "react";
import { url } from "../../../Address/baseURL";
import CATEGORIES from "../../../Assets/Images/categories.png"
import { LoadingOutlined } from "@ant-design/icons";
import { Message } from "../../../Components/Message";

function ManageCategoryOnboardView() {
    const op = useRef(null);
    const [shops, setShops] = useState([])
    const [search, setSearch] = useState("")
    const [shopID, setShopID] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [typing, setTyping] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (search.length > 2) {
            axios.post(url + '/admin/S_Admin/search_shop', { company_name: search }).then(res => {
                setShops(res?.data?.msg)
                console.log(res)
            }).catch(err => { })

        }
        else {
            setCategoryList([])
        }


    }, [search])
    const fetchCategories = (selectedShopID) => {
        if (selectedShopID > 0) {
            setLoading(true)
            axios.get(url + '/admin/S_Admin/select_category?comp_id=' + selectedShopID + '&catg_id=0').then(res => {
                console.log(res)
                setLoading(false)
                setCategoryList(res?.data?.msg)
            }).catch(err => { })
        }
    }
    const handleDtChange = (event, index) => {
        console.log(event, index)
        let data = [...categoryList];
        data[index][event.target.name] = event.target.value;
        setCategoryList(data);
    }
    const updateCategoryList = () => {
        axios.post(url + '/admin/S_Admin/add_edit_category_list', { categoryDt: categoryList, created_by: localStorage.getItem('user_id') }).then(res => {
            console.log(res)
            if (res.data.suc == 1) {
                setCategoryList([])
                setSearch("")
                Message("success", "Successfully updated!")
            }
        }).catch(err => { })
    }
    return (
        <>
            <section class="flex items-start my-5 bg-gray-50 dark:bg-gray-900">
                <div class="w-full max-w-screen-xl px-4 mx-auto ">
                    <div class="relative overflow-hidden bg-blue-900 text-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                            <div>
                                <h5 class="mr-3 font-semibold dark:text-white">Categories</h5>
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
                            <OverlayPanel className="w-[54%] border-2 bg-gray-50 border-[#c1bef1]" ref={op}>
                                {shops.map((item, i) =>
                                    <li
                                        key={i}
                                        onClick={(e) => {
                                            op.current.hide(e);
                                            setSearch(item?.company_name)
                                            setShopID(item?.id)
                                            fetchCategories(item?.id)
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
                            <button type="button"
                                class="flex items-center bg-white h-10 w-10 rounded-full justify-center px-4 py-4 text-sm font-medium text-blue-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <AddOutlined />
                            </button>
                            <button type="button"
                                class="flex items-center bg-white h-10 w-10 rounded-full justify-center px-4 py-4 text-sm font-medium text-blue-900 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <UploadFileOutlined />
                            </button>
                        </div>

                    </div>
                </div>




            </section>


            {categoryList.length > 0 &&
                <>
                    <div class="w-[80%] bg-neutral-primary-soft mx-auto border border-blue-100 rounded-md shadow-md max-h-96 overflow-y-auto" >
                        <ul role="list" class="space-y-3 p-6 divide-y divide-default">
                            {categoryList.map((item, i) => <li >
                                <div class="flex items-center text-body my-4">
                                    <img class="w-14 h-14 rounded-full mx-3 bg-blue-100 p-2" src={item.catg_picture ? url + item.catg_picture : CATEGORIES} alt="Default avatar"></img>
                                    <input
                                        type="text"
                                        name="category_name"
                                        id="category_name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Category name"
                                        required=""
                                        value={item.category_name}
                                        onChange={(text) => handleDtChange(text, i)}
                                    />
                                </div>

                                {!item.category_name &&<small class="text-red-900 mx-auto">Category name should not be blank!</small>}
                            </li>
                            )}

                        </ul>

                    </div>
                    <div className="flex justify-center items-center my-2">
                        <button type="button"
                            onClick={() => updateCategoryList()}
                            disabled={categoryList.filter(item=>item?.category_name?.trim()==="").length>0}
                            class="flex my-2 items-center bg-blue-900  rounded-full justify-center p-3 text-sm font-medium text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 disabled:bg-blue-100">
                            Update
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default ManageCategoryOnboardView