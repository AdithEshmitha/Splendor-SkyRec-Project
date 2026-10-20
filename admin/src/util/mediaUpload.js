import { createClient } from '@supabase/supabase-js'

export async function uploadMedia(file) {

    const supabase = createClient(
        import.meta.env.VITE_SUPABSE_KEY,
        import.meta.env.VITE_ANNON_KEY
    )

    const promise = new Promise(
        (resolve, reject) => {
            if (file == null || !file) {
                reject('Please select an images')
                return
            }

            const fileName = `${new Date().getTime()}-${file.name}`
            supabase.storage.from('media').upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            }).then(
                () => {
                    const publicUrl = supabase.storage.from('media').getPublicUrl(fileName).data.publicUrl
                    resolve(publicUrl)
                }
            ).catch(
                (error) => {
                    reject(error)
                }
            )

        }
    )

    return promise

}