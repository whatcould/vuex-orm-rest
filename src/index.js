const plugin = {
  install(components) {
    // eslint-disable-next-line no-param-reassign
    components.Model.fetch = () => {
      console.log('fetching...');
    };
  },
};

export default plugin;
