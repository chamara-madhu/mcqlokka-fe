import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LESSON_CREATE_PATH,
  ADMIN_LESSON_MANAGE_PATH,
  ADMIN_PAPER_CREATE_PATH,
  ADMIN_PAPER_MANAGE_PATH,
  ADMIN_QUESTION_CREATE_PATH,
  ADMIN_QUESTION_MANAGE_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MCQ_EXAM_RESULTS_PATH,
  MCQ_EXAM_MODE_PATH,
  MCQ_SECTION_PATH,
  MY_PROFILE_PATH,
  MY_PURCHASING_HISTORY_PATH,
  REGISTER_PATH,
  MY_RESULTS_PATH,
  ADMIN_ALL_USERS_PATH,
  ADMIN_ALL_PAYMENTS_PATH,
  ADMIN_PAPER_EDIT_PATH,
  ADMIN_LESSON_EDIT_PATH,
  ADMIN_QUESTION_EDIT_PATH,
  ADMIN_EXTRACT_QUESTION_PATH,
  ADMIN_GENERATE_MODEL_QUESTION_PATH,
  MCQS_BY_LESSON_PATH,
  PRICING_PATH,
  SUBJECT_PAPERS_PATH,
  CART_PATH,
  CHECKOUT_PATH,
  ABOUT_PATH,
  ADMIN_SUBJECT_CREATE_PATH,
  ADMIN_SUBJECT_EDIT_PATH,
  ADMIN_SUBJECT_MANAGE_PATH,
  VERIFY_ACCOUNT_PATH,
  MY_SUBJECTS_PATH,
  CONTACT_PATH,
  MCQ_LEARNING_MODE_PATH,
  ADMIN_BULK_LESSON_CREATE_PATH,
} from "./constants/routes";
import Paper from "./pages/students/Paper";
import CreatePaper from "./pages/admin/paper/CreatePaper";
import ManagePaper from "./pages/admin/paper/ManagePaper";
import CreateLesson from "./pages/admin/lesson/CreateLesson";
import ManageLesson from "./pages/admin/lesson/ManageLesson";
import CreateQuestion from "./pages/admin/question/CreateQuestion";
import MCQStart from "./pages/MCQStart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import "./styles/custom-styles.css";
import ManageQuestion from "./pages/admin/question/ManageQuestion";
import Dashboard from "./pages/admin/Dashboard";
import Mark from "./pages/students/Mark";
import Profile from "./pages/students/Profile";
import PurchasingHistory from "./pages/students/PurchasingHistory";
import MyResults from "./pages/students/MyResults";
import { auth_token, isAdmin, isStudent } from "./auth/auth";
import AllUsers from "./pages/admin/reports/AllUsers";
import AllPayments from "./pages/admin/reports/AllPayments";
import ScanQuestion from "./pages/admin/AI/ScanQuestion";
import GenerateModelPaper from "./pages/admin/AI/GenerateModelPaper";
import MCQsByLesson from "./pages/MCQsByLesson";
import AllSubjects from "./pages/AllSubjects";
import Pricing from "./pages/Pricing";
import AllPapersBySubject from "./pages/AllPapersBySubject";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import CreateSubject from "./pages/admin/subject/CreateSubject";
import ManageSubject from "./pages/admin/subject/ManageSubject";
import VerifyAccount from "./pages/VerifyAccount";
import MySubjects from "./pages/students/MySubjects";
import Contact from "./pages/Contact";
import PaperLearning from "./pages/students/PaperLearning";
import CreateBulkLesson from "./pages/admin/lesson/CreateBulkLesson";

