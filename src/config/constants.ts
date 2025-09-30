export type TImageFor = 'avatar' | 'pool' | 'bank'

export const avatarSt = `avatar`
export const poolsSt = `pool`
export const banksSt = `bank`
export const dirList: TImageFor[] = [avatarSt, poolsSt, banksSt]



export type TAllowedMimes = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'application/pdf' | 'text/plain' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

// const y:allowedMimes[]=[]