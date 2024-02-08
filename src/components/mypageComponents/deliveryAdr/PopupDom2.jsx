import ReactDom from 'react-dom';
 
const PopupDom2 = ({ children }) => {
    const el = document.getElementById('popupDom2');
    return ReactDom.createPortal(children, el);
};
 
export default PopupDom2;