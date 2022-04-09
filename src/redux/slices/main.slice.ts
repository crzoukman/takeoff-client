import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "types/IContact";

interface IState {
  isAuth: boolean;
  contacts: IContact[];
  update: {},
  isLoading: boolean;
}

const initialState: IState = {
  isAuth: false,
  contacts: [],
  update: {},
  isLoading: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setContactList: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = action.payload;
    },
    forceUpdate: (state, action: PayloadAction<{}>) => {
      state.update = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setIsAuth,
  setContactList,
  forceUpdate,
  setIsLoading,
} = mainSlice.actions;

export default mainSlice.reducer;