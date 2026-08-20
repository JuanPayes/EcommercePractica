export interface GeneralResponse<T> {
    uri: string;
    message: string;
    status: number;
    time: string;
    data: T;
}