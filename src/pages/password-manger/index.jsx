import CommonForm from '@/components/auth/CommonFrom'
import CommonTable from '@/components/password-manager/CommonTable'
import { passwordManagerFormControls, passwordManagerRecordConfig } from '@/config'
import { addManager, deleteManager, editManager, getManager } from '@/store/password-manager-Slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState ={
  sitename : "",
  url : "",
  password : "",
  notes : "",
}
const PasswordManager = () => {
  const [formData, setFormData] = React.useState(initialState)
  const [data, setData] = React.useState(false)
  const [openModel, setOpenModel] = React.useState(false)
  const {user , loading} = useSelector(state => state.auth)
  const { passwordManager } = useSelector(state => state.passwordManager)
  const dispatch = useDispatch()



const onSubmit = (e) => {
  e.preventDefault();
  dispatch(addManager(formData))
    .unwrap()
    .then(() => {
      
      setFormData(initialState);
      setData((prev)=> !prev)
    })
    .catch((error) => {
     null
    });
};
  useEffect(() => {
    dispatch(getManager())
  },[data])
  const onDelete = (id)=>{
    
    dispatch(deleteManager(id))
    .unwrap()
    .then(()=>{
       setData((prev)=> !prev)
    })
    .catch((error)=>{
      null
    })
  }
  const onEdit = (items)=>{
    
    setFormData(items)
    setOpenModel(true)
  }
  const finalEdit = (e)=>{
    e.preventDefault();
    
    dispatch(editManager(formData))
    .unwrap()
    .then(()=>{
      setOpenModel(false)
       setFormData(initialState);
       setData((prev)=> !prev)
    })
    .catch((error)=>{
      null
    })

  }
 
  return (
    <>
    <div className={`min-h-screen mt-6 ${openModel ? 'opacity-0 ': null}`} >
      <CommonForm
      formControl={passwordManagerFormControls}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    buttonFrom={loading ? "Logging in..." : "Done"}
      />

      <CommonTable
        tableControl={passwordManager?.data}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
    <div >
    {openModel &&
    <div className='fixed top-0 left-0 w-full h-screen   flex justify-center items-center '>
      <div className=' w-[400px]  p-6 rounded-lg shadow-lg shadow-gray-400 bg-white'>
        <h1 className='text-2xl text-center p-3'>Edit Your Password </h1>
      <CommonForm
        formControl={passwordManagerRecordConfig}
        formData={formData}
        setFormData={setFormData}
        onSubmit={finalEdit}
         buttonFrom={loading ? "Logging in..." : "Done"}
         
      />
      </div>
    </div>
      }


    </div>
    </>
  )
}

export default PasswordManager
