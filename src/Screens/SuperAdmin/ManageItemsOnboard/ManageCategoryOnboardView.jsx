import { AddOutlined, UploadFileOutlined } from "@mui/icons-material"
import axios from "axios";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useEffect, useRef, useState } from "react";
import { url } from "../../../Address/baseURL";
import { Divider } from "antd";
import { use } from "react";

function ManageCategoryOnboardView() {
    const op = useRef(null);
    const [shops, setShops] = useState([])
    const [search, setSearch] = useState("")
    const [shopID,setShopID]=useState(0)
    const [categoryList,setCategoryList] = useState([])
    useEffect(() => {
        if (search.length > 2) {
            axios.post(url + '/admin/S_Admin/search_shop', { company_name: search }).then(res => {
                setShops(res?.data?.msg)
                console.log(res)
            }).catch(err => { })
        }
    }, [search])
    useEffect(() => {
        axios.get(url + '/admin/S_Admin/select_category?comp_id=' + shopID+'&catg_id=0').then(res => {
            console.log(res)
            setCategoryList(res?.data?.msg)
        }).catch(err => { })
    }, [shopID])
    return (
        <>
        <section class="flex items-start mt-5 h-screen bg-gray-50 dark:bg-gray-900">
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
                            onInput={(e) => {
                                console.log(search)
                                if (e.target.value) {
                                    console.log('if', search)
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
                        <OverlayPanel className="w-[54%]  border-2 bg-gray-50 border-[#c1bef1]" ref={op}>
                            {shops.map((item, i) =>
                                <li
                                    key={i}
                                    onClick={(e) => {
                                        op.current.hide(e);
                                        setSearch(item?.company_name)
                                        setShopID(item?.id)
                                    }}
                                    style={{ listStyle: 'none' }}
                                    class="pb-3 cursor-pointer  hover:bg-[#c1bef1] group active:bg-blue-900 rounded-md hover:duration-300 sm:py-1.5"
                                >
                                    <p class="text-sm p-0.5 w-full text-blue-900 group-active:text-white truncate dark:text-white">

                                        {item?.company_name}
                                    </p>
                                </li>
                            )}
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
          <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
           
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Category</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList.map(item =><tr class="border-b dark:border-gray-700">
                            <td>
                                {item.category_name}
                            </td>
                        </tr>)}
                       
                      
                    </tbody>
                </table>
            </div>
          
        </div>
    </div>
    </section>
    </>
    )
}

export default ManageCategoryOnboardView