function App() {
  // Create a private route for passengers
  const StudentRoute = () => {
    return auth_token() && isStudent() ? <Outlet /> : <Navigate to="/login" />;
  };

  // Create a private route for admins
  const AdminRoute = () => {
    return auth_token() && isAdmin() ? <Outlet /> : <Navigate to="/login" />;
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    return <Navigate to={LOGIN_PATH} />;
  };

  const LoginRoute = () => {
    return auth_token() ? (
      isAdmin() ? (
        <Navigate to={ADMIN_DASHBOARD_PATH} />
      ) : isStudent() ? (
        <Navigate to={HOME_PATH} />
      ) : (
        handleLogout()
      )
    ) : (
      <Outlet />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={LOGIN_PATH} element={<LoginRoute />}>
          <Route exact path={LOGIN_PATH} element={<Login />} />
        </Route>
        <Route exact path={REGISTER_PATH} element={<LoginRoute />}>
          <Route exact path={REGISTER_PATH} element={<SignUp />} />
        </Route>

        <Route exact path={VERIFY_ACCOUNT_PATH} element={<LoginRoute />}>
          <Route path={VERIFY_ACCOUNT_PATH} element={<VerifyAccount />} />
        </Route>

        <Route path={MCQS_BY_LESSON_PATH} exact element={<MCQsByLesson />} />

        <Route path={ABOUT_PATH} exact element={<About />} />
        <Route path={CONTACT_PATH} exact element={<Contact />} />
        <Route path={HOME_PATH} exact element={<AllSubjects />} />
        <Route
          path={SUBJECT_PAPERS_PATH}
          exact
          element={<AllPapersBySubject />}
        />
        <Route path={CART_PATH} exact element={<Cart />} />
        <Route path={CHECKOUT_PATH} exact element={<Checkout />} />

        <Route path={MCQ_SECTION_PATH} exact element={<MCQStart />} />

        <Route path={PRICING_PATH} exact element={<Pricing />} />

        <Route exact path={MCQ_EXAM_MODE_PATH} element={<StudentRoute />}>
          <Route path={MCQ_EXAM_MODE_PATH} exact element={<Paper />} />
        </Route>

        <Route exact path={MCQ_LEARNING_MODE_PATH} element={<StudentRoute />}>
          <Route path={MCQ_LEARNING_MODE_PATH} exact element={<PaperLearning />} />
        </Route>

        <Route exact path={MCQ_EXAM_RESULTS_PATH} element={<StudentRoute />}>
          <Route path={MCQ_EXAM_RESULTS_PATH} exact element={<Mark />} />
        </Route>

        <Route exact path={ADMIN_DASHBOARD_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_DASHBOARD_PATH} exact element={<Dashboard />} />
        </Route>

        <Route exact path={ADMIN_SUBJECT_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_SUBJECT_CREATE_PATH}
            exact
            element={<CreateSubject />}
          />
        </Route>

        <Route exact path={ADMIN_SUBJECT_EDIT_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_SUBJECT_EDIT_PATH}
            exact
            element={<CreateSubject />}
          />
        </Route>

        <Route exact path={ADMIN_SUBJECT_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_SUBJECT_MANAGE_PATH}
            exact
            element={<ManageSubject />}
          />
        </Route>

        <Route exact path={ADMIN_PAPER_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_PAPER_CREATE_PATH}
            exact
            element={<CreatePaper />}
          />
        </Route>

        <Route exact path={ADMIN_PAPER_EDIT_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_PAPER_EDIT_PATH} exact element={<CreatePaper />} />
        </Route>

        <Route exact path={ADMIN_PAPER_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_PAPER_MANAGE_PATH}
            exact
            element={<ManagePaper />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_CREATE_PATH}
            exact
            element={<CreateLesson />}
          />
        </Route>

        <Route exact path={ADMIN_BULK_LESSON_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_BULK_LESSON_CREATE_PATH}
            exact
            element={<CreateBulkLesson />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_EDIT_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_EDIT_PATH}
            exact
            element={<CreateLesson />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_MANAGE_PATH}
            exact
            element={<ManageLesson />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_CREATE_PATH}
            exact
            element={<CreateQuestion />}
          />
        </Route>

        <Route
          exact
          path={ADMIN_EXTRACT_QUESTION_PATH}
          element={<AdminRoute />}
        >
          <Route
            path={ADMIN_EXTRACT_QUESTION_PATH}
            exact
            element={<ScanQuestion />}
          />
        </Route>

        <Route
          exact
          path={ADMIN_GENERATE_MODEL_QUESTION_PATH}
          element={<AdminRoute />}
        >
          <Route
            path={ADMIN_GENERATE_MODEL_QUESTION_PATH}
            exact
            element={<GenerateModelPaper />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_EDIT_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_EDIT_PATH}
            exact
            element={<CreateQuestion />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_MANAGE_PATH}
            exact
            element={<ManageQuestion />}
          />
        </Route>

        <Route exact path={MY_PROFILE_PATH} element={<StudentRoute />}>
          <Route path={MY_PROFILE_PATH} exact element={<Profile />} />
        </Route>

        <Route
          exact
          path={MY_PURCHASING_HISTORY_PATH}
          element={<StudentRoute />}
        >
          <Route
            path={MY_PURCHASING_HISTORY_PATH}
            exact
            element={<PurchasingHistory />}
          />
        </Route>

        <Route exact path={MY_SUBJECTS_PATH} element={<StudentRoute />}>
          <Route path={MY_SUBJECTS_PATH} exact element={<MySubjects />} />
        </Route>

        <Route exact path={MY_RESULTS_PATH} element={<StudentRoute />}>
          <Route path={MY_RESULTS_PATH} exact element={<MyResults />} />
        </Route>

        <Route exact path={ADMIN_ALL_USERS_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_ALL_USERS_PATH} exact element={<AllUsers />} />
        </Route>

        <Route exact path={ADMIN_ALL_PAYMENTS_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_ALL_PAYMENTS_PATH}
            exact
            element={<AllPayments />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
