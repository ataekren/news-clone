import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsItem {
  id: number;
  title: string;
  date: string;
}

interface HistoryItem extends NewsItem {
  lastVisited: string; // Timestamp when the news was last visited
}

interface HistoryState {
  visitedNews: HistoryItem[];
}

const initialState: HistoryState = {
  visitedNews: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<NewsItem>) => {
      // Check if news already exists in history
      const existingIndex = state.visitedNews.findIndex(item => item.id === action.payload.id);
      
      // Create timestamp for the current visit
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + 
                        now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
      
      // Create history item with timestamp
      const historyItem: HistoryItem = {
        ...action.payload,
        lastVisited: timestamp
      };
      
      // If it exists, remove it so we can add it to the top
      if (existingIndex !== -1) {
        state.visitedNews.splice(existingIndex, 1);
      }
      
      // Add to the beginning of the array (most recent)
      state.visitedNews.unshift(historyItem);
      
      // Keep only the last 10 items
      if (state.visitedNews.length > 10) {
        state.visitedNews = state.visitedNews.slice(0, 10);
      }
    },
    clearHistory: (state) => {
      state.visitedNews = [];
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
