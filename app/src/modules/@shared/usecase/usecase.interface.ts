export default interface UseCaseInterface<T1, T2> {
    execute(input: T1): Promise<T2>
}
