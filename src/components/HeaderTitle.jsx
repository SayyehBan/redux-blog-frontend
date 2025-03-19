import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const HeaderTitle = ({ title }) => {
  const [asyncTitle, setAsyncTitle] = useState(title);

  useEffect(() => {
    setAsyncTitle(title);
  }, [title]);

  return (
    <Helmet>
      <title>{asyncTitle}</title>
    </Helmet>
  );
};
export default HeaderTitle;
