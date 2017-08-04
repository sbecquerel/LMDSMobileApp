export interface VideoModel {
  videoId: number;
  title: string;
  subTitle: string;
  description: string;
  level: number;
  tags: string;
  movieType: number;
  difficulty: number;
  position: number;
  played: boolean;
  favorite: boolean;
  teacher: string
  fileId?: number;
}