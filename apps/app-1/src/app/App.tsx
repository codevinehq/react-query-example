import { useModifySettings, useSettings } from '@react-query-example/api/settings/hooks';

const Loader = () => <div data-testid="loader">Loading...</div>;

const Form = () => {
  const { data } = useSettings('1');
  const modifySettings = useModifySettings();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          modifySettings.mutate({
            companyId: '1',
            settings: {
              name: formData.get('name') as string,
            },
          });
        }}
      >
        <div>
          <label className="mr-2" htmlFor="name">
            Name
          </label>
          <input id="name" type="text" name="name" defaultValue={data?.name} required className="border px-2" />
        </div>
        <br />
        <button className="border-2 px-2 py-1 rounded hover:bg-gray-200" disabled={modifySettings.isPending}>
          Submit
        </button>
      </form>
    </>
  );
};

function App() {
  const { data, isLoading } = useSettings('1');

  return (
    <div className="m-8">
      <h1 className="font-bold text-xl mb-2">Hello</h1>

      <div className="mb-6">{isLoading ? <Loader /> : <Form />}</div>

      <p>
        Your name is: <strong>{data?.name ?? 'Anon'}</strong>
      </p>
    </div>
  );
}

export default App;
