import { apiDeleteUser, apiGetUsers, apiUpdateUser } from 'apis';
import { Button, InputField, InputForm, Pagination, Select } from 'components';
import useDebounce from 'hooks/useDebounce';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageUser = () => {
     const [users, setUsers] = useState(null);
     const {
          handleSubmit,
          register,
          formState: { errors },
     } = useForm({
          email: '',
          firstname: '',
          lastname: '',
          role: '',
          mobile: '',
          isBlocked: '',
     });
     const [queries, setQueries] = useState({
          search: '',
     });
     const [params] = useSearchParams();
     const fetchUsers = async (params) => {
          const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT_PAGE });
          if (response.success) {
               setUsers(response);
          }
     };
     const [editInfo, setEditInfo] = useState(null);
     const queriesDebounce = useDebounce(queries.search, 1000);
     const [isUpdate, setIsUpdate] = useState(false);
     const reRender = useCallback(() => {
          setIsUpdate((prev) => !prev);
     }, [isUpdate]);
     useEffect(() => {
          const querie = Object.fromEntries([...params]);
          if (queriesDebounce) querie.q = queriesDebounce;
          fetchUsers(querie);
     }, [queriesDebounce, params, isUpdate]);
     const handleUpdate = async (data) => {
          console.log('data', data);
          const response = await apiUpdateUser(data, editInfo._id);
          if (response.success) {
               setEditInfo(null);
               reRender();
               toast.success(response.mes);
          } else {
               toast.error(response.mes);
          }
     };
     const handleDelete = (uid) => {
          Swal.fire({
               title: 'Warning',
               text: 'Are you sure you want to delete this user',
               showCancelButton: true,
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const response = await apiDeleteUser(uid);
                    if (response.success) {
                         reRender();
                         toast.success(response.mes);
                    } else {
                         toast.error(response.mes);
                    }
               }
          });
     };
     return (
          <div className="w-full pl-8">
               <h1 className="h-[75px] flex justify-center items-center text-3xl font-bold px-6 border-b-2">
                    <span>Manage users</span>
               </h1>
               <div className="w-full p-6">
                    <div className="flex justify-end py-4">
                         <InputField
                              nameKey={'search'}
                              value={queries.search}
                              setValue={setQueries}
                              style={'w-[500px]'}
                         />
                    </div>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                         {editInfo && <Button type="submit">Update</Button>}
                         <table className="table-auto mb-6 text-left w-full">
                              <thead className="font-bold bg-gray-700 text-[13px]  text-white">
                                   <tr className="border-y border-blue-500">
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Role</th>
                                        <th>Create At</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {users?.users?.map((el, idx) => (
                                        <tr key={el._id} className="border-y border-gray-500">
                                             <td className="py-2">{idx + 1}</td>
                                             <td className="py-2">
                                                  {editInfo?._id == el._id ? (
                                                       <InputForm
                                                            register={register}
                                                            errors={errors}
                                                            id={'email'}
                                                            fw
                                                            defaultValue={editInfo?.email}
                                                            validate={{
                                                                 required: true,
                                                                 pattern: {
                                                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                      message: 'Invalid email address',
                                                                 },
                                                            }}
                                                       />
                                                  ) : (
                                                       el?.email
                                                  )}
                                             </td>
                                             <td className="py-2">
                                                  {editInfo?._id == el?._id ? (
                                                       <InputForm
                                                            register={register}
                                                            errors={errors}
                                                            id={'firstname'}
                                                            fw
                                                            defaultValue={editInfo?.firstname}
                                                            validate={{ required: 'require' }}
                                                       />
                                                  ) : (
                                                       el?.firstname
                                                  )}
                                             </td>
                                             <td className="py-2">
                                                  {editInfo?._id == el?._id ? (
                                                       <InputForm
                                                            register={register}
                                                            errors={errors}
                                                            id={'lastname'}
                                                            fw
                                                            defaultValue={editInfo?.lastname}
                                                            validate={{ required: 'require' }}
                                                       />
                                                  ) : (
                                                       el?.lastname
                                                  )}
                                             </td>
                                             <td className="py-2">{el?.role}</td>
                                             <td className="py-2">{moment(el?.createdAt).format('DD/MM/YYYY')}</td>
                                             <td className="py-2">
                                                  {editInfo?._id == el?._id ? (
                                                       <InputForm
                                                            register={register}
                                                            errors={errors}
                                                            id={'mobile'}
                                                            fw
                                                            defaultValue={editInfo?.mobile}
                                                            validate={{ required: 'require' }}
                                                       />
                                                  ) : (
                                                       el?.mobile
                                                  )}
                                             </td>
                                             <td className="py-2">
                                                  {editInfo?._id == el?._id ? (
                                                       <Select
                                                            register={register}
                                                            errors={errors}
                                                            id={'isBlocked'}
                                                            fw
                                                            defaultValue={editInfo?.isBlocked}
                                                            validate={{ required: 'require' }}
                                                            options={[
                                                                 { label: 'Blocked', value: true },
                                                                 { label: 'Active', value: false },
                                                            ]}
                                                       />
                                                  ) : el?.isBlocked ? (
                                                       'Blocked'
                                                  ) : (
                                                       'Active'
                                                  )}
                                             </td>
                                             <td className="py-2">
                                                  {editInfo && editInfo?._id === el?._id ? (
                                                       <span
                                                            className="p-1 text-orange hover:bg-gray-300 cursor-pointer border  mr-3 border-red-950  rounded-[5px]"
                                                            onClick={() => {
                                                                 setEditInfo(null);
                                                            }}
                                                       >
                                                            Back
                                                       </span>
                                                  ) : (
                                                       <span
                                                            className="p-1 text-orange hover:bg-gray-300 cursor-pointer border  mr-3 border-red-950  rounded-[5px]"
                                                            onClick={() => {
                                                                 setEditInfo(el);
                                                                 setIsUpdate(true);
                                                            }}
                                                       >
                                                            Edit
                                                       </span>
                                                  )}
                                                  <span
                                                       className="p-1 text-orange hover:bg-gray-300 cursor-pointer border border-rose-600 rounded-[5px]"
                                                       onClick={() => {
                                                            handleDelete(el._id);
                                                       }}
                                                  >
                                                       Delete
                                                  </span>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </form>

                    <div className="w-full flex justify-end">
                         <Pagination totalCount={users?.counts} titlePage={'users'}></Pagination>
                    </div>
               </div>
          </div>
     );
};

export default ManageUser;
