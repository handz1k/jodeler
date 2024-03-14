const ErrorNotification = ({ message }) => {
  return (
    <div>
      <p className="notification" style={{ color: "red" }}>
        {message}
      </p>
    </div>
  );
};

export default ErrorNotification;
