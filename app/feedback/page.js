"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
    const [result, setResult] = React.useState("");
    const router = useRouter();
     const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "c2b18596-4ead-47d7-8aac-d66830dc26e7");

    const object = Object.fromEntries(formData.entries());
    if (!object.name || object.name.trim() === '') {
        object.name = "null";
    }
    const json = JSON.stringify(object);
    console.log(json);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      body: json,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      router.push("/success");
      
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center mt-10 sm:w-[50%] items-center">
      <h1 className="text-2xl font-bold mb-4">Fill Your Feedback</h1>
      <form className="max-w-md w-full flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Type your name here (Optional)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            placeholder="Type your feedback here"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
export default Page;