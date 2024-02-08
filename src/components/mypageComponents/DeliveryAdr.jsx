import DeliveryAdrEmpty from "./deliveryAdr/DeliveryAdrEmpty"
import DeliveryAdrExist from "./deliveryAdr/DeliveryAdrExist";

const DeliveryAdr = () => {
    return(
        <>
            <DeliveryAdrEmpty/>
            <hr />
            <DeliveryAdrExist/>
        </>
    );
}
export default DeliveryAdr;