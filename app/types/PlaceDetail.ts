export type PlaceDetails = {
  name: string
  formatted_address: string
  photos?: google.maps.places.PlacePhoto[]
  plus_code?: {
    compound_code: string
    global_code: string
  }
  website?: string
  opening_hours?: {
    weekday_text: string[]
  }
}
