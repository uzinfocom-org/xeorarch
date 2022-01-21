import { default as fetcher } from './fetcher'

export interface PackageInfo {
    pkgname: string
    pkgbase: string
    repo:
        | 'core'
        | 'extra'
        | 'community'
        | 'testing'
        | 'multilib'
        | 'multilib-testing'
    arch: 'x86_64' | 'any' | 'x86'
    pkgver: string
    pkgrel: string | number
    epoch: number
    pkgdesc: string
    url: string
    filename: string
    compressed_size: number
    installed_size: number
    build_date: string | Date
    last_update: string | Date
    flag_date: string | Date | null
    maintainers: string[]
    packager: string[]
    groups: string[]
    licenses: string[]
    conflicts: string[]
    provides: string[]
    replaces: string[]
    depends: string[]
    optdepends: string[]
    makedepends: string[]
    checkdepends: string[]
}

export interface PackageSearch {
    version: number
    limit: number
    valid: boolean
    results: PackageInfo[]
}

/**
 * Get info about one package
 * @param name Packages to get info for
 * @exports
 */
export const info = async (name: string): Promise<PackageInfo> => {
    // Base AUR API URL
    const url = `https://archlinux.org/packages/community/x86_64/${name}/json`
    return await fetcher(url)
}

/**
 * Search for packages on STD
 * @param name The query to search for
 * @exports
 */
export const search = async (name: string): Promise<PackageSearch> => {
    // Base AUR API URL
    const url = `https://archlinux.org/packages/search/json/?q=${name}`
    const request = await fetcher(url)
    return request.results
}
