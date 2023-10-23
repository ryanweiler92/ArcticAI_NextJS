interface Config {
  projections: {
    webMercator: string;
    WGS84: string;
  };
}

const config: Config = {
  projections: {
    webMercator: 'EPSG:3857',
    WGS84: 'EPSG:4326',
  },
};

export default config;
