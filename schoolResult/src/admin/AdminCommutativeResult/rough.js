{
  /* <div className="col-md-6 mb-2 mt-2 ">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Test"
  type="number"
  name="test"
  value={subjectsData?.total1stTermScore}
/>
</div>
<div className="col-md-6 mb-2 mt-1">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Exam"
  name="exam"
  type="number"
  value={subjectsData?.total2ndTermScore}
/>
</div>

<div className="col-md-6 mb-2 mt-2 ">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Test"
  type="number"
  name="test"
  value={subjectsData?.total1stTermScore}
/>
</div>
<div className="col-md-6 mb-2 mt-1">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Exam"
  name="exam"
  type="number"
  value={subjectsData?.total1stTermScore}
/>
</div>
<div className="col-md-6 mb-2 mt-2">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Total Score"
  type="number"
  name="totalScore"
  value={items?.totalScore}
  // onBlur={calculateGrandTotal}
/>
</div>
<div className="col-md-6 mb-2 mt-1">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  label="Grade"
  name="grade"
  type="text"
  value={items?.grade}
/>
</div>
<div className="col-md-6 mb-2 mt-1">
<TextField
  style={{
    width: "150px",
    marginLeft: "4px",
  }}
  required
  rows={4}
  id="outlined-required"
  name="remark"
  label="Remark"
  type="text"
  value={items?.remark}
/>
</div>
</Dropdown.Menu>
</Dropdown>
</div>
<div></div>
</div> */
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CreateCommutativeResult: React.FC = () => {
//   const { id, selectedSchool, selectedClass } = useParams();
//   const [selectedYear, setSelectedYear] = React.useState<any>("");
//   const [subjectMarks, setSubjectMarks] = useState<any>([]);
//   const [subjectMarks2nd, setSubjectMarks2nd] = useState([]);
//   const [subjectMarks3rd, setSubjectMarks3rd] = useState([]);
//   const Fetch = () => {
//     try {
//       axios.get("http://localhost:5000/api/SubjectMarks").then((response) => {
//         setSubjectMarks(
//           response.data.filter(
//             (item: any) =>
//               item?.schoolName._id === selectedSchool &&
//               item?.classes._id === selectedClass &&
//               item?.year === selectedYear &&
//               item?.user._id === id &&
//               item?.term === "1st_Term"
//           )
//         );
//       });
//       Fetch2();
//       Fetch3();
//     } catch (error) {
//       console.error(error, "Failed");
//     }
//   };
//   const Fetch2 = () => {
//     try {
//       axios.get("http://localhost:5000/api/SubjectMarks").then((response) => {
//         // Assuming your API response contains data in the format of SubjectData[]
//         setSubjectMarks2nd(
//           response.data.filter(
//             (item: any) =>
//               item?.schoolName._id === selectedSchool &&
//               item?.classes._id === selectedClass &&
//               item?.year === selectedYear &&
//               item?.user._id === id &&
//               item?.term === "2nd_Term"
//           )
//         );
//       });
//     } catch (error) {
//       console.error(error, "Failed");
//     }
//   };
//   const Fetch3 = () => {
//     try {
//       axios.get("http://localhost:5000/api/SubjectMarks").then((response) => {
//         // Assuming your API response contains data in the format of SubjectData[]
//         setSubjectMarks3rd(
//           response.data.filter(
//             (item: any) =>
//               item?.schoolName._id === selectedSchool &&
//               item?.classes._id === selectedClass &&
//               item?.year === selectedYear &&
//               item?.user._id === id &&
//               item?.term === "3rd_Term"
//           )
//         );
//       });
//     } catch (error) {
//       console.error(error, "Failed");
//     }
//   };
//   // useEffect(() => {
//   //   // Fetch your data using Axios
//   //   axios.get('http://localhost:5000/api/SubjectMarks')
//   //     .then(response => {
//   //       // Assuming your API response contains data in the format of SubjectData[]
//   //       setSubjectMarks(response.data.filter(
//   //              (item: any) =>
//   //                item?.schoolName._id === selectedSchool &&
//   //                  item?.classes._id === selectedClass &&
//   //                item?.year === selectedYear &&
//   //                    item?.user._id === id
//   //                ));
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, []);
//   const uniqueNames = Array.from(
//     new Set(
//       subjectMarks.map((item: any) =>
//         item?.subjects.map((item: any) => item.subjectName)
//       )
//     )
//   );
//   return (
//     <>
//       <div className="user-details">
//         <h4 className="text-center">Select Result *Year*</h4>
//         <p className="text-center">Before you proceed</p>
//         <div className="input-box">
//           <select
//             value={selectedYear}
//             onChange={(e: any) => setSelectedYear(e.target.value)}
//           >
//             <option value="">Select Year</option>

//             <option value="2023"> 2023</option>

//             <option value="2024"> 2024</option>

//             <option value="2025"> 2025</option>

//             {/* Add more terms as needed */}
//           </select>
//         </div>
//       </div>
//       <>
//         <button
//           style={{
//             border: "1px solid red",
//             width: "150px",
//             height: "50px",
//             borderRadius: "6px",
//             marginLeft: "5px",
//           }}
//           onClick={Fetch}
//         >
//           Fetch To Proceed
//         </button>
//         {/* {loader && <CircularIndeterminate />} */}
//         {/* <Message type="success" message="Success! Result Found" />
//             <Message type="error" message="Error! No Result" /> */}
//       </>
//       {/* {subjectMarks?.map((item: any) => (
//         <>
//           {item?.subjects.map((item: any) => (
//             <>
//               <div>Name: {item.subjectName}</div>

//               {subjectMarks
//                 .filter((u: any) => u.name === item.subjectName)
//                 .map((u: any, idx: any) => (
//                   <div key={idx}>1st Term: {u.totalScore},</div>
//                 ))}
//             </>
//           ))}
//         </>
//       ))} */}
//       {/* <p>
//         {uniqueNames.map((subjectName: any) => (
//           <li key={subjectName}>{subjectName}</li>
//         ))}
//       </p> */}
//       {subjectMarks.map((item: any) => (
//         <div key={item?._id}>
//           {item?.subjects
//             .sort((a: any, b: any) =>
//               a.subjectName.localeCompare(b.subjectName)
//             )
//             .map((item: any) => (
//               <>
//                 <p>{item?.subjectName} </p>
//                 <p>1st Term: {item.totalScore}</p>
//               </>
//             ))}
//         </div>
//       ))}
//       {subjectMarks2nd.map((item: any, index) => (
//         <div key={index}>
//           {item?.subjects
//             .sort((a: any, b: any) =>
//               a.subjectName.localeCompare(b.subjectName)
//             )
//             .map((item: any) => (
//               <>
//                 <p>{item?.subjectName} </p>
//                 <p>2nd Term: {item.totalScore}</p>
//               </>
//             ))}
//         </div>
//       ))}
//       {subjectMarks3rd.map((item: any, index) => (
//         <div key={index}>
//           {item?.subjects
//             .sort((a: any, b: any) =>
//               a.subjectName.localeCompare(b.subjectName)
//             )
//             .map((item: any) => (
//               <>
//                 <p>{item?.subjectName} </p>
//                 <p>3rd Term: {item.totalScore}</p>
//               </>
//             ))}
//         </div>
//       ))}
//     </>
//   );
// };

// export default CreateCommutativeResult;
{
  /* {Object.keys(groupedSubjects).map((subjectName) => (
                  <div key={subjectName}>
                    <h3>{subjectName}</h3>
                    <ul>
                      {groupedSubjects[subjectName].map(
                        (totalScore: any, index: any) => (
                          <li key={index}>{totalScore}</li>
                        )
                      )}
                    </ul>
                  </div>
                ))} */
}

// groupedSubjects
// useEffect(() => {
//   const subjectName = "";
//   const scores = groupedSubjects[subjectName]?.map(
//     (totalScore: any) => totalScore
//   );
//   const subjectTotal = scores.reduce(
//     (acc: any, score: any) => acc + score,
//     0
//   );
//   const subjectAverage = scores.length > 0 ? subjectTotal / scores.length : 0;

//   setSubjectsData({
//     ...subjectsData,
//     totalScore: subjectTotal,
//     totalAverage: subjectAverage,
//   });
// }, [groupedSubjects]);

// useEffect(() => {
//   let totalScore = 0; // Initialize grandTotal variable

//   const subjectName: any =
//     Object.keys(groupedSubjects).find((item: any) => item.subjectName) || "";

//   // console.log(subjectName);
//   const scores = groupedSubjects[subjectName] || [];
//   // const scores =
//   // groupedSubjects[subjectName]?.map((totalScore: any) => totalScore) || [];
//   totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);
//   const totalAverage: number =
//     scores.length > 0 ? totalScore / scores.length : 0;

//   setSubjectsData({ ...subjectsData, totalScore, totalAverage });
// }, [groupedSubjects]);
// // useEffect(() => {
//   const subjectName = `${Object.keys(groupedSubjects).map(
//     (subjectName: any) => subjectName
//   )}`;

//   const totalEachTerm = groupedSubjects[subjectName]?.map(
//     (totalScore: any) => totalScore[0]
//   );

//   setTotal1st(totalEachTerm);
// }, [groupedSubjects]);
// useEffect(() => {
//   const subjectName = `${Object.keys(groupedSubjects).map(
//     (subjectName: any) => subjectName
//   )}`;

//   const totalEachTerm = groupedSubjects[subjectName]?.map(
//     (totalScore: any) => totalScore[1]
//   );

//   setTotal2nd(totalEachTerm);
// }, [groupedSubjects]);
// useEffect(() => {
//   const subjectName = `${Object.keys(groupedSubjects).map(
//     (subjectName: any) => subjectName
//   )}`;

//   const totalEachTerm = groupedSubjects[subjectName]?.map(
//     (totalScore: any) => totalScore[2]
//   );

//   setTotal3rd(totalEachTerm);
// }, [groupedSubjects]);
// useEffect(() => {
//   const totalEachTerm = Object.keys(groupedSubjects).map(
//     (subjectName: any) => subjectName
//   );

//   setSubjectMarks(totalEachTerm);
// }, [groupedSubjects]);
