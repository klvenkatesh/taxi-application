import React from 'react';

// class InputField extends React.Component {
//     render() {


//         return (
//             <div>
//                 <span>{props.labelName}</span>
//                 <input
//                     name={props.labelName}
//                     type={props.type}
//                     key={props.labelName}
//                     placeholder={props.labelName}
//                     onChange={props.onChange}
//                     value={props.value}/>
//             </div>
//         );
//     }
// }

let InputField = (props)=>{
    return (
        <div>
            <span>{props.labelName}</span>
            <input
                name={props.labelName}
                type={props.type}
                key={props.labelName}
                placeholder={props.labelName}
                onChange={props.onChange}
                value={props.value}/>
        </div>
    );
};
export default InputField;