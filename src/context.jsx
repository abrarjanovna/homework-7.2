import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Loading from "./Loading";
import reducer from "./reducer";

const url = "https://course-api.com/react-tours-project";

const initialState = {
  loading: false,
  data: [],
  readmore: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [readMore, setReadMore] = useState(false);

  const removeTour = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const resp = await fetch(url);
    const items = await resp.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: items });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.loading)
    return (
      <main>
        <Loading />
      </main>
    );

  if (state.data.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <div className="underline"></div>
          <button className="btn" onClick={() => fetchData()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <AppContext.Provider
      value={{
        readMore,
        setReadMore,
        removeTour,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
