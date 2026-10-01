export interface LogPostRequest {
  comment: string;
  difficulty: number;
  rating: number;
  location?: number;
}


export interface Log extends LogPostRequest {
  id: number;
  tourId: number;
  dateTime: string;

}


export interface LogUpdateRequest {
  comment: string | undefined;
  difficulty: number | undefined;
  rating: number | undefined;
}
