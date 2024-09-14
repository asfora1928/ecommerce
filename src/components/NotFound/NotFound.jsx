import styles from "./NotFound.module.css";
import error from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={error} alt="not found" />
    </div>
  );
}
