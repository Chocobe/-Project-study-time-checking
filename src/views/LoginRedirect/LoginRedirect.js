import {
  useContext,
  useEffect,
} from "react";

import { useSearchParams, useNavigate } from "react-router-dom";

import { MainDispatchContext } from "@/context/MainContext/MainContext";
import { DISPATCH_TYPE } from "@/context/MainContext/mainReducer";

const LoginRedirect = () => {
  const dispatch = useContext(MainDispatchContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    
    dispatch({
      type: DISPATCH_TYPE.LOGIN,
      payload: { token },
    });

    window.close();
  }, [dispatch, searchParams, navigate]);
};

export default LoginRedirect;
