import { IProduct } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'


export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config)
    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}

