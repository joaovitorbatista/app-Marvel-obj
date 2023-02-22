export type Characters = {
  code: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Character[]
  }
}

export type Character = {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    items: Array<{
      resourceURI: string
      name: string
    }>
  }
  stories: {
    items: Array<{
      name: string
    }>
  }
  events: {
    items: Array<{
      name: string
    }>
  }
  series: {
    items: Array<{
      name: string
    }>
  }
}
