module.exports = [
  {
    script: './dist/app.js',
    name: 'rumi',
    exec_mode: 'cluster',
    instances: 2
  }
];
