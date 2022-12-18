import React from "react";

export default function Profile() {
  return (
    <div className="profile flex flex-col p-8 gap-2 justify-center items-center content-center">
      <div className="profile-item w-full">
        <form>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <label className="input-group w-full">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter your Name"
                className="input input-bordered"
              />
            </label>

            <button type="submit" className="btn bg-accent text-accent-content w-full">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item w-full">
        <form action="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Enter Height in cm</span>
            </label>
            <label className="input-group w-full">
              <span>Height</span>
              <input
                type="text"
                placeholder="10"
                className="input input-bordered"
              />
              <span>cm</span>
            </label>
          </div>
          <button type="submit" className="btn bg-accent text-accent-content w-full">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item w-full">
        <form action="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select your gender</span>
            </label>
            <label className="input-group">
              <span>Gender</span>
            <select className="select select-accent w-[80%]">
              <option disabled selected>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            </label>
            <button type="submit" className="btn bg-accent text-accent-content w-full">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item w-full">
      <form action="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select your age</span>
            </label>
            <label className="input-group w-full">
              <span>Age</span>
              <input type="range" min="18" max="100" className="range range-accent w-full" />
            </label>
            <button type="submit" className="btn bg-accent text-accent-content">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item">
        <form action="">
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form action="">
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form action="">
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form action=""></form>
      </div>
      <div className="profile-item">
        <form action=""></form>
      </div>
    </div>
  );
}
