import React, { useEffect } from "react";
import CustomRoutes from "./components/Routes/CustomRoutes";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/AuthSlice";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="bg-[#F7F4EA]">
      <CustomRoutes />
    </div>
  );
};

export default App;
