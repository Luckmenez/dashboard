const defaultPagination = {
  limit: 5,
  offset: 0
}
export default httpClient => ({
  getAll: async ({ type, limit, offset } = defaultPagination) => {
    const query = { limit, offset }
    if (type) {
      query.type = type
    }
    if (type === 'all') {
      query.type = ''
    }
    const response = await httpClient.get('/feedbacks', { params: query })
    return { data: response.data }
  },
  getSummary: async () => {
    const response = await httpClient({
      method: 'GET',
      url: '/feedbacks/summary'
    })
    return { data: response.data }
  }
})
