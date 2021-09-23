// import Mock from 'mockjs'

export default {
  'post|/mock/upload': option => {
    const width = option.body.get('width') || 150
    const height = option.body.get('height') || width
    return {
      status: 200,
      message: 'success',
      data: `https://picsum.photos/${width}/${height}`,
    }
  },
}
