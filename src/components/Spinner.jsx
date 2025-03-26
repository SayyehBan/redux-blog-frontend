const Spinner = ({ text = "", size = "5em" }) => {
  const Header = text ? <h4>{text}</h4> : null;
  return (
    <div className="spinner">
      {Header}
      <div className="loader" style={{ width: size, height: size }}></div>
    </div>
  );
};
export default Spinner;
