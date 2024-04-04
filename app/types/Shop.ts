import { Discount } from './Discount'

export type Shop = {
  discounts: Discount[]
  id: number
  name: string
  postal_code: string
  address: string
  opening_hours: string
  homepage: string
  latitude: number
  longitude: number
  created_at: string
  updated_at: string
}
