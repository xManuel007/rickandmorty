export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: { name: string, url: string }
  location: { name: string, url: string }
  image: string
  episode: string[] | string
  url: string
  created: string
}


export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  air_date: string
  residents: string[] | string
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[] | string
  url: string
  created: string
}

export interface InfoProps {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface FiltersType {
  filters: string
}
