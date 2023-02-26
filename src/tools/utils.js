export const getSteps = () => {
  return ["Create Plan", "View & Modify"];
};
export const getSignUpSteps = () => {
  return ["Sign Up", "Basic Info", "Select Plan"];
};

export const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
