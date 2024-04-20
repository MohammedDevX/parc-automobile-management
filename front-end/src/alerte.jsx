// import React from 'react';

// // Icons can be sourced from a library like FontAwesome or similar
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// const CustomAlertTemplate = ({ style, options, message, close }) => {
//   // Customize the style based on the type of message
//   const backgroundColor = options.type === 'error' ? '#f44336' : '#4CAF50';
//   const Icon = options.type === 'error' ? FaTimesCircle : FaCheckCircle;

//   return (
//     <div style={{
//       ...style,
//       backgroundColor: backgroundColor,
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       boxShadow: '0px 3px 5px rgba(0,0,0,0.2)' // Optional: Adds a shadow to the alert box
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <Icon style={{ marginRight: '10px' }} />
//         <div>
//           <strong style={{ display: 'block' }}>Title</strong>
//           <span>{message}</span>
//         </div>
//       </div>
//       <button onClick={close} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
//         &#10005; {/* This is a simple 'X' close button, replace with an icon if needed */}
//       </button>
//     </div>
//   );
// };

// export default CustomAlertTemplate;
