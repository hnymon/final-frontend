// import { useCallback, useState } from "react";


// const CheckBox = () => {
//     const [checkedList, setCheckedLists] = useState([]);
  
//     // 전체 체크 클릭 시 발생하는 함수
//     const onCheckedAll = useCallback(
//       (checked) => {
//         if (checked) {
//           const checkedListArray = [];
  
//           dataLists.forEach((list) => checkedListArray.push(list));
  
//           setCheckedLists(checkedListArray);
//         } else {
//           setCheckedLists([]);
//         }
//       },
//       [dataLists]
//     );
  
//     // 개별 체크 클릭 시 발생하는 함수
//     const onCheckedElement = useCallback(
//       (checked, list) => {
//         if (checked) {
//           setCheckedLists([...checkedList, list]);
//         } else {
//           setCheckedLists(checkedList.filter((el) => el !== list));
//         }
//       },
//       [checkedList]
//     );
//   };

//   export default CheckBox();


