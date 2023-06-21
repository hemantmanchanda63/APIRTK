import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const createUser = createAsyncThunk("createuser", async (data) => {
  console.log(data, "adduser");
  try {
    const response = await axios.post(
      "https://6488155a0e2469c038fce7f1.mockapi.io/Add",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      return response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const Readuser = createAsyncThunk("readuser", async () => {
  try {
    const response = await axios.get(
      "https://6488155a0e2469c038fce7f1.mockapi.io/Add",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const Deleteuser = createAsyncThunk("deleteuser", async (id) => {
  console.log(id, "deleteuser ");
  try {
    const response = await axios.delete(
      `https://6488155a0e2469c038fce7f1.mockapi.io/Add/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
  console.log(data, "updateUser");
  try {
    const response = await axios.put(
      `https://6488155a0e2469c038fce7f1.mockapi.io/Add/${data.id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      return response;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const crudSlice = createSlice({
  name: "crud",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData:[]
  },

  reducers:{
    searchuser: (state,action)=>{
      state.searchData= action.payload 
    }
  },

  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    [Readuser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [Readuser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [Readuser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    [Deleteuser.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [Deleteuser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload, "this is del response");
      const { id } = action.payload;
      if (id) {
        state.users = state.users.data?.filter((item) => item.id !== id);
      }
    },
    [Deleteuser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.users.push(action.payload);
      console.log(state.users, "hi");
      state.users = state.users.map((item)=>
        item.id === action.payload.id? action.payload : item
      )
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
console.log(crudSlice.actions);
export const {searchuser} = crudSlice.actions;

export default crudSlice.reducer;
