import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";
import BlogsList from "./views/blog/BlogsList";
import HeaderTitle from "./components/HeaderTitle";

const App = () => {
  return (
    <>
      <HeaderTitle title={miladiToShamsiAndShahanshahi(new Date(), 2)} />
      <BlogsList />
    </>
  );
};

export default App;
