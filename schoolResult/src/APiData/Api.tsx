import { Base_Url } from "./BaseUrl";

// for school registration & auth
export const RegisterSchool = `${Base_Url}/api/AuthSchool/`;
export const LoginSchool = `${Base_Url}/api/AuthSchool/schoolLogin/`;
export const getAllSchools = `${Base_Url}/api/School/`;

///User Api
export const UserApi = `${Base_Url}/api/Users/`;
export const StaffsApi = `${Base_Url}/api/staffs/`;
export const StudentLoginApi = `${Base_Url}/api/auth/student-logins/`;
export const StaffLoginApi = `${Base_Url}/api/staffs/login/`;
export const RegisterStudentApi = `${Base_Url}/api/auth/registers/`;
export const RegisterStaffApi = `${Base_Url}/api/staffs/registers/staffs`;
export const ResetPasswordStudentApi = `${Base_Url}/api/auth/reset-user-password/`;

export const UpdateStudentClassApi = `${Base_Url}/api/users/currentclasses/`;
export const AchiveStudentApi = `${Base_Url}/api/users/archiveStudent/`;
/////Class APi
export const ClassApi = `${Base_Url}/api/Class/`;
export const UpdateClassApi = `${Base_Url}/api/Class/update/`;
export const DeleteClassApi = `${Base_Url}/api/Class/delete/`;
export const DeleteClassByAdminApi = `${Base_Url}/api/Class/delete`;

/////Subjects APi
export const SubjectsApi = `${Base_Url}/api/Subjects/`;
export const UpdateSubjectsApi = `${Base_Url}/api/Subjects/update/`;
export const DeleteSubjectsApi = `${Base_Url}/api/Subjects/delete/`;
export const DeleteSubjectsByAdminApi = `${Base_Url}/api/Subjects/delete/`;

/////Subjects Markks APi
export const SubjectMarksApi = `${Base_Url}/api/SubjectMarks/`;
export const UpdateSubjectMarksApi = `${Base_Url}/api/SubjectMarks/updated/`;
export const DeleteSubjectMarksApi = `${Base_Url}/api/SubjectMarks/delete/`;
export const DeactivateSubjectMarksEdithApi = `${Base_Url}/api/SubjectMarks/deactivateResultEdit/`;

////Teacher Api
export const TeacherRoleApi = `${Base_Url}/api/Role/`;
////Deactivate Scratch card  Api
export const DeactivateScratchCradApi = `${Base_Url}/api/NoScratchCard/`;
////Result Api
export const ResultApi = `${Base_Url}/api/Results/`;
export const UpdateResultApi = `${Base_Url}/api/Results/update/`;
export const ResultPositionApi = `${Base_Url}/api/Results/update-positions-tie/`;
export const ResultDeactivateEditApi = `${Base_Url}/api/Results/deactivateResultEdit/`;
export const ResultCheckApi = `${Base_Url}/api/Results/results/`;

///Grade Api
export const GradeApi = `${Base_Url}/api/Grade/`;

///CutOffMark Api
export const CutOffMarkApi = `${Base_Url}/api/Ranks/`;

export const DirectorsRemarkApi = `${Base_Url}/api/DirectorsGrade/`;
////// Commulative Result Api
export const CommulativeApi = `${Base_Url}/api/Commutative/`;
export const CommulativeCheckApi = `${Base_Url}/api/Commutative/results/`;
export const CommulativePositionApi = `${Base_Url}/api/Commutative/update-positions/`;
export const CommulativeDeactivateEditApi = `${Base_Url}/api/Commutative/deactivateResultEdit/`;

export const ScratchCardApi = `${Base_Url}/api/ScratchCard/`;
export const ScratchCardLoginApi = `${Base_Url}/api/ScratchCard/scratchcard-login/`;
export const scratchCardUsageApi = `${Base_Url}/api/ScratchCard/usageCounts/`;
//////ProductMarkter
export const ProductMarketerApi = `${Base_Url}/api/ProductMarketer/`;
///updateSchoolApi
export const UpdateSchoolApi = `${Base_Url}/api/AuthSchool/update/`;
//////ScratchCardPayment
export const PaymentScratchApi = `${Base_Url}/api/ScratchCardPayment/`;
// country api

export const countryApi = "https://restcountries.com/v3.1/all";
