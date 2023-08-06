import axios from "axios";
import { isValidURL } from "./urlValid";
const input = document.querySelector("#inputfield");
const form = document.querySelector(".form");
const error = document.querySelector("#error");
const results = document.querySelectorAll("#results div");

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isValidURL(input.value)) {
    show_error("Invalid URL, Please enter a valid URL");
    return;
  }

  const response = await axios.post(
    "http://localhost:8000/",
    { input: input.value },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { msg, sample } = response.data;
  if (msg) {
    show_error(msg);
    return;
  }
  show_results(sample);
};

const show_error = (msg) => {
  error.innerHTML = msg;
  error.style.display = "block";
  results.forEach((result) => {
    result.style.display = "none";
  });
};

const show_results = (sample) => {
  error.style.display = "none";
  results.forEach((result) => {
    result.style.display = "block";
  });
  document.querySelector(
    "#agreement"
  ).innerHTML = `Agreement: ${sample.agreement}`;
  document.querySelector(
    "#subjectivity"
  ).innerHTML = `Subjectivity: ${sample.subjectivity}`;
  document.querySelector(
    "#confidence"
  ).innerHTML = `Confidence: ${sample.confidence}`;
  document.querySelector("#irony").innerHTML = `Irony: ${sample.irony}`;
  document.querySelector(
    "#score_tag"
  ).innerHTML = `Score Tag: ${sample.score_tag}`;
};
export { handleSubmit };
