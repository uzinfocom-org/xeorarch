import axios from 'axios'

/**
 * Jest is suffering with imports from node-fetch
 * https://github.com/node-fetch/node-fetch/issues/1289
 */
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async (link: string | undefined): Promise<any> => {
    if (!link) {
        throw new Error('No link provided')
    }

    try {
        const response = await axios(link)
        return await response.data
    } catch (error) {
        throw new Error('Error fetching data:')
    }
}
