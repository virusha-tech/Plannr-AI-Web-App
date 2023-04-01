import React, { Component } from "react";
import Tool from "./Core/Tool";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Preview extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let res = await this.props.store.api.get(`/free/guest`);
    this.props.store.loginAsGuest(res.data);
  }

  render() {
    return (
      <div>
        <Tool {...this.props} isFreeVersion={true} />
        {/* <a href="https://beta.plannr.ai/">Go to subdomain</a> */}
      </div>
    );
  }
}

export default Preview;
