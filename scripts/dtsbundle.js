require('dts-generator').generate({
  name: 'phosphor-arrays',
  main: 'phosphor-arrays/index',
  baseDir: 'lib',
  files: ['index.d.ts'],
  out: 'lib/phosphor-arrays.d.ts',
});
