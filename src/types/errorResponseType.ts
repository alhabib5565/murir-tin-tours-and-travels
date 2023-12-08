export type TIssue = {
    path: string | number
    message: string
}
export type TErrorResponseFormate = {
    statusCode: number,
    message: string,
    issue: TIssue[]
}