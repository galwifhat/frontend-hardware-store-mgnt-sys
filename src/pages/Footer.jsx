import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#333446] text-[#333446] text-3xl text-center mt-8 flex flex-col justify-evenly pt-2">
        <div className="flex gap-4 justify-end pr-10">
          <button className="px-4 py-2 text-xl  bg-[#B8CFCE] text-[#333446]  font-semibold rounded transition-colors hover:text-blue-700">
            <a href="#">Back to top</a>
          </button>
        </div>
        <p className="text-xl h-[50px]  text-[#B8CFCE] ">
          {" "}
          &copy;2025 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
