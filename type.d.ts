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

type SurahsAction = {
  type: string;
  surah: SurahMeta;
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
type Surahs = Array<SurahMeta>;
