import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userProfiles/UserProfileList";
import UserProfileDetails from "./userProfiles/UserProfileDetails";
import ChoresList from "./chores/ChoresList";
import ChoreDetails from "./chores/ChoreDetails";
import CreateChore from "./chores/CreateChore";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="userprofiles">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UserProfileList />
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UserProfileDetails />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="chores">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoresList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <CreateChore />
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <ChoreDetails />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}