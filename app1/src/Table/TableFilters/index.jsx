import BoolFilter from "./BoolFilter";
import NumericFilter from "./NumericFilter";
import StringFilter from "./StringFilter";

const filter = {
    "string": (id, anchorEl, onClose) => 
        <StringFilter id={id} open={true} anchorEl={anchorEl} onClose={onClose} />,
    "boolean": (id, anchorEl, onClose) => 
        <BoolFilter id={id} open={true} anchorEl={anchorEl} onClose={onClose} />,
    "number": (id, anchorEl, onClose) => 
        <NumericFilter id={id} open={true} anchorEl={anchorEl} onClose={onClose} />,
};

export default ({type, id, anchorEl, onClose}) => {

    if (id && typeof filter[type] === "function") {
        return filter[type](id, anchorEl, onClose);
    }

};
