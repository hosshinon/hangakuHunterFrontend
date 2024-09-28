export type Shop = {
  place_id: string
  name: string
  rating: number
  user_ratings_total: number
  formatted_address: string
  international_phone_number: string
  website: string
  opening_hours: {
    weekday_text: string[]
  }
  priceLevel: number
  photos: {
    map(
      arg0: (
        photo: { photo_reference: string },
        index: import('react').Key | null | undefined,
      ) => import('react').JSX.Element,
    ): import('react').ReactNode
    length: number
    photo_reference: string
  }
  types: string[]
}
