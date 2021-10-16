export default [
  {
    url: "/mock/upload",
    response: (option) => {
      const width = option.body.width || 150;
      const height = option.body.height || width;
      return {
        status: 200,
        message: "success",
        data: `https://picsum.photos/${width}/${height}`,
      };
    },
  },
];
