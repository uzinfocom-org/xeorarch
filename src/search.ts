import Fuse from 'fuse.js'
import * as STD from './std'
import * as AUR from './aur'

interface Package {
    name: string
    base: string
    desc: string
    arch: string
    repo?: string
    type: 'aur' | 'std'
    version: number | string
    url: string
    author: string | string[]
    updated: string | Date | number
}

const options = {
    keys: ['name', 'base', 'desc']
}

export const search = async (pack: string) => {
    const std = (await STD.search(pack)).results.map(
        (packs): Package => ({
            name: packs.pkgname,
            base: packs.pkgbase,
            desc: packs.pkgdesc,
            arch: packs.arch,
            repo: packs.repo,
            type: 'std',
            version: packs.pkgver,
            url: packs.url,
            author: packs.maintainers,
            updated: new Date(packs.last_update).toLocaleString()
        })
    )
    const aur = (await AUR.search(pack)).results.map(
        (packs): Package => ({
            name: packs.Name,
            base: packs.PackageBase,
            desc: packs.Description,
            arch: 'x86_64',
            type: 'aur',
            version: packs.Version,
            url: packs.URL,
            author: packs.Maintainer,
            updated: new Date(packs.LastModified * 1000).toLocaleString()
        })
    )

    const fuse = new Fuse([...std, ...aur], options)
    return fuse.search(pack).map((item) => item.item)
}
