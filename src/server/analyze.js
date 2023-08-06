const axios = require("axios");
const baseurl = "https://api.meaningcloud.com/sentiment-2.1";
const analyze = async (url, key) => {
  const analysis = await axios
    .get(`${baseurl}?key=${key}&url=${url}&lang=en`)
    .then((response) => {
      const { code } = response.data.status;
      const { msg } = response.data.status;
      if (code == 100) {
        return handleError(code, "Please enter a valid URL for Analysis");
      } else if (code == 212) {
        return handleError(code, msg);
      }
      return handleSuccess(response.data, code);
    });

  return analysis;
};

const handleError = (code, msg) => {
  const error = {
    code: code,
    msg: msg,
  };
  return error;
};

const handleSuccess = (data, code) => {
  const { agreement, subjectivity, confidence, score_tag, irony } = data;
  const sample = {
    score_tag,
    agreement,
    subjectivity,
    confidence,
    irony,
  };
  const result = {
    sample,
    code,
  };
  return result;
};

module.exports = { analyze };
