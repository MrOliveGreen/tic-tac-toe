import React from "react";
import { AlertTemplateProps } from "react-alert";
import {
  InfoCircle as InfoIcon,
  HandThumbsUp as SuccessIcon,
  ExclamationCircle as ErrorIcon,
  X as CloseButton,
} from "react-bootstrap-icons";

import "./style.css";

const AlertTemplate: React.FC<AlertTemplateProps> = ({
  options: { type },
  message,
  style,
  close,
}) => {
  const Icon =
    type === "info" ? InfoIcon : type === "success" ? SuccessIcon : ErrorIcon;

  return (
    <div
      className="box-alert d-flex align-items-center text-white bg-dark rounded shadow-sm mt-2 px-4 py-3"
      style={style}
    >
      <Icon
        className={`text-${type === "error" ? "danger" : type}`}
        size={24}
      />
      <span className="flex-grow-1 mx-3">{message}</span>
      <CloseButton role="button" size={32} onClick={close} />
    </div>
  );
};

export default AlertTemplate;
