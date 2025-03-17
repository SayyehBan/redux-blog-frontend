import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";

function App() {
  return (
    <>
      <div className="App">
        <p>نتیجه: {miladiToShamsiAndShahanshahi(new Date(), 1)}</p>
      </div>
    </>
  );
}

export default App;
