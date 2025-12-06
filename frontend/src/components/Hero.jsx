import React from "react";
import heroImage from "../../src/assets/images/heroImage.png";
import { Link } from "react-router-dom";
import { storage } from "../utils/storage";
import {useEffect} from "react";

const Hero = () => {
  const user = storage.getUser();
  const isLoggedIn = storage.isLoggedIn();
  useEffect(() => {
    
  }, [user]);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen bg-slate-300">
        {isLoggedIn && user && (
          <div className="absolute top-20 left-10 alert alert-success w-fit">
            <span>
              Welcome, <strong>{user.name}</strong>!
            </span>
          </div>
        )}

        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={heroImage}
            alt="Nutrition Tracking"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Track Your Nutrition Daily</h1>
            <p className="py-6">
              Monitor your daily calorie intake, macronutrients, and food
              consumption with our intelligent nutrition tracker. Get instant
              insights into your eating habits and make informed dietary choices
              for a healthier lifestyle.
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              {!isLoggedIn && (
                <Link to="/login">
                  <button className="btn font-bold btn-primary bg-blue-400 p-5 hover:bg-blue-500">
                    Login
                  </button>
                </Link>
              )}

              <Link to="/analyze">
                <button className="btn font-bold btn-success bg-green-500 p-5 hover:bg-green-600">
                  Analyze Food
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
