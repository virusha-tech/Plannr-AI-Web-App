import React from "react";
import { Link } from "react-router-dom";

function Preview(props) {
  console.log(props);

  return (
    <div>
      Preview
      {/* <Link to="https://dev.plannr.ai/">Home</Link> */}
      <Link to="https://beta.plannr.ai/">Go to subdomain</Link>
      <a href="https://beta.plannr.ai/">Go to subdomain</a>
      {/* <button onClick={}>Check our more services</button> */}
    </div>
  );
}

export default Preview;
