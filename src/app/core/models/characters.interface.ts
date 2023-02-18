export type Characters = {
  code: string
  data: {
    offset: string
    limit: number
    total: number
    count: string
    results: Character[]
  }
  etag: string
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
