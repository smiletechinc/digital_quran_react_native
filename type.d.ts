type Verse = {
  ayahNumber: number;
  ayahText: string;
  surahNumber: number;
  surahName: string;
};

type Surah = {
  surahNumber: number;
  surahName: string;
  verses: Verse[];
};

type JuzMeta = {
  index: number;
  verse: VerseMeta;
};

type VerseMeta = {
  start: string;
  end: string;
};

type SurahMeta = {
  place: string;
  type: string;
  titleArabic: string;
  count: number;
  title: string;
  index: number;
  pages: number;
  juz: JuzMeta[];
  filePath: string;
};

type SurahState = {
  surahs: SurahMeta[];
};

type QuranMeta = {
  index: number;
  name: string;
  verse: [];
  count: number;
  juz: [];
};

type VerseState = {
  verses: QuranMeta[];
};

type VerseAction = {
  type: string;
  ayat: QuranMeta;
};

type ParaMeta = {
  title: string;
  titleArabic: string;
  paraIndex: Number;
  count: Number;
  AyahofSurah: [];
};

type ParaState = {
  parahs: ParaMeta[];
};

type ParaAction = {
  type: string;
  para: ParaMeta;
};

type SurahsAction = {
  type: string;
  surah: SurahMeta;
};

type FavVerseMeta = {
  surahNumber: Number;
  ayatNumber: Number;
  ayatText: any;
};

type FavVerseState = {
  favVerses: FavVerseMeta[];
};
type FavVerseAction = {
  type: string;
  favVerse: FavVerseMeta;
};
type AuthObject = {
  email: string;
  password: string;
};

type UserObject = {
  id: string;
  email: string;
  name: string;
};

type UserState = {
  authUser: UserObject;
};

type UserAction = {
  type: string;
  authUser: UserObject;
};

type ErrorObject = {
  code?: string;
  message: string;
};

type verses = Array<Verse>;
type parahs = Array<ParaMeta>;
type Surahs = Array<SurahMeta>;
