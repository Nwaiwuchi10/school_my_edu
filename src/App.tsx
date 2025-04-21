import React from "react";
import logo from "./logo.svg";
import "./App.css";

import SchoolRegister from "./screens/SchoolRegister/SchoolRegister";
import { Route, Routes } from "react-router-dom";
import SchoolLogin from "./screens/SchoolLogin/SchoolLogin";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import StaffLogin from "./screens/LoginScreen/StaffLogin";
import StaffRegister from "./screens/RegisterScreen/StaffRegister";
import SelectResultCheck from "./screens/CheckResultScreen/SelectResultCheck";
import ResultChecker from "./screens/CheckResultScreen/ResultChecker";
import CommutativeResultChecker from "./screens/CheckResultScreen/CommutativeResultChecker";
import { MyResult } from "./screens/CheckResultScreen/MyResult";

import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";
import AdminCreateClass from "./admin/AdminClasses/AdminCreateClass";
import RegisterStudent from "./admin/AdminStudents/RegisterStudent";
import AdminCreateSubject from "./admin/AdminSubjects/AdminCreateSubject";
import AdminSubjectScore from "./admin/AdminSubjectScore/AdminSubjectScore";
import StudentSubjectScores from "./admin/AdminSubjectScore/StudentSubjectScores";
import AdminCreateResult from "./admin/AdminResult/AdminCreateResult";
import CreateStudentResult from "./admin/AdminResult/CreateStudentResult";
import AdminViewStudents from "./admin/AdminStudents/AdminViewStudents";
import AdminViewStaffs from "./admin/AdminStaffs/AdminStaffs";
import AdminViewClasses from "./admin/AdminClasses/AdminViewClasses";

import AdminViewSubjectScores from "./admin/AdminSubjectScore/AdminViewSubjectScores";
import AdminViewResult from "./admin/AdminResult/AdminViewResult";
import AdminViewSelectedScores from "./admin/AdminSubjectScore/AdminViewSelectedScores";
import AdminStudentResult from "./admin/AdminStudentResult/AdminStudentResult";
import AdminViewGrades from "./admin/AdminGrade/AdminViewGrade";
import AdminCutOffMark from "./admin/AdminCutOffMark/AdminCutOffMark";
import AdminScratchCard from "./admin/AdminScratchCard/AdminScratchCard";
import AdminCreateGrade from "./admin/AdminGrade/AdminCreateGrade";
import AdminCreateMark from "./admin/AdminCutOffMark/AdminCreateMark";
import AdminCommutative from "./admin/AdminCommutativeResult/AdminCommutative";
import CreateCommutativeResult from "./admin/AdminCommutativeResult/CreateCommutativeResult";
import HomePage from "./components/Homepage/HomePage";
import UpdateClass from "./admin/AdminClasses/UpdateClass";
import UpdateSubjects from "./admin/AdminSubjects/UpdateSubjects";
import AdminViewSubjects from "./admin/AdminSubjects/AdminViewSubjects";
import UpdateSubjectScores from "./admin/AdminSubjectScore/UpdateSubjectScores";
import UpdateResult from "./admin/AdminResult/UpdateResult";
import { MyCommutativeResult } from "./screens/CheckResultScreen/MyCommutativeResult";
import AdminDirectorsRemark from "./admin/AdminDirectorsRemark/AdminDirectorsRemark";
import AdminViewDirectorsRemark from "./admin/AdminDirectorsRemark/AdminViewDirectorsRemark";
import AdminTeacherScore from "./admin/AdminTeacherScoreSheet/AdminTeacherScore";
import AdminSwitchCommulative from "./admin/AdminCommutativeResult/AdminSwitchCommulative";
import AdminUpdateStudentClass from "./admin/AdminStudents/AdminUpdateStudentClass";
import TeacherRole from "./admin/TeacherRole/TeacherRole";
import NoScratchCard from "./admin/AdminScratchCard/NoScratchCard";
import AdminViewCommulative from "./admin/AdminCommutativeResult/AdminViewCommulative";
import AdminStudentCommulative from "./admin/AdminStudentResult/AdminStudentCommulative";
import ScratchCardChecker from "./screens/ScratchCardCheck/ScratchCardChecker";
import AdminUpdateSchoolProfile from "./admin/AdminSchool/AdminUpdateSchoolProfile";
import ResetPassword from "./screens/ResetPssword Screen/ResetPassword";
import AdminResultBucklet from "./admin/AdminResultBucklet/ViewResultBucklet";
import AdminCommulativeBucklet from "./admin/AdminCommulativeBucklet/AdminCommulativeBucklet";

