import Link from "next/link";
import React from "react";

const FeedbackFooter = () => {
  return (
    <div className="feedbackContainer flex justify-center items-center flex-col gap-4 my-10">
      <h1>
        Provide{" "}
        <span className="text-red-500 cursor-pointer hover:text-red-700 hover:underline "><Link href="/feedback">
          Feeback
        </Link>
        </span>{" "}
        for you Experience
      </h1>
    </div>
  );
};

export default FeedbackFooter;
