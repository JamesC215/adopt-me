import Payment from "../../components/Payment/Payment";
import { checkToken, handleCheckToken } from "../../utilities/users-service";

export default function OrderHistoryPage() {
  // async function handleCheckToken() {
  //   const expDate = await checkToken();
  //   console.log(expDate);
  // }
  
  return (
    <>
      <Payment />
    </>
  );
}