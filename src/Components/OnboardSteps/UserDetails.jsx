import React, { useEffect, useState } from "react";
import { Message } from "../../Components/Message";

function UserDetails({ data, submit_user, reset_user, outletData }) {
    const [users, setUsers] = useState(() => outletData);

    const handleReset = () => {
        reset_user();
    };

    const handleSubmit = () => {
        if (users.filter(item => item?.user_name?.trim() === "").length == 0 || users.filter(item => item?.user_type.trim() === "").length == 0) {
            submit_user(users);
        }
        else {
            console.log('else')
            Message("error", "Please fill all the required fields before proceeding.")
        }
    };



    const handleDtChange = (index, event) => {
        let data = [...users];
        data[index][event.target.name] = event.target.value;
        setUsers(data);
    }



    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-4 px-4 mx-auto max-w-2xl">
              
                <form >

                    {users?.map((item, i) => (

                        <div class="grid my-4 gap-4 sm:grid-cols-6 sm:gap-2 flex justify-center items-center">

                            <div class="w-full sm:col-span-2">
                                <label
                                    for="branch_name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    User Phone
                                </label>
                                <input
                                    type="text"
                                    class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    disabled
                                    name="phone_no" value={item?.phone_no} />

                            </div>
                            <div class="sm:col-span-2">
                                <label
                                    for="branch_address"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    User
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onChange={(event) => {
                                        handleDtChange(i, event);
                                    }}
                                    value={item?.user_name}
                                    placeholder="User name"
                                    required=""
                                />
                            {item?.user_name?.trim()==="" && <p class="mt-2 text-sm text-red-600 dark:text-red-400">User name is required.</p>}

                            </div>

                            <div class="w-full sm:col-span-2">
                                <label
                                    for="contact_person"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    User Type
                                </label>
                                <select
                                    id="user_type"
                                    name="user_type"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onChange={(event) => {
                                        handleDtChange(i, event);
                                    }}
                                    value={item.user_type}>
                                    <option selected="">Select User Type</option>
                                    <option value="U">User</option>
                                    <option value="M">Manager</option>
                                    {/* <option value="A">Admin</option> */}
                                </select>
                              {item?.user_type?.trim()==="" && <p class="mt-2 text-sm text-red-600 dark:text-red-400">User type is required.</p>}


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
                            Save & Next
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default UserDetails