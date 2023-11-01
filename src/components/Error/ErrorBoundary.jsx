import React from "react";
import Button from "./Button"
import Icon from "./IconComponents"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
    console.log(this.state.hasError);
  }

  refreshComponent = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <h1>Something went wrong. Try reloading</h1>
          <React.Suspense fallback={<div>Loading</div>}>
            <Button
              style={{ borderRadius: "50px", padding: "5px 15px" }}
              btntype={"btn-main"}
              click={this.refreshComponent}
            >
              <Icon
                name="AiOutlineReload"
                style={{ display: "inherit" }}
                size={17}
              />{" "}
              Retry
            </Button>
          </React.Suspense>
        </div>
      );
    }

    return this.props.children;
  }
}