import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "util/Axios";

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const jumpDataAction = createAsyncThunk(`jump/get`, async (level) => {
  let response = [
    {
      wholeSentence: "엄마랑 공원에 놀러 가요",
      result: [
        { word: `엄마랑`, url: "1_1_엄마랑.mp3" },
        { word: `공원에`, url: "1_2_공원에.mp3" },
        { word: `놀러`, url: "1_3_놀러.mp3" },
        { word: `가요`, url: "1_4_가요.mp3" },
      ],
    },
  ];
  try {
    response = await instance.get(`game/jump/${level}`);
  } catch (el) {
    console.error(el);
  }
  return response;
});

const initialState = {
  actionWord: -1,
  problems: [
    {
      wholeSentence: "엄마랑 공원에 놀러 가요",
      result: [
        { word: `엄마랑`, url: "1_1_엄마랑.mp3" },
        { word: `공원에`, url: "1_2_공원에.mp3" },
        { word: `놀러`, url: "1_3_놀러.mp3" },
        { word: `가요`, url: "1_4_가요.mp3" },
      ],
    },
  ],
};

export const jumpSlice = createSlice({
  name: "jump",
  initialState,
  reducers: {
    nextAction: (state) => {
      state.actionWord = state.actionWord + 1;
    },
    setAction: (state, { payload }) => {
      state.actionWord = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(jumpDataAction.pending, (state) => {})
      .addCase(jumpDataAction.fulfilled, (state, action) => {
        const result = [];
        action.payload.forEach((el) => {
          const { jumpWordList, fileNameList } = el;
          const tmp = jumpWordList.map((item, idx) => {
            return { ...item, url: `${fileNameList[idx]}.mp3` };
          });

          result.push({ wholeSentence: el.wholeSentence, result: tmp });
        });

        state.problems = result;
      });
  },
});

export const jumpActions = jumpSlice.actions;

export default jumpSlice.reducer;
