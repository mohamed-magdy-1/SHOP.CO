// 'use client';
// import React, { useEffect, useState } from 'react';
// import DOMPurify from "dompurify";


// export default function AlertClient() {
//   const [alertText, setAlertText] = useState('');


//   useEffect(() => {
//     async function fetchAlert() {
//       try {
//         const res = await fetch('http://localhost:1337/api/alert', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${process.env.TOKEN_SECRET}`,
//             'Content-Type': 'application/json',
//           },
//           cache: 'no-store',
//         });

//         if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);

//         const data = await res.json();
//         setAlertText(data);
//       } catch (error) {
//         console.error('Error fetching alert data:', error);
//       }
//     }

//     fetchAlert();

//   }, []);

//   console.log(alertText);

//   return (
//     <div
//       className="text-white text-sm md:text-lg"
//       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(alertText) }}
//     />
//   );
// }