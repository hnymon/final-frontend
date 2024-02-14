import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("/getMemberInfo", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.result === "Success") {
          setRole(response.data.currentMember.role);
        }
      } catch (error) {
        console.error("Error fetching member info:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  if (role === "USER") {
    return <Outlet />;
  } else if (role === "") {
    // role이 초기값인 경우, 데이터를 아직 가져오지 못한 상태이므로 로딩 스피너 등을 보여줄 수 있습니다.
    return <div>Loading...</div>;
  } else {
    // role이 ADMIN이 아닌 경우, 로그인 페이지로 리다이렉트합니다.
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
