import ReactDom from 'react-dom';
 
const PopupDom3 = ({ children }) => {
    const el = document.getElementById('popupDom3');
    return ReactDom.createPortal(children, el);
};
 
export default PopupDom3;