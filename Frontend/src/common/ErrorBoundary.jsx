import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  reset = () => this.setState({ hasError: false });
  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallbackComponent;
      return Fallback
        ? <Fallback resetError={this.reset} error={new Error()} />
        : <h2 className="p-8 text-center text-red-600">{this.props.fallbackMessage || "Something went wrong"}</h2>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
