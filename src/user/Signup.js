import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signup = () => {
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-12 text-left">
          <form>
            <div className="form-group ">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>
            <div class="d-grid gap-2 my-3">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user to signup!">
      {signUpForm()}
    </Base>
  );
};

export default Signup;
