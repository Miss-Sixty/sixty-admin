export default [
  {
    url: '/mock/upload',
    method: 'post',
    response: option => {
      const width = option.body.width || '@natural(150, 1000)'
      const height = option.body.height || width
      return {
        status: 200,
        message: 'success',
        data: {
          id: '@id',
          url: `https://picsum.photos/${width}/${height}`,
          name: '@ctitle',
        },
      }
    },
  },
]
