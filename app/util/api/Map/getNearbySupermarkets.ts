export const getNearbySupermarkets = async (lat, lng) => {
  try {
    const response = await fetch(`/api/supermarkets?lat=${lat}&lng=${lng}`)
    if (!response.ok) {
      const errorResponse = await response.json()
      console.error('Failed to fetch supermarkets:', errorResponse)
      throw new Error('Failed to fetch supermarkets')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching supermarkets', error)
    return []
  }
}
