import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import AccountInformation from "./AccountInformation";
// import { ProfileOverview } from "./ProfileOverview";
// import ChangePassword from "./ChangePassword";
import PersonaInformation from "./PersonaInformation";
// import EmailSettings from "./EmailSettings";
import { ProfileCard } from "./components/ProfileCard";

export default function UserProfilePage() {

  return (
    <div className="d-flex flex-row">
      <ProfileCard></ProfileCard>
      <div className="flex-row-fluid ml-lg-8">
        <Switch>
          <Redirect
            from="/user-profile"
            exact={true}
            to="/user-profile/informacion-personal"
          />
          {/* <Route
            path="/user-profile/account-information"
            component={AccountInformation}
          />
          <Route
            path="/user-profile/change-password"
            component={ChangePassword}
          />
          <Route
            path="/user-profile/email-settings"
            component={EmailSettings}
          /> */}
          <Route
            path="/user-profile/informacion-personal"
            component={PersonaInformation}
          />
        </Switch>
      </div>
    </div>
  );
}