function App() {
  return (
    <>
      <Routes>
        {/* home route */}
        <Route path="/" element={<HomePage />} />
        {/* home route */}
        {/* school route */}
        <Route path="/School-login" element={<SchoolLogin />} />
        <Route path="/RegisterSchool" element={<SchoolRegister />} />
        {/* school route */}
        {/* user routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-register" element={<StaffRegister />} />
        {/* user route */}
        {/* check result routes */}
        <Route path="/online-result" element={<ScratchCardChecker />} />
        <Route path="/check-result" element={<SelectResultCheck />} />
        <Route path="/Result-check" element={<ResultChecker />} />
        {/* <Route
          path="/my-result/:selectedSchool/:selectedClass/:userId/:selectedYear/:selectedTerm"
          element={<MyResult />}
        /> */}
        <Route
          path="/my-result/:selectedSchool/:selectedClass/:userId/:selectedTerm/:selectedYear"
          element={<MyResult />}
        />
        <Route
          path="/my-commutative-result/:selectedSchool/:selectedClass/:userId/:selectedYear/"
          element={<MyCommutativeResult />}
        />
        {/* check result routes */}
        {/* commutative result */}
        <Route
          path="/commutative-Result-check"
          element={<CommutativeResultChecker />}
        />
        {/* commutative result */}
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/view-student" element={<AdminViewStudents />} />
        <Route
          path="/updateuserclassby-admin/:id"
          element={<AdminUpdateStudentClass />}
        />
        <Route path="/view-staffs" element={<AdminViewStaffs />} />
        <Route
          path="/update-user-role-by-admin/:id"
          element={<TeacherRole />}
        />

        <Route path="/create-class" element={<AdminCreateClass />} />
        <Route path="/view-class" element={<AdminViewClasses />} />
        <Route path="/update-class/:id" element={<UpdateClass />} />
        <Route path="/create-subject" element={<AdminCreateSubject />} />
        <Route path="/view-subjects" element={<AdminViewSubjects />} />
        <Route path="/update-subject/:id" element={<UpdateSubjects />} />
        <Route
          path="/view-selected-subject-marks"
          element={<AdminViewSelectedScores />}
        />
        <Route path="/subject-score" element={<AdminSubjectScore />} />
        <Route
          path="/view-subject-marks"
          element={<AdminViewSelectedScores />}
        />
        <Route
          path="/update-subject-scores/:id"
          element={<UpdateSubjectScores />}
        />
        <Route
          path="/student-subject-score/:id/:selectedClass/:selectedSchool"
          element={<StudentSubjectScores />}
        />
        <Route path="/create-result" element={<AdminCreateResult />} />
        <Route path="/viewResult" element={<AdminViewResult />} />
        <Route
          path="/view-student-result/:id"
          element={<AdminStudentResult />}
        />
        <Route path="/update-student-result/:id" element={<UpdateResult />} />
        <Route
          path="/student-result-create/:id/:selectedClass/:selectedSchool"
          element={<CreateStudentResult />}
        />
        <Route path="/create-grade" element={<AdminCreateGrade />} />
        <Route path="/view-grade" element={<AdminViewGrades />} />
        <Route path="/view-marks" element={<AdminCutOffMark />} />
        <Route path="/create-marks" element={<AdminCreateMark />} />
        <Route
          path="/view-result-remark"
          element={<AdminViewDirectorsRemark />}
        />

        <Route path="/generate-card" element={<AdminScratchCard />} />
        <Route path="/disable-scratchCard" element={<NoScratchCard />} />

        <Route path="/create-commutative" element={<AdminCommutative />} />
        <Route path="/view-commulative" element={<AdminViewCommulative />} />
        <Route
          path="/view-student-commulative/:id"
          element={<AdminStudentCommulative />}
        />
        <Route path="/admin-update" element={<AdminUpdateSchoolProfile />} />

        {/* <Route
          path="/student-Commutative-result-create/:id/:selectedClass/:selectedSchool"
          element={<CreateCommutativeResult />}
        /> */}
        <Route
          path="/student-Commutative-result-create/:id/:selectedClass/:selectedSchool"
          element={<AdminSwitchCommulative />}
        />
        <Route
          path="/create-result-remark"
          element={<AdminDirectorsRemark />}
        />
        <Route
          path="/view-directors-remark"
          element={<AdminViewDirectorsRemark />}
        />
        <Route
          path="/viewCommulativeResult"
          element={<AdminViewCommulative />}
        />
        <Route path="/create-score-sheet" element={<AdminTeacherScore />} />
        {/* admin result bucklet */}
        <Route path="/viewResultBooklet" element={<AdminResultBucklet />} />
        <Route
          path="/view-commulative-booklet"
          element={<AdminCommulativeBucklet />}
        />

        {/* Admin */}
      </Routes>
    </>
  );
}

export default App;
