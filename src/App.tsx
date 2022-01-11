import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.sass";
import { BlockComments } from "./components";
import { fetchCommentsThunk } from "./store/actions/commentsActions";
import { AppStateType } from "./store/reducers/index";

function App() {
  const dispatch = useDispatch();
  const updated = useSelector(
    ({ comments }: AppStateType) => comments.isUpdate
  );

  useEffect(() => {
    dispatch(fetchCommentsThunk("comments"));
    dispatch(fetchCommentsThunk("replies"));
  }, [dispatch, updated]);

  return (
    <div className="App">
      <div className="container">
        <BlockComments />
      </div>
    </div>
  );
}

export default App;
