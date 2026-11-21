import { BookmarkItem, HistoryItem, StudyProgress } from '../types/anatomy';

const STORAGE_KEYS = {
  BOOKMARKS: 'anatomy_atlas_bookmarks_v1',
  HISTORY: 'anatomy_atlas_history_v1',
  PROGRESS: 'anatomy_atlas_progress_v1',
  PREFERENCES: 'anatomy_atlas_preferences_v1',
};

export interface UserPreferences {
  theme: 'dark' | 'light';
  hapticsEnabled: boolean;
  autoRotate: boolean;
  showLabels: boolean;
  highlightColor: string;
  renderQuality: 'high' | 'medium' | 'low';
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  hapticsEnabled: true,
  autoRotate: false,
  showLabels: true,
  highlightColor: '#06b6d4', // Cyan accent
  renderQuality: 'high',
};

const DEFAULT_PROGRESS: StudyProgress = {
  totalStructuresViewed: 0,
  quizzesCompleted: 0,
  quizAccuracy: 0,
  bookmarksCount: 0,
  systemMastery: {
    skeletal: 0,
    muscular: 0,
    ligamentous: 0,
    nervous: 0,
    cardiovascular: 0,
    organ: 0,
  },
};

export class StorageService {
  private static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading key ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving key ${key} to localStorage:`, e);
    }
  }

  // Bookmarks
  public static getBookmarks(): BookmarkItem[] {
    return this.getItem<BookmarkItem[]>(STORAGE_KEYS.BOOKMARKS, []);
  }

  public static addBookmark(item: Omit<BookmarkItem, 'id' | 'timestamp'>): BookmarkItem {
    const bookmarks = this.getBookmarks();
    const existingIndex = bookmarks.findIndex((b) => b.structureId === item.structureId);
    
    if (existingIndex >= 0) {
      return bookmarks[existingIndex];
    }

    const newBookmark: BookmarkItem = {
      ...item,
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };

    bookmarks.unshift(newBookmark);
    this.setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
    this.updateProgressBookmarksCount(bookmarks.length);
    return newBookmark;
  }

  public static removeBookmark(structureId: string): void {
    const bookmarks = this.getBookmarks().filter((b) => b.structureId !== structureId);
    this.setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
    this.updateProgressBookmarksCount(bookmarks.length);
  }

  public static isBookmarked(structureId: string): boolean {
    return this.getBookmarks().some((b) => b.structureId === structureId);
  }

  // History / Recently Viewed
  public static getHistory(): HistoryItem[] {
    return this.getItem<HistoryItem[]>(STORAGE_KEYS.HISTORY, []);
  }

  public static addToHistory(item: Omit<HistoryItem, 'timestamp'>): void {
    const history = this.getHistory().filter((h) => h.structureId !== item.structureId);
    history.unshift({
      ...item,
      timestamp: Date.now(),
    });
    // Keep top 50 items
    const truncated = history.slice(0, 50);
    this.setItem(STORAGE_KEYS.HISTORY, truncated);
    this.incrementViewedStructures();
  }

  // Progress
  public static getProgress(): StudyProgress {
    return this.getItem<StudyProgress>(STORAGE_KEYS.PROGRESS, DEFAULT_PROGRESS);
  }

  private static incrementViewedStructures(): void {
    const progress = this.getProgress();
    progress.totalStructuresViewed += 1;
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  }

  private static updateProgressBookmarksCount(count: number): void {
    const progress = this.getProgress();
    progress.bookmarksCount = count;
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  }

  public static recordQuizResult(correct: number, total: number): void {
    const progress = this.getProgress();
    const prevTotalQuestions = progress.quizzesCompleted * 5; // average batch
    const prevCorrect = Math.round((progress.quizAccuracy / 100) * prevTotalQuestions);
    
    const newTotal = prevTotalQuestions + total;
    const newCorrect = prevCorrect + correct;
    
    progress.quizzesCompleted += 1;
    progress.quizAccuracy = newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 0;
    this.setItem(STORAGE_KEYS.PROGRESS, progress);
  }

  // Preferences
  public static getPreferences(): UserPreferences {
    return this.getItem<UserPreferences>(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
  }

  public static setPreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    this.setItem(STORAGE_KEYS.PREFERENCES, updated);
    return updated;
  }
}
