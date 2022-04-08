import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "types/IContact";

interface IState {
  isAuth: boolean;
  contacts: IContact[];
  update: {},
}

const initialState: IState = {
  isAuth: false,
  contacts: [],
  update: {},
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
  },
});

export const {
  setIsAuth,
  setContactList,
  forceUpdate,
} = mainSlice.actions;

export default mainSlice.reducer;