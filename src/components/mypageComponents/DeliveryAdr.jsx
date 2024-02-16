import { useEffect, useState } from "react";
import DeliveryAdrEmpty from "./deliveryAdr/DeliveryAdrEmpty"
import DeliveryAdrExist from "./deliveryAdr/DeliveryAdrExist";
import axios from "axios";
import GetTokenToHeader from "../../token/GetTokenToHeader";

const DeliveryAdr = () => {
    const [addrs, setAddrs] = useState([]);
    const [addOrEditSuccess, setAddOrEditSuccess] = useState(false);
    const handleSuccess = () => {
        setAddOrEditSuccess(!addOrEditSuccess);
      };
    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const headers = GetTokenToHeader();
                const response = await axios.post("/getMemberAdr", null, headers);
                console.log(response.data.addrs)
                setAddrs(prevAddrs => {
                    // 새로운 상태를 반환하는 로직 작성
                    return response.data.addrs;
                });
            } catch (error) {
                
            }
        };
        fetchMemberInfo();
    }, [addOrEditSuccess]);
    return(
        <>
           {addrs.length > 0 ? (
                <DeliveryAdrExist addrs={addrs} onSuccess={handleSuccess} />
            ) : (
                <DeliveryAdrEmpty onSuccess={handleSuccess}/>
            )}
        </>
    );
}
export default DeliveryAdr;