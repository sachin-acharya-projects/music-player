export async function request(input: RequestInfo | URL, init?: RequestInit | undefined) {
    try {
        const result = await fetch(input, init)
        return [result, result.status]
    } catch(e) {
        console.error(e)
        return Promise<null>
    }

}