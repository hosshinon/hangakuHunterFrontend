export type Shop = {
  place_id: string
  name: string
  rating: number
  user_ratings_total: number
  formatted_address: string
  international_phone_number: string
  website: string
  opening_hours: {
    weekdayText: string[]
  }
  priceLevel: number
  photos: {
    photo_reference: string
  }
  types: string[]
}
