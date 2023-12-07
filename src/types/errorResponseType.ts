export type TIssue = {
    path: string,
    message: string
}
export type TErrorResponseFormate = {
    statusCode: number,
    message: string,
    issue: TIssue[]
}