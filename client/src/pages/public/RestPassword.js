import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import Swal from 'sweetalert2';
function RestPassword() {
     const [password, setPassword] = useState('');
     const { token } = useParams();
     const handleResetPassword = async () => {
          const response = await apiResetPassword({ password, token });
          if (response.success) {
               Swal.fire('Congratulation', response.mes, 'success');
          } else {
               Swal.fire('Oops!', response.mes, 'error');
          }
     };
     return (
          <div>
               <div className="absolute top-0 left-0 animate-slide-right bottom-0 right-0 bg-white flex justify-center py-8 z-50">
                    <div className="flex flex-col gap-4">
                         <label htmlFor="email">Enter password</label>
                         <input
                              type="text"
                              id="email"
                              className="pb-2 border-b outline-none placeholder:text-sa"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />
                         <div className="w-[800px] pb-2 outline-none placeholder:text-sm flex justify-around">
                              <Button name={'Submit'} handleOnClick={handleResetPassword} />
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default RestPassword;
