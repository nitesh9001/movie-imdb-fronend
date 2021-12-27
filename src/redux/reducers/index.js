import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { genreReducer } from "./genreReducer";
import { movieReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { SNACKBAR_SHOW } from "./snackBar";

const rootReducer = combineReducers({
    auth: authReducer,
    snackBar: SNACKBAR_SHOW,
    genre: genreReducer,
    movie: movieReducer,
    search: searchReducer
});

export default rootReducer;
