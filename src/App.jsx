import CreateIdForm from "./components/CreateIdForm/CreateIdForm";

function App() {
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <CreateIdForm onSubmit={onSubmit} />
    </>
  );
}

export default App;